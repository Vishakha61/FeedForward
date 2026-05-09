import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    donorName: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: [true, 'Food type is required'],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      enum: ['cooked', 'raw', 'packaged', 'bakery', 'produce', 'other'],
      required: true,
    },
    servings: {
      type: Number,
      required: [true, 'Number of servings is required'],
      min: 1,
    },
    expiryDate: {
      type: Date,
    },
    pickupAddress: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['available', 'reserved', 'collected', 'expired'],
      default: 'available',
    },
    dietaryInfo: {
      type: [String],
      default: [],
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    claimedAt: {
      type: Date,
      default: null,
    },
    collectedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
donationSchema.index({ foodType: 'text', city: 'text', description: 'text' });
donationSchema.index({ status: 1, city: 1 });
donationSchema.index({ donorId: 1 });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
