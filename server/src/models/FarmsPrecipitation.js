const mongoose = require("mongoose");

const FarmPrecSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  precipitation_221: {
    type: Number,
    required: true
  },
  precipitation_231: {
    type: Number,
    required: true
  },
  precipitation_271: {
    type: Number,
    required: true
  }
});

const FarmPrecipitation = (module.exports = mongoose.model("FarmPrecipitation", FarmPrecSchema));

module.exports.getFarmsPrecipitation = function({}, callback) {
  FarmPrecipitation.find({}, callback);
};