const express = require("express");
const router = express.Router();
var FarmsPrecipitation = require("../models/FarmsPrecipitation");

router.get("/", function(req, res, next) {
    FarmsPrecipitation.getFarmsPrecipitation({}, function(err, data) {
    if (err) throw err;
    return res.json(data);
  });
});

module.exports = router;
