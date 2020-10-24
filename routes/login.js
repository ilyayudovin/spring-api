import express from 'express';
import { generateToken } from "../jwt/token.js";
import bcrypt from "bcrypt";
import { User } from './../models/userModel.js';

const router = express.Router();

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
