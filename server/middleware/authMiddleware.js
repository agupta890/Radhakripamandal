const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'radha_kripa_mandal_super_secret_spiritual_jwt_key_2026');

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'उपयोगकर्ता नहीं मिला' });
      }

      next();
    } catch (error) {
      console.error('JWT Error:', error.message);
      return res.status(401).json({ success: false, message: 'अमान्य अथवा समाप्त टोकन, कृपया पुनः लॉगिन करें' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'प्राधिकरण अस्वीकृत, टोकन उपलब्ध नहीं है' });
  }
};

module.exports = { protect };
