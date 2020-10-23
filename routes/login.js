import express from 'express';
import asyncHandler from './../middlewares/asyncMiddleware.js';
import {generateToken} from "../jwt/token.js";
import { pool } from './../dbConfig.js';
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/', asyncHandler((req, res) => {
  const {username, password} = req.body;
  pool.query('SELECT * FROM public."Users" WHERE username = $1',
    [username],
    (error, result) => {
      if (error) {
        throw error;
      }
      if(result.rows.length > 0){
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) {
            throw err;
          }
          if(isMatch){
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
      else {
        res.json({
          type: 'username',
          error: 'No such username'
        });
      }
    });

}));


export default router;
