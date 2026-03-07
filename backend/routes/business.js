import express from 'express';
import BusinessProfile from '../models/BusinessProfile.js';

const router = express.Router();

// POST /api/business
router.post('/', async (req, res) => {
    try {
        const business = await BusinessProfile.create(req.body);
        res.status(201).json({ status: "ok", business });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/business
router.get('/', async (req, res) => {
    try {
        const businesses = await BusinessProfile.find();
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

