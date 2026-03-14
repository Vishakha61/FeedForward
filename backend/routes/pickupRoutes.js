const express = require("express");
const router = express.Router();

const {
  schedulePickup,
  updatePickupStatus,
  getPickupHistory
} = require("../controllers/pickupController");


router.post("/schedule", schedulePickup);

router.put("/status/:id", updatePickupStatus);

router.get("/history", getPickupHistory);


module.exports = router;