import express from 'express';
import projectsInfo from '../projectsInfo.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(projectsInfo);
});

router.get('/:text', (req, res) => {
  const inputText = req.params.text;
  const cards = projectsInfo.filter((card) => card.name.toLowerCase().includes(inputText.toLowerCase()));
  res.send(cards);
});

export default router;
