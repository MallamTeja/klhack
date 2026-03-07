import express from 'express';
import Invoice from '../models/Invoice.js';

const router = express.Router();

// POST /api/invoice
router.post('/', async (req, res) => {
    try {
        const invoice = await Invoice.create(req.body);
        res.status(201).json({ status: "ok", invoice });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/invoice
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

