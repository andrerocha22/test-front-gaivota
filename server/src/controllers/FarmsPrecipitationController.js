const mongoose = require("mongoose");

const FarmPrecipitation = mongoose.model("FarmPrecipitation");

module.exports = {
  async index(req, res) {
    const farms = await FarmPrecipitation.find();

    return res.json(farms);
  },

  async show(req, res) {
    const farm = await FarmPrecipitation.findOne({ farm_id: req.params.farm_id });

    return res.json(farm);
  },

  async store(req, res) {
    const farm = await FarmPrecipitation.create(req.body);

    return res.json(farm);
  },

  async update(req, res) {
    const farm = await FarmPrecipitation.findByIdAndUpdate(
      { farm_id: req.params.farm_id },
      req.body,
      { new: true }
    );

    return res.json(farm);
  },

  async delete(req, res) {
    await FarmPrecipitation.findOneAndRemove({ farm_id: req.params.farm_id });

    return res.send();
  }
};
