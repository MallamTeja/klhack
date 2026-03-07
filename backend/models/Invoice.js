import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
    description: String,
    quantity: Number,
    price: Number,
    tax_rate: Number
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
    ctin: String,
    inum: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    pos: String,
    raw_image_urls: {
        type: [String],
        default: []
    },
    items: [invoiceItemSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

invoiceSchema.statics.findByBusinessId = function (businessId) {
    return this.find({ business_id: businessId });
};

invoiceSchema.statics.create = async function (data) {
    const invoice = new this(data);
    return invoice.save();
};

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
