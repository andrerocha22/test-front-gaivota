const mongoose = require("mongoose");

const Farm = mongoose.model("Farm");

module.exports = {
  async index(req, res) {
    const farms = await Farm.find();

    return res.json(farms);
  },

  async show(req, res) {
    const farm = await Farm.findOne({ farm_id: req.params.farm_id });

    return res.json(farm);
  },

  async store(req, res) {
    const farm = await Farm.create(req.body, function(error) {
      if (error) {
        return res.status(400).send({ error: error._message });
      } else {
        return res.status(200).send('Success');
      }
    });
  },

  async update(req, res) {
    const farm = await Farm.findByIdAndUpdate(
      { farm_id: req.params.farm_id },
      req.body,
      { new: true }
    );

    return res.json(farm);
  },

  async delete(req, res) {
    await Farm.findOneAndRemove({ farm_id: req.params.farm_id });

    return res.send();
  },
};
