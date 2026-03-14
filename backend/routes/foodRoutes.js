const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getFoodDonations,
  getFoodDonationById,
  createFoodDonation,
  updateFoodDonation,
  deleteFoodDonation,
  changeDonationStatus
} = require('../controllers/foodController');

// Auth middleware (replace with your actual auth middleware)
const protect = (req, res, next) => {
  // TODO: Implement JWT/auth middleware here
  // Example: const user = jwt.verify(token, process.env.JWT_SECRET);
  // req.user = user;
  // next();
  console.log('Auth middleware placeholder - implement JWT verification');
  req.user = { _id: 'test-user-id' }; // Temp for testing
  next();
};

// Public routes
router.get('/', getFoodDonations);
router.get('/:id', getFoodDonationById);

// Protected routes (donor authenticated)
router.use(protect);

router.post('/', createFoodDonation);
router.put('/:id', updateFoodDonation);
router.delete('/:id', deleteFoodDonation);
router.patch('/:id/status', changeDonationStatus);

module.exports = router;
