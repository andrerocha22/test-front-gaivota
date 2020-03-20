const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = {
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async show(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    const token = jwt.sign(user, JWT_PW);
    res.status(200).send({ userData: "admin", token });
  },

  async store(req, res) {
    const user = await User.create(req.body);

    return res.json(user);
  },

  async update(req, res) {
    const user = await Farm.findByIdAndUpdate(
      { user_id: req.params.user_id },
      req.body,
      { new: true }
    );

    return res.json(farm);
  },

  async delete(req, res) {
    await User.findOneAndRemove({ user_id: req.params.user_id });

    return res.send();
  }
};
