const FoodDonation = require("../models/FoodDonation");

// Get all food donations
const getFoodDonations = async (req, res) => {
  try {
    const { status, userId, page = 1, limit = 10 } = req.query;
    const filters = {};
    
    if (status) filters.status = status;
    if (userId) filters.donor = userId;
    
    const donations = await FoodDonation.getFoodDonations(filters);
    
    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch food donations'
    });
  }
};

// Get single food donation by ID
const getFoodDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await FoodDonation.getFoodDonationById(id);
    
    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || 'Food donation not found'
    });
  }
};

// Create new food donation
const createFoodDonation = async (req, res) => {
  try {
    const donationData = {
      ...req.body,
      donor: req.user._id
    };
    
    const donation = await FoodDonation.createFoodDonation(donationData);
    
    res.status(201).json({
      success: true,
      message: 'Food donation created successfully',
      data: donation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create food donation'
    });
  }
};

// Update food donation
const updateFoodDonation = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify donor ownership
    const donation = await FoodService.getFoodDonationById(id);
    if (donation.donor._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this donation'
      });
    }
    
    const updatedDonation = await FoodService.updateFoodDonation(id, req.body);
    
    res.status(200).json({
      success: true,
      message: 'Food donation updated successfully',
      data: updatedDonation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update food donation'
    });
  }
};

// Delete food donation
const deleteFoodDonation = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify donor ownership
    const donation = await FoodService.getFoodDonationById(id);
    if (donation.donor._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this donation'
      });
    }
    
    await FoodService.deleteFoodDonation(id);
    
    res.status(200).json({
      success: true,
      message: 'Food donation deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || 'Failed to delete food donation'
    });
  }
};

// Change donation status (claim, pickup, etc.)
const changeDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const donation = await FoodService.changeDonationStatus(id, status);
    
    res.status(200).json({
      success: true,
      message: `Donation status changed to ${status}`,
      data: donation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update donation status'
    });
  }
};

module.exports = {
  getFoodDonations,
  getFoodDonationById,
  createFoodDonation,
  updateFoodDonation,
  deleteFoodDonation,
  changeDonationStatus
};
