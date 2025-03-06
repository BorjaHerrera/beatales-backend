require('dotenv').config();

const express = require('express');
const { connectDB } = require('./src/config/db');
const mainRouter = require('./src/api/routes/main');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

connectDB();

app.use('/api/v1', mainRouter);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.VERCEL_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Servidor levantado en: ${BASE_URL}`);
});
