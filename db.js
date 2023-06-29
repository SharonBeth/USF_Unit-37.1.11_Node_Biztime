/** Database setup for BizTime. */
//**** Older version Stuff***********
// const { Client } = require("pg");
// 
// let DB_URI;
// console.log()
// if (process.env.NODE_ENV === "test") {
// DB_URI = "postgresql:///biztime_test";
// } else {
// DB_URI = "postgresql:///biztime";
// }

// let db = new Client({
// connectionString: DB_URI,
// });
// 
// db.connect();
// 
// module.exports = db;
// 
//*************************************

const { Client } = require('pg')

const db = new Client({
    host: "localhost",
    user: "testing1",
    port: 5432,
    password: "testingpassword1",
    database: "biztime"
})

db.connect();

db.query(`Select * FROM companies`, (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    db.end;
})

module.exports = db;