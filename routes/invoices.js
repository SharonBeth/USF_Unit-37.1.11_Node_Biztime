const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

console.log("get")

router.get("/", function (req, res, next) {
    try {
        console.log("router.get")
    } catch (err) {
        return next(err)
    }
})

// router.post
// 
// router.patch
// 
// router.delete
// 

module.exports = router;