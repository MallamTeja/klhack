import express from 'express';
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
    res.status(200).json({ status: "ok", message: "Register stub" });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    res.status(200).json({ status: "ok", message: "Login stub" });
});

export default router;
