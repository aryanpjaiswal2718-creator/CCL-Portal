const mongoose = require('mongoose');

const cclSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  shortName: String,
  description: String,
  location: String,
  active: { type: Boolean, default: true },
  menu: [{ label: String, key: String, enabled: { type: Boolean, default: true } }],
  sections: [{
    key: String,
    title: String,
    body: String,
    visibility: { type: String, enum: ['public', 'internal'], default: 'public' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('CCL', cclSchema);
