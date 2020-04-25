const express = require("express");
const router = express.Router();
// const FarmsController = require("../controllers/FarmsController");
// const FarmsPrecipitationController = require("../controllers/FarmsPrecipitationController");
// const FarmsNDVIController = require("../controllers/FarmsNDVIController");
var Farm = require("../models/Farm");

router.get("/", function(req, res, next) {
  Farm.getFarmList({}, function(err, farm) {
    if (err) throw err;
    return res.json(farm);
  });
});

router.post("/create", function(req, res, next) {
  const farm_id = req.body.farm_id;
  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const culture = req.body.culture;
  const variety = req.body.variety;
  const total_area = req.body.total_area;
  const yield_estimation = req.body.yield_estimation;
  const price = req.body.price;

  var newFarm = new Farm({
    farm_id: farm_id,
    name: name,
    latitude: latitude,
    longitude: longitude,
    culture: culture,
    variety: variety,
    total_area: total_area,
    yield_estimation: yield_estimation,
    price: price,
  });

  Farm.createFarm(newFarm, function(err, farm) {
    if (err) throw err;
    return res.json(farm);
  });
});

// routes.get("/farms_precipitation", FarmsPrecipitationController.index);
// routes.get("/farms_precipitation/:farm_id", FarmsPrecipitationController.show);
// routes.post("/farms_precipitation", FarmsPrecipitationController.store);
// routes.put("/farms_precipitation/:farm_id", FarmsPrecipitationController.update);
// routes.delete("/farms_precipitation/:farm_id", FarmsPrecipitationController.delete);

// routes.get("/farms_ndvi", FarmsNDVIController.index);
// routes.get("/farms_ndvi/:farm_id", FarmsNDVIController.show);
// routes.post("/farms_ndvi", FarmsNDVIController.store);
// routes.put("/farms_ndvi/:farm_id", FarmsNDVIController.update);
// routes.delete("/farms_ndvi/:farm_id", FarmsNDVIController.delete);

module.exports = router;
