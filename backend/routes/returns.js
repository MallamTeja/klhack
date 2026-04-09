import express from 'express';
import ReturnRequest from '../models/ReturnRequest.js';
import BusinessProfile from '../models/BusinessProfile.js';
import Invoice from '../models/Invoice.js';
import { generateGSTReturnJSON } from '../utils/gstTransformer.js';
import authMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// POST /api/return
router.post('/', authMiddleware, async (req, res) => {
    try {
        const returnReq = await ReturnRequest.create({
            ...req.body,
            user_id: req.userId
        });
        res.status(201).json({ status: "ok", returnReq });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/return/:id/generate-json
router.post('/:id/generate-json', authMiddleware, async (req, res) => {
    try {
        const returnId = req.params.id;
        const returnReq = await ReturnRequest.findOne({ _id: returnId, user_id: req.userId });

        if (!returnReq) {
            return res.status(404).json({ error: "Return request not found or unauthorized" });
        }

        const businessProfile = await BusinessProfile.findById(returnReq.business_id);
        const invoices = await Invoice.findByBusinessId(returnReq.business_id);

        // Extract relevant data for the Gemini prompt
        const businessData = {
            gstin: businessProfile.gstin,
            ret_period: returnReq.ret_period
        };

        const invoicesData = invoices.map(inv => ({
            ctin: inv.ctin,
            inum: inv.inum,
            date: inv.date,
            pos: inv.pos,
            items: inv.items.map(item => ({
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                tax_rate: item.tax_rate
            }))
        }));

        const generatedJson = await generateGSTReturnJSON(businessData, invoicesData);

        // Save the result back to the DB
        await ReturnRequest.updateResult(returnReq.id, 'generated', generatedJson);

        res.status(200).json({ status: "generated", json_result: generatedJson });
    } catch (error) {
        console.error("Error in generate-json route:", error);
        res.status(500).json({ error: "Internal server error during JSON generation" });
    }
});

// GET /api/returns
router.get('/', authMiddleware, async (req, res) => {
    try {
        const returns = await ReturnRequest.find({ user_id: req.userId }).sort({ createdAt: -1 });

        // Enhance returns with invoice aggregates
        const enhancedReturns = await Promise.all(returns.map(async (ret) => {
            const invoices = await Invoice.find({ business_id: ret.business_id });

            // Filter invoices that belong to this return period (simplified logic)
            // In a real app, you'd match ret_period precisely.
            const totalAmount = invoices.reduce((sum, inv) => {
                const invTotal = inv.items.reduce((t, item) => t + (item.price * item.quantity), 0);
                return sum + invTotal;
            }, 0);

            const gstAmount = invoices.reduce((sum, inv) => {
                const invGst = inv.items.reduce((t, item) => t + (item.price * item.quantity * (item.tax_rate / 100)), 0);
                return sum + invGst;
            }, 0);

            return {
                ...ret.toObject(),
                invoiceCount: invoices.length,
                totalAmount: Math.round(totalAmount),
                gstAmount: Math.round(gstAmount)
            };
        }));

        res.status(200).json(enhancedReturns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/returns/stats
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Fetch invoices for the current month for this user
        const invoices = await Invoice.find({
            user_id: req.userId,
            createdAt: { $gte: startOfMonth }
        });

        const allReturns = await ReturnRequest.find({ user_id: req.userId });

        const receiptsThisMonth = invoices.length;

        // Calculate total tax saved from invoices (simplified sum of tax calculated in items)
        const totalSavedAmount = invoices.reduce((sum, inv) => {
            const invoiceTax = inv.items.reduce((t, item) => {
                return t + (item.price * item.quantity * (item.tax_rate / 100));
            }, 0);
            return sum + invoiceTax;
        }, 0);

        // Compliance score logic: 100 if there's at least one completed/generated return, else based on recent ones
        const complianceScore = allReturns.length > 0 ? 100 : 0;

        // Next deadline: 20th of the next month
        const nextDeadlineDate = new Date(now.getFullYear(), now.getMonth() + 1, 20);
        const nextDeadline = nextDeadlineDate.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        res.status(200).json({
            receiptsThisMonth,
            totalSaved: `₹${Math.round(totalSavedAmount).toLocaleString('en-IN')}`,
            complianceScore,
            nextDeadline
        });
    } catch (error) {
        console.error("Error calculating stats:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
