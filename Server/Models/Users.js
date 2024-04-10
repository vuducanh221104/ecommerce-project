const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    fullname: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: { type: String },
    password: { type: String },
    avatar: { type: String, default: null },
    comfirmPassword: { type: String },
    forgotPassToken: { type: String },
    isVerified: { type: Boolean, default: false },
    role: { type: Number },
    createdAt: { type: Date, default: Date.now },
    verificationToken: { type: String },
    newEmail: { type: String },
    newEmailVerificationToken: { type: String },
});

module.exports = mongoose.model('users', Users);
