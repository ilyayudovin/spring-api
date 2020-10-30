const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const generateToken = require('../tokens/generateToken');
const asyncHandler = require('../middlewares/asyncMiddleware');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username }});
    if (user === null) {
      res.status(404).json({
        type: 'username',
        error: 'No such username'
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = generateToken(user);
      res.json({
        token: token
      });
    }
    else {
      res.status(400).json({
        type: 'password',
        error: 'Incorrect password'
      })
    }
}));

module.exports = router;
