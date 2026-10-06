const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin','editor','viewer'], default: 'viewer' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
