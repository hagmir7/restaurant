const jwt = require('jsonwebtoken');
const User = require('../models/User');




exports.protect = async (req, res, next) => {

    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

            // Return auth user data
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

exports.protectAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const token = authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decode.id).populate('role').select('-password');

    if (!user.role || user.role.name !== 'Admin') {
      return res.status(401).json({ message: 'You are not an admin!' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
