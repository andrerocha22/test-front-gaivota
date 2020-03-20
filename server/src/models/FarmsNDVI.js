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

mongoose.model("FarmNDVI", FarmNDVISchema);
