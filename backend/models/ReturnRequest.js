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
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'PENDING'
    },
    json_result: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

returnRequestSchema.statics.findById = function (id) {
    return this.findOne({ _id: id });
};

returnRequestSchema.statics.updateResult = async function (id, status, jsonResult) {
    return this.findOneAndUpdate(
        { _id: id },
        { status, json_result: jsonResult },
        { new: true }
    );
};

returnRequestSchema.statics.create = async function (data) {
    const request = new this(data);
    return request.save();
};

const ReturnRequest = mongoose.model('ReturnRequest', returnRequestSchema);

export default ReturnRequest;
