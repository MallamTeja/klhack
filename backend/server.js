import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

// Route imports
import authRoutes from './routes/auth.js';
import businessRoutes from './routes/business.js';
import invoiceRoutes from './routes/invoice.js';
import returnsRoutes from './routes/returns.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Resolve path for .env file at the root level (one directory up from backend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/return', returnsRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'TaxFlow API Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
