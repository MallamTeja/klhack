import mongoose from 'mongoose';

const businessProfileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gstin: {
        type: String,
        required: true,
        unique: true
    },
    legal_name: {
        type: String,
        required: true
    },
    state_code: {
        type: String,
        required: true
    }
}, { timestamps: true });

const BusinessProfile = mongoose.model('BusinessProfile', businessProfileSchema);
export default BusinessProfile;
