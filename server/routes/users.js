import { Router } from 'express';
import User from '../models/User.js';
import Donation from '../models/Donation.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// @route   GET /api/users/stats
// @desc    Get platform statistics
// @access  Public
router.get('/stats', async (_req, res) => {
  try {
    const [totalDonors, totalNGOs, totalDonations, totalCollected] = await Promise.all([
      User.countDocuments({ role: 'donor' }),
      User.countDocuments({ role: 'ngo' }),
      Donation.countDocuments(),
      Donation.countDocuments({ status: 'collected' }),
    ]);

    // Calculate total meals served (sum of servings from collected donations)
    const collectedDonations = await Donation.find({ status: 'collected' }, 'servings');
    const totalMealsServed = collectedDonations.reduce((sum, d) => sum + (d.servings || 0), 0);

    res.json({
      success: true,
      stats: {
        totalDonors,
        totalNGOs,
        totalDonations,
        totalCollected,
        totalMealsServed,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

// @route   GET /api/users/donors
// @desc    Get list of donors (for public viewing)
// @access  Public
router.get('/donors', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const donors = await User.find({ role: 'donor' })
      .select('name city state donationsMade createdAt')
      .sort({ donationsMade: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ role: 'donor' });

    res.json({
      success: true,
      count: donors.length,
      total,
      donors,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching donors' });
  }
});

// @route   GET /api/users/ngos
// @desc    Get list of verified NGOs
// @access  Public
router.get('/ngos', async (req, res) => {
  try {
    const ngos = await User.find({ role: 'ngo', isVerified: true })
      .select('name organization city state donationsReceived createdAt')
      .sort({ donationsReceived: -1 });

    res.json({
      success: true,
      count: ngos.length,
      ngos,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching NGOs' });
  }
});

// @route   GET /api/users/profile/:id
// @desc    Get public profile of a user
// @access  Public
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name role organization city state donationsMade donationsReceived createdAt');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

export default router;
