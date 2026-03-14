const Pickup = require("../models/Pickup");

exports.schedulePickup = async (req, res) => {

  try {

    const { donationId, ngoId, volunteerName, pickupTime } = req.body;

    const pickup = await Pickup.create({
      donationId,
      ngoId,
      volunteerName,
      pickupTime
    });

    res.status(201).json({
      message: "Pickup scheduled successfully",
      pickup
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


exports.updatePickupStatus = async (req, res) => {

  try {

    const pickup = await Pickup.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(pickup);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


exports.getPickupHistory = async (req, res) => {

  try {

    const pickups = await Pickup.find().populate("ngoId donationId");

    res.json(pickups);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};