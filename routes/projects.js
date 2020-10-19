import express from 'express';
import projectsInfo from '../projectsInfo.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    projectsInfo: projectsInfo
  });
});

router.get('/:text', (req, res) => {
  const inputText = req.params.text;
  const searchedInfo = projectsInfo.filter((card) => card.name.toLowerCase().includes(inputText.toLowerCase()));
  res.json({
    projectsInfo: searchedInfo
  });
});

export default router;
