const mongoose = require("mongoose");

const FarmNDVI = mongoose.model("FarmNDVI");

module.exports = {
  async index(req, res) {
    const farms = await FarmNDVI.find();

    return res.json(farms);
  },

  async show(req, res) {
    const farm = await FarmNDVI.findOne({ farm_id: req.params.farm_id });

    return res.json(farm);
  },

  async store(req, res) {
    const farm = await FarmNDVI.create(req.body);

    return res.json(farm);
  },

  async update(req, res) {
    const farm = await FarmNDVI.findByIdAndUpdate(
      { farm_id: req.params.farm_id },
      req.body,
      { new: true }
    );

    return res.json(farm);
  },

  async delete(req, res) {
    await FarmNDVI.findOneAndRemove({ farm_id: req.params.farm_id });

    return res.send();
  }
};
