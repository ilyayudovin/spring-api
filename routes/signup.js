import express from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from "../jwt/token.js";
import { User } from './../models/userModel.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const newUser = req.body;
  const token = generateToken(newUser);
  const { username, firstName, lastName, password, email, age } = newUser;
  const hashedPassword = await bcrypt.hash(password, 10);
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
