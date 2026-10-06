const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CCL = require('../models/Ccl');
const Content = require('../models/Content');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.createContent = async (req, res) => {
  const item = await Content.create(req.body);
  res.status(201).json(item);
};

exports.updateContent = async (req, res) => {
  const item = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: 'Content not found' });
  res.json(item);
};

exports.deleteContent = async (req, res) => {
  await Content.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

exports.createCcl = async (req, res) => res.status(201).json(await CCL.create(req.body));
exports.updateCcl = async (req, res) => res.json(await CCL.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }));
