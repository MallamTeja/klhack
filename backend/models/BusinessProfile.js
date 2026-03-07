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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

businessProfileSchema.statics.findById = function (id) {
    return this.findOne({ _id: id });
};

businessProfileSchema.statics.findByUserId = function (userId) {
    return this.find({ user_id: userId });
};

businessProfileSchema.statics.create = async function (data) {
    const profile = new this(data);
    return profile.save();
};

const BusinessProfile = mongoose.model('BusinessProfile', businessProfileSchema);

export default BusinessProfile;
