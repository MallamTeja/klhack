import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    tax_rate: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    business_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessProfile',
        required: true
    },
    ctin: {
        type: String, // Optional counterparty GSTIN
    },
    inum: {
        type: String,
        required: true
    },
    date: {
        type: String, // Can be parsed later, keeping as string for simplicity
        required: true
    },
    pos: {
        type: String, // Place of supply state code
        required: true
    },
    items: [invoiceItemSchema],
    raw_image_urls: [{ type: String }]
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
