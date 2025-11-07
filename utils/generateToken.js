const jwt = require('jsonwebtoken');

const generateToken = (id) => {
\treturn jwt.sign({ id }, process.env.JWT_SECRET, {
\t\texpiresIn: process.env.JWT_EXPIRES_IN || '1h',
\t});
};

module.exports = generateToken;

