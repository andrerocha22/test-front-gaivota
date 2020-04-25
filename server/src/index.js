const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const expressValidator = require("express-validator");
const flash = require("connect-flash");

const PORT = 3001;
const app = express();


app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:5000/farms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(e => {
    console.error("Connection error", e.message);
  });

requireDir("./models");

app.use("/api", require("./routes"));

// app.listen(PORT !== "undefined" ? PORT : 5000, () => {
// 	console.warn("App is running at http://localhost:" + PORT);
// });

app.listen(PORT);

module.exports = app;
