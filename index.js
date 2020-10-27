const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registerRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const projectsRoutes = require('./routes/projects');
const db = require('./config/sequalizeConfig');

const app = express();
const PORT = process.env.PORT || 8080;

db.authenticate().then(res => console.log('connected')).catch(err => console.log('woops'));

app.use(cors());
app.use(bodyParser.json());

app.use('/signup', registerRoutes);
app.use('/login', loginRoutes);
app.use('/projects', projectsRoutes);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
