const jwt = require('jsonwebtoken');

function auth(required = true) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      if (!required) return next();
      return res.status(401).json({ message: 'Authentication required' });
    }
    try {
      req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET);
      next();
    } catch {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

function requireRole(...roles) {
  return (req, res, next) => roles.includes(req.user?.role)
    ? next()
    : res.status(403).json({ message: 'Insufficient permissions' });
}

module.exports = { auth, requireRole };
