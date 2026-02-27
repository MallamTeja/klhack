import mongoose from 'mongoose';

const returnRequestSchema = new mongoose.Schema({
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
    ret_period: {
        type: String, // e.g., '012024'
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'generated'],
        default: 'draft'
    },
    json_result: {
        type: mongoose.Schema.Types.Mixed // For storing the final GST JSON structure
    }
}, { timestamps: true });

const ReturnRequest = mongoose.model('ReturnRequest', returnRequestSchema);
export default ReturnRequest;
