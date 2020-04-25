const mongoose = require("mongoose");

const FarmNDVISchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  ndvi_221: {
    type: String,
    required: true
  },
  ndvi_231: {
    type: String,
    required: true
  },
  ndvi_271: {
    type: String,
    required: true
  }
});

const FarmNDVI = (module.exports = mongoose.model("FarmNDVI", FarmNDVISchema));

module.exports.getFarmNDVI = function({}, callback) {
  FarmNDVI.find({}, callback);
};