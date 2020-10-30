const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const generateToken = require('../tokens/generateToken');
const asyncHandler = require('../middlewares/asyncMiddleware');
const router = express.Router();

router.post('/', asyncHandler (async (req, res, next) => {
  const newUser = req.body;
  const { username, firstName, lastName, password, email, age } = newUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username: username,
    firstname: firstName,
    lastname: lastName,
    password: hashedPassword,
    email: email,
    age: age
  });
  res.json({
    token: generateToken(user.id)
  });
}));

module.exports = router;
