const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  ccl: { type: mongoose.Schema.Types.ObjectId, ref: 'CCL', required: true, index: true },
  type: { type: String, enum: ['story','image','video','audio','document','survey','dashboard','event','place','person','map','download'], required: true },
  title: { type: String, required: true },
  slug: String,
  description: String,
  body: String,
  mediaUrl: String,
  thumbnailUrl: String,
  metadata: mongoose.Schema.Types.Mixed,
  visibility: { type: String, enum: ['public','internal'], default: 'public' },
  status: { type: String, enum: ['draft','published'], default: 'draft' },
  publishedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
