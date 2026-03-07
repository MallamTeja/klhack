import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password_hash: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// For compatibility with existing route logic (if any uses the object-based model)
// we can add static methods to the schema or just use Mongoose style.
// Given the existing User.js was an object, let's make the transition smooth.

userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};

userSchema.statics.findById = function (id) {
    return this.findOne({ _id: id });
};

userSchema.statics.create = async function (userData) {
    const user = new this(userData);
    return user.save();
};

const User = mongoose.model('User', userSchema);

export default User;
