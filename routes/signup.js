import express from 'express';
import bcrypt from 'bcrypt';
import { User } from './../models/userModel.js';
import jwt from "jsonwebtoken";
const router = express.Router();

export const generateToken = (user) => {
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

export default router;
