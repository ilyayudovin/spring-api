import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from './../middlewares/asyncMiddleware.js';

const router = express.Router();

const generateToken = (user) => {
  const signature = 'my-super-secret';
  const expiration = '6h';
  return jwt.sign({ user }, signature, { expiresIn: expiration });
};

router.post('/', asyncHandler((req, res) => {
  const user = req.body;
  const token = generateToken(user);
  res.json({
    token: token
  });
}));


export default router;
