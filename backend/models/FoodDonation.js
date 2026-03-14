const mongoose = require('mongoose');

const foodDonationSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  location: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['fruits', 'vegetables', 'bakery', 'dairy', 'meat', 'other']
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['available', 'claimed', 'pickedup', 'expired'],
    default: 'available'
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FoodDonation', foodDonationSchema);
