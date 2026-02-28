import express from 'express';
import ReturnRequest from '../models/ReturnRequest.js';
import BusinessProfile from '../models/BusinessProfile.js';
import Invoice from '../models/Invoice.js';
import { generateGSTReturnJSON } from '../utils/gstTransformer.js';

const router = express.Router();

// POST /api/return
router.post('/', async (req, res) => {
    res.status(200).json({ status: "ok", message: "Create return request stub" });
});

// POST /api/return/:id/generate-json
router.post('/:id/generate-json', async (req, res) => {
    try {
        const returnId = req.params.id;
        const returnReq = await ReturnRequest.findById(returnId);

        if (!returnReq) {
            return res.status(404).json({ error: "Return request not found" });
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

export default router;
