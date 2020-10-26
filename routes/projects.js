import express from 'express';
import pkg from 'sequelize';
const { Op } = pkg;
import { Project } from "../models/projectModel.js";

const router = express.Router();

router.get('/', (req, res) => {
  Project.findAll()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(400).json(err))
});

router.get('/search', (req, res) => {
  const term = req.query.q.toLowerCase();
  Project.findAll({ where: { name: { [Op.iLike]: `%${term}%` }}})
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(400).json(err))
});

export default router;
