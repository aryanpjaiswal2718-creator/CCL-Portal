const CCL = require('../models/Ccl');
const Content = require('../models/Content');

exports.listCcls = async (req, res) => {
  const ccls = await CCL.find({ active: true }).select('-sections').sort({ name: 1 });
  res.json(ccls);
};

exports.getCcl = async (req, res) => {
  const ccl = await CCL.findOne({ slug: req.params.slug, active: true });
  if (!ccl) return res.status(404).json({ message: 'CCL not found' });
  const sections = ccl.sections.filter(s => s.visibility === 'public');
  const content = await Content.find({ ccl: ccl._id, visibility: 'public', status: 'published' }).sort({ publishedAt: -1, createdAt: -1 });
  res.json({ ...ccl.toObject(), sections, content });
};

exports.getContent = async (req, res) => {
  const ccl = await CCL.findOne({ slug: req.params.slug, active: true });
  if (!ccl) return res.status(404).json({ message: 'CCL not found' });
  const filter = { ccl: ccl._id, visibility: 'public', status: 'published' };
  if (req.query.type) filter.type = req.query.type;
  const content = await Content.find(filter).sort({ publishedAt: -1, createdAt: -1 });
  res.json(content);
};
