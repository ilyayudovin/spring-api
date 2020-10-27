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

router.post('/', (req, res) => {
  const newUser = req.body;
  const token = generateToken(newUser);
  const { username, firstName, lastName, password, email, age } = newUser;
  const hashedPassword = bcrypt.hashSync(password, 10);
  User.create({
    username: username,
    firstname: firstName,
    lastname: lastName,
    password: hashedPassword,
    email: email,
    age: age
  })
    .then(user => res.status(200).json(token))
    .catch(err => res.status(400).json(err))
});

module.exports = router;
