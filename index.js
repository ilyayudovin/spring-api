import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerRoutes from './routes/signup.js';
import loginRoutes from './routes/login.js';
import projectsRoutes from './routes/projects.js';
import { db } from './config/sequalize.js';

const app = express();
const PORT = process.env.PORT || 8080;

db.authenticate().then(res => console.log('connected')).catch(err => console.log('woops'));

app.use(cors());
app.use(bodyParser.json());

app.use('/signup', registerRoutes);
app.use('/login', loginRoutes);
app.use('/projects', projectsRoutes);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
