const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/userModel.js');
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
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const token = generateToken(user);
      res.json({
        token: token
      });
    }
    else {
      res.json({
        type: 'password',
        error: 'Incorrect password'
      })
    }
  }
  catch (err) {
    res.json({
      type: 'username',
      error: 'No such username'
    });
  }
});

module.exports = router;
