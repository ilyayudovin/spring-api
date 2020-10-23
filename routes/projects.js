import express from 'express';
import {pool} from "../dbConfig.js";

const router = express.Router();

router.get('/', (req, res) => {
  pool.query('SELECT * FROM public."Projects"', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
});

router.get('/search', (req, res) => {
  const input = req.query.q.toLowerCase();
  pool.query(`SELECT name, text, url FROM public."Projects" WHERE LOWER(name) ~ '${input}'`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  })
});

export default router;
