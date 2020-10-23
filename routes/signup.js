import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from './../dbConfig.js';
import {generateToken} from "../jwt/token.js";

const router = express.Router();

router.post('/', async (req, res) => {
  const newUser = req.body;
  const token = generateToken(newUser);
  const {username, firstName, secondName, password, email, age} = newUser;
  const hashedPassword = await bcrypt.hash(password, 10);
  pool.query('INSERT INTO public."Users" (username, firstname, secondname, password, email, age) VALUES ($1, $2, $3, $4, $5, $6)',
    [username, firstName, secondName, hashedPassword, email, age],
    (error, result) => {
    if (error) {
      throw error;
    }
    res.status(201).json(token);
  })
});

router.get('/', (req, res) => {
  pool.query('SELECT * FROM public."Users" ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
});


export default router;
