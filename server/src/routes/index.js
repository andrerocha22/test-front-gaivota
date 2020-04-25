var express = require("express");
var router = express.Router();

router.get("/", ensureAuthenticated, function(req, res, next) {
  console.warn("MEMBER");
  return res.sendStatus(200);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = router;
