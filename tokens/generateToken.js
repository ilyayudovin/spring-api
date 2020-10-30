const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const signature = 'my-super-secret';
  const expiration = '6h';
  return jwt.sign({ id }, signature, { expiresIn: expiration });
};

module.exports = generateToken;
