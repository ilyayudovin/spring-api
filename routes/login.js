import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateToken = (user) => {
  const signature = 'my-super-secret';
  const expiration = '6h';
  return jwt.sign({ user }, signature, { expiresIn: expiration });
};

router.post('/', (req, res) => {
  const user = req.body;
  const token = generateToken(user);
  res.send(token);

});

export default router;
