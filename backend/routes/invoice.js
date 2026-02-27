import express from 'express';
const router = express.Router();

// POST /api/invoice
router.post('/', async (req, res) => {
    res.status(200).json({ status: "ok", message: "Create invoice stub" });
});

// GET /api/invoice
router.get('/', async (req, res) => {
    res.status(200).json([{ status: "ok", message: "Get invoices stub" }]);
});

export default router;
