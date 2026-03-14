const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema({

  donationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodDonation",
    required: true
  },

  ngoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  volunteerName: {
    type: String,
    required: true
  },

  pickupTime: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ["scheduled", "pickedup", "delivered"],
    default: "scheduled"
  }

});

module.exports = mongoose.model("Pickup", pickupSchema);