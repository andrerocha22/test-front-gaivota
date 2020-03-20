const express = require("express");
const jwt = require("jsonwebtoken");
const routes = express.Router();
const FarmsController = require("./controllers/FarmsController");
const FarmsPrecipitationController = require("./controllers/FarmsPrecipitationController");
const FarmsNDVIController = require("./controllers/FarmsNDVIController");
const UserController = require("./controllers/UserController");

routes.get("/farms", FarmsController.index);
routes.get("/farms/:farm_id", FarmsController.show);
routes.post("/farms", FarmsController.store);
routes.put("/farms/:farm_id", FarmsController.update);
routes.delete("/farms/:farm_id", FarmsController.delete);

routes.get("/farms_precipitation", FarmsPrecipitationController.index);
routes.get("/farms_precipitation/:farm_id", FarmsPrecipitationController.show);
routes.post("/farms_precipitation", FarmsPrecipitationController.store);
routes.put("/farms_precipitation/:farm_id", FarmsPrecipitationController.update);
routes.delete("/farms_precipitation/:farm_id", FarmsPrecipitationController.delete);

routes.get("/farms_ndvi", FarmsNDVIController.index);
routes.get("/farms_ndvi/:farm_id", FarmsNDVIController.show);
routes.post("/farms_ndvi", FarmsNDVIController.store);
routes.put("/farms_ndvi/:farm_id", FarmsNDVIController.update);
routes.delete("/farms_ndvi/:farm_id", FarmsNDVIController.delete);

routes.get("/login", UserController.show);
routes.post("/login", UserController.store);

/**
 * Login route
 * @param {String} email - Email of login user
 * @param {String} password - Password of login user
 * @return {String} token
 */
routes.get("/auth", (req, res) => {
  let token = req.header("Authorization");
  token = token.split(" ")[1];
  const ok = jwt.verify(token, JWT_PW);
  res.status(200).send(ok);
});

module.exports = routes;
