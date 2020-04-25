const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");

var routes = require("./routes/index");
var users = require("./routes/users");
var farms = require("./routes/farms");
var farmsPrecipitation = require("./routes/farmPrecipitation");
var farmsNdvi = require("./routes/farmNDVI");

const PORT = 3001;
const app = express();

mongoose
  .connect("mongodb://localhost:5000/farms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.get("*", function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use(cors());

app.use("/", routes);
app.use("/users", users);
app.use("/farms", farms);
app.use("/farms/precipitation", farmsPrecipitation);
app.use("/farms/ndvi", farmsNdvi);

app.listen(PORT);

module.exports = app;
