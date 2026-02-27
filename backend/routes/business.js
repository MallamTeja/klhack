import express from 'express';
const router = express.Router();

// POST /api/business
router.post('/', async (req, res) => {
    res.status(200).json({ status: "ok", message: "Create business stub" });
});

// GET /api/business
router.get('/', async (req, res) => {
    res.status(200).json([{ status: "ok", message: "Get business stub" }]);
});

export default router;
