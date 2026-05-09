import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import Donation from '../models/Donation.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// @route   POST /api/donations
// @desc    Create a new food donation
// @access  Private (Donor only)
router.post(
  '/',
  protect,
  authorize('donor'),
  [
    body('foodType').trim().notEmpty().withMessage('Food type is required'),
    body('quantity').trim().notEmpty().withMessage('Quantity is required'),
    body('category').isIn(['cooked', 'raw', 'packaged', 'bakery', 'produce', 'other']).withMessage('Invalid category'),
    body('servings').isInt({ min: 1 }).withMessage('Servings must be at least 1'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const donation = await Donation.create({
        ...req.body,
        donorId: req.user._id,
        donorName: req.user.name,
      });

      // Update donor stats
      await User.findByIdAndUpdate(req.user._id, { $inc: { donationsMade: 1 } });

      res.status(201).json({
        success: true,
        donation,
      });
    } catch (error) {
      console.error('Create donation error:', error);
      res.status(500).json({ error: 'Server error creating donation' });
    }
  }
);

// @route   GET /api/donations
// @desc    Get all available donations with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      status = 'available',
      city,
      category,
      dietary,
      search,
      page = 1,
      limit = 12,
    } = req.query;

    const filter = {};

    // Filter by status
    if (status !== 'all') {
      filter.status = status;
    }

    // Filter by city
    if (city && city !== 'All Cities') {
      filter.city = city;
    }

    // Filter by category
    if (category && category !== 'All Categories') {
      filter.category = category;
    }

    // Filter by dietary info
    if (dietary) {
      const dietaryArray = dietary.split(',');
      filter.dietaryInfo = { $all: dietaryArray };
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('claimedBy', 'name organization');

    const total = await Donation.countDocuments(filter);

    res.json({
      success: true,
      count: donations.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      donations,
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ error: 'Server error fetching donations' });
  }
});

// @route   GET /api/donations/my
// @desc    Get current user's donations
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const filter = req.user.role === 'donor'
      ? { donorId: req.user._id }
      : { claimedBy: req.user._id };

    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 })
      .populate('claimedBy', 'name organization');

    res.json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching your donations' });
  }
});

// @route   GET /api/donations/:id
// @desc    Get single donation
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donorId', 'name email phone')
      .populate('claimedBy', 'name organization phone');

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json({
      success: true,
      donation,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching donation' });
  }
});

// @route   PUT /api/donations/:id/claim
// @desc    Claim a donation (recipient/ngo)
// @access  Private (Recipient/NGO only)
router.put('/:id/claim', protect, authorize('recipient', 'ngo'), async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    if (donation.status !== 'available') {
      return res.status(400).json({ error: 'This donation is no longer available' });
    }

    donation.status = 'reserved';
    donation.claimedBy = req.user._id;
    donation.claimedAt = new Date();
    await donation.save();

    res.json({
      success: true,
      donation,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error claiming donation' });
  }
});

// @route   PUT /api/donations/:id/collect
// @desc    Mark donation as collected
// @access  Private
router.put('/:id/collect', protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    if (donation.donorId.toString() !== req.user._id.toString() &&
        donation.claimedBy?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    donation.status = 'collected';
    donation.collectedAt = new Date();
    await donation.save();

    // Update recipient stats
    if (donation.claimedBy) {
      await User.findByIdAndUpdate(donation.claimedBy, { $inc: { donationsReceived: 1 } });
    }

    res.json({
      success: true,
      donation,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/donations/:id
// @desc    Delete a donation
// @access  Private (Owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    if (donation.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this donation' });
    }

    await donation.deleteOne();

    res.json({
      success: true,
      message: 'Donation removed successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting donation' });
  }
});

export default router;
