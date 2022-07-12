const createError = require("http-errors");
const express = require("express");
// const mongoose = require("mongoose")
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");

const usersRoute = require("./routes/users");
const transportsRoute = require("./routes/transports");
const donationRouter = require("./routes/donations")
const membersConversationRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const requestRoute = require("./routes/requestRoute");
const scheduleRoute= require("./routes/scheduleRoute");
const accommodationRoute= require("./routes/accommodations");

const app = express();
// const server = http.createServer(app);


app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500);
  res.json({ error: err });
});

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));

// app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRoute);
app.use("/transport", transportsRoute);
app.use("/donations", donationRouter);
app.use("/conversation", membersConversationRoute);
app.use("/messages", messagesRoute);
app.use("/request", requestRoute);
app.use("/schedule", scheduleRoute);
app.use("/accommodation", accommodationRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
