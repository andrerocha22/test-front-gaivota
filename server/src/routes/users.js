var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");

var User = require("../models/user");
  
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne( {email} ).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/register", function(req, res, next) {
  // console.log("user signup");

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  // ADD VALIDATION
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      // console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the email: ${email}`
      });
    } else {
      var newUser = new User({
        name: name,
        email: email,
        password: password
      });

      User.createUser(newUser, function(err, user) {
        if (err) throw err;
        return res.json(user);
      });
    }
  });
});

router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: "logging out" });
  } else {
    res.send({ msg: "no user to log out" });
  }
});

module.exports = router;
