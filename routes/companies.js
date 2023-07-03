const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");
const slugify = require("slugify");

router.get('/', async function (req, res, next) {
    try {
        // *********Trying to print the table, with no results, but no errors
        // const results = await db.query(`SELECT * FROM companies`);
        // console.log(results)
        //************Trying to print the table with no results, but no errors */
        // const results = await db.query(`SELECT * FROM companies`, (err, res) => {
        // console.log(res.rows)
        const results = await db.query(`SELECT * FROM companies`);
        console.log(results)
        return res.json({ companies: results.rows })
    }
    catch (err) {
        return next(err)
    }
})

router.get('/:code', async function (req, res, next) {
    try {
        const code = req.params.code;
        const results = await db.query(`SELECT * FROM companies WHERE code = $1`, [code])
        if (results.rows.length === 0) {
            throw new ExpressError(`There is no company with this code: ${req.params.code}`, 404)
        }
        return res.send({ company: results.rows })
    } catch (err) {
        return next(err)
    }
})

router.post('/', async function (req, res, next) {
    try {
        const { code, name, description } = req.body;
        const result = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`, [code, name, description]);
        return res.status(202).json({ company: result.rows[0] });
    } catch (err) {
        return next(err)
    }
})

router.put('/:code', async function (req, res, next) {
    try {
        const { code, name, description } = req.body;
        const result = await db.query(
            `UPDATE companies SET code=$3, name=$4, description=$1 WHERE name = $2
        RETURNING code, name, description`,
            [description, req.params.name, code, name]);

        return res.json({ company: result.rows[0] });
    } catch (err) {
        return next(err)
    }
})

router.delete('/:code', async function (req, res, next) {
    try {
        const result = await db.query(`DELETE FROM companies WHERE code=$1`,
            [req.params.code]);

        return res.json({ message: "DELETED" })

    } catch (err) {
        return next(err)
    }
})

module.exports = router;