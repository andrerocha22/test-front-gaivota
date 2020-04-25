const express = require("express");
const router = express.Router();
const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');

const precipitationData = fs.readFileSync(
  path.join(__dirname, '../../data/farms_precipitation.csv'),
  {
      encoding: 'utf8'
  }
);

router.get('/', async (req, res) => {
  res.status(200).send(csvjson.toObject(precipitationData));
});

module.exports = router;
