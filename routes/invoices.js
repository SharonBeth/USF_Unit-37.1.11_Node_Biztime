const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

console.log("get")

router.get("/", async function (req, res, next) {
    try {
        const invoice = await db.query(`SELECT * FROM invoices`);
        return res.json({ invoices: invoice.rows })
    } catch (err) {
        return next(err)
    }
})

router.get("/:id", async function (req, res, next) {
    try {
        const id = req.params.id;
        const results = await db.query(`
            SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, c.name, c.description
            FROM invoices AS i
            INNER JOIN companies AS c
            ON i.comp_code = c.code
            WHERE id = $1`, [id])
        if (results.rows.length === 0) {
            throw new ExpressError(`There is no invoid with id # ${id}, 404`);
        }
        const data = results.rows[0]
        const invoice = {
            id: data.id,
            company: {
                code: data.comp_code,
                name: data.name,
                description: data.description,
            },
            amt: data.amt,
            paid: data.paid,
            add_date: data.add_date,
            paid_date: data.paid_date,
        };
        return res.json({ "invoice": invoice });

    } catch (err) {
        return next(err)
    }
})

router.post("/", async function (req, res, next) {
    try {
        let { comp_code, amt } = req.body;

        const result = await db.query(
            `INSERT INTO invoices (comp_code, amt) 
             VALUES ($1, $2) 
             RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [comp_code, amt]);

        return res.json({ "invoice": result.rows[0] });
    }

    catch (err) {
        return next(err);
    }
});

router.put("/:id", async function (req, res, next) {
    try {
        const { amt, paid } = req.body;
        let id = req.params.id;
        let paidDate = null;


        console.log(results)
        const newInvoice = await db.query(`SELECT paid FROM invoices WHERE id = $1`, [id])
        if (results.rows.length === 0) {
            throw new ExpressError(`No such invoice: ${id}`, 404);
        }
        const currPaidDate = newInvoice.rows[0].paid_date;

        if (!currPaidDate && paid) {
            paidDate = new Date();
        } else if (!paid) {
            paidDate = null
        } else {
            paidDate = currPaidDate;
        }
        const results = await db.query(`UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING amt `, [amt, id]);
        return res.json({ "invoice": newInvoice.rows[0] })
    } catch (err) {
        return next(err);
    }
})

router.delete("/:id", async function (req, res, next) {
    try {
        const results = await db.query("DELETE FROM invoices WHERE id = $1 RETURNING id", [req.params.id]);

        if (results.rows.length === 0) {
            throw new ExpressError(`There is no invoice with this id: ${req.params.id}`, 404);
        }
        return res.json({ message: `Invoice ${req.params.id} deleted.` })
    } catch (err) {
        return next(err)
    }
})

module.exports = router;