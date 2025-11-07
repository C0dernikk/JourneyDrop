const jwt = require('jsonwebtoken');

function signToken(userId, payload = {}) {
  return jwt.sign({ id: userId, ...payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
}

module.exports = { signToken };


