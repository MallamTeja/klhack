import express from 'express';
import Invoice from '../models/Invoice.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// POST /api/invoice
router.post('/', authMiddleware, async (req, res) => {
    try {
        const invoice = await Invoice.create({
            ...req.body,
            user_id: req.userId
        });
        res.status(201).json({ status: "ok", invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/invoice
router.get('/', authMiddleware, async (req, res) => {
    try {
        const invoices = await Invoice.find({ user_id: req.userId });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

