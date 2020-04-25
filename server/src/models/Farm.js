const mongoose = require("mongoose");

const FarmSchema = mongoose.Schema({
  farm_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  culture: {
    type: String,
    required: true
  },
  variety: {
    type: String,
    required: true
  },
  total_area: {
    type: Number,
    required: true
  },
  yield_estimation: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const Farm = (module.exports = mongoose.model("Farm", FarmSchema));

module.exports.getFarmList = function({}, callback) {
  Farm.find({}, callback);
};

module.exports.createFarm = function(newFarm, callback) {
  newFarm.save(callback);
};