import express from 'express';
import bcrypt from "bcrypt";
import { User } from './../models/userModel.js';
import jwt from "jsonwebtoken";

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
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        throw err;
      }
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
    })
  }
  catch (err) {
    res.json({
      type: 'username',
      error: 'No such username'
    });
  }
});

export default router;
