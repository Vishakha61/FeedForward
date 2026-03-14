const FoodDonation = require('./models/FoodDonation');

// Backend service for food donation operations

// Create new food donation
async function createFoodDonation(donationData) {
  try {
    const donation = new FoodDonation(donationData);
    await donation.save();
    return donation;
  } catch (error) {
    throw new Error(`Create failed: ${error.message}`);
  }
}

// Get all food donations
async function getFoodDonations(filters = {}) {
  try {
    const query = { ...filters };
    return await FoodDonation.find(query).populate('donor', 'name email');
  } catch (error) {
    throw new Error(`Get failed: ${error.message}`);
  }
}

// Get by ID
async function getFoodDonationById(id) {
  try {
    const donation = await FoodDonation.findById(id).populate('donor');
    if (!donation) throw new Error('Donation not found');
    return donation;
  } catch (error) {
    throw new Error(`Get by ID failed: ${error.message}`);
  }
}

async function updateFoodDonation(id, updateData) {
  try {
    const donation = await FoodDonation.findByIdAndUpdate(id, updateData, { new: true }).populate('donor');
    if (!donation) throw new Error('Donation not found');
    return donation;
  } catch (error) {
    throw new Error(`Update failed: ${error.message}`);
  }
}

// Delete food donation
async function deleteFoodDonation(id) {
  try {
    const donation = await FoodDonation.findByIdAndDelete(id);
    if (!donation) throw new Error('Donation not found');
    return { message: 'Donation deleted successfully' };
  } catch (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}

// Change donation status (e.g., claim, pickup)
async function changeDonationStatus(id, status) {
  try {
    const donation = await FoodDonation.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    ).populate('donor');
    if (!donation) throw new Error('Donation not found');
    return donation;
  } catch (error) {
    throw new Error(`Status update failed: ${error.message}`);
  }
}

module.exports = {
  createFoodDonation,
  getFoodDonations,
  getFoodDonationById,
  updateFoodDonation,
  deleteFoodDonation,
  changeDonationStatus
};
