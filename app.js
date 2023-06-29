/** BizTime express application. */

//Set-up for outside files & dependencies
const express = require("express");

const app = express();
const ExpressError = require("./expressError")

//This parses the information coming in into the form of a JSON.

app.use(express.json());

//This allows access to the routes set up in routes folder

const routingC = require("./routes/companies");
app.use("/companies", routingC)

const routingI = require("./routes/invoices");
app.use("/invoices", routingI);
/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
