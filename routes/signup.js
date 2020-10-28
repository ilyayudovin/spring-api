const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('../middlewares/asyncMiddleware');
const router = express.Router();

const generateToken = (id) => {
  const signature = 'my-super-secret';
  const expiration = '6h';
  return jwt.sign({ id }, signature, { expiresIn: expiration });
};

router.post('/', asyncHandler (async (req, res, next) => {
  const newUser = req.body;
  const { username, firstName, lastName, password, email, age } = newUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({
    id: uuidv4(),
    username: username,
    firstname: firstName,
    lastname: lastName,
    password: hashedPassword,
    email: email,
    age: age
  })
    .then(user => res.status(200).json(generateToken(user.id))
    .catch(err => res.status(400).json(err)))
}));

module.exports = router;
