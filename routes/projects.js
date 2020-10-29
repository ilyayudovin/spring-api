const express = require('express');
const { Op } = require('sequelize');
const Project = require('../models/project.js');
const asyncHandler = require('../middlewares/asyncMiddleware');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const projects = await Project.findAll({ raw: true });
  res.status(200).json(projects);
}));

router.get('/search', asyncHandler(async (req, res) => {
  const term = req.query.q.toLowerCase();
  const projects = await Project.findAll({where: { name: { [Op.iLike]: `%${term}%` }}});
  res.status(200).json(projects);
}));

module.exports = router;
