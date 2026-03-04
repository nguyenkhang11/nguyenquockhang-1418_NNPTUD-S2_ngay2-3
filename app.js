var express = require("express");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var rolesRouter = require("./routes/roles");
var errorHandler = require("./middlewares/errorHandler");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.json({ ok: true }));

app.use("/users", usersRouter);
app.use("/roles", rolesRouter);

// error handler cuối cùng
app.use(errorHandler);

module.exports = app;