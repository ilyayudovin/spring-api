import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import loginRoutes from './routes/login.js';
import projectsRoutes from './routes/projects.js';

const app = express();
const PORT = 3030;

app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/projects', projectsRoutes);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
