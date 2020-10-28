const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const router = express.Router();

const generateToken = (user) => {
  const signature = 'my-super-secret';
  const expiration = '6h';
  return jwt.sign({ user }, signature, { expiresIn: expiration });
};

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username }});
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = generateToken(user);
      res.json({
        token: token
      });
    }
    else {
      res.status(401).json({
        type: 'password',
        error: 'Incorrect password'
      })
    }
  }
  catch (err) {
    res.status(404).json({
      type: 'username',
      error: 'No such username'
    });
  }
});

module.exports = router;
