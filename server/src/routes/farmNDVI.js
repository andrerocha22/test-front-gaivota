const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const ndviData = fs.readFileSync(
  path.join(__dirname, "../../data/farms_ndvi.json"),
  "utf8"
);

router.get("/", async (req, res) => {
  res.status(200).send(ndviData);
});

module.exports = router;
