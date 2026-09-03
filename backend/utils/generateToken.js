const jwt = require('jsonwebtoken');

/**
 * Sign a JWT containing {id, role}.
 * @param {string} id
 * @param {'user'|'admin'} role
 */
const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = generateToken;
