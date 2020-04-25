const express = require("express");
const router = express.Router();
var FarmNDVI = require("../models/FarmsNDVI");

router.get("/", function(req, res, next) {
  FarmNDVI.getFarmNDVI({}, function(err, data) {
    if (err) throw err;
    return res.json(data);
  });
});

module.exports = router;
