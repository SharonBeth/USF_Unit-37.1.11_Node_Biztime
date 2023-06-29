const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/companies', (req, res, next) => {
    const results = db.query(`SELECT * FROM companies`);
    return res.json(results.rows);
})

// router.post
// 
// router.patch
// 
// router.delete
// 

module.exports = router;