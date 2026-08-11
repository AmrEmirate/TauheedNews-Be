import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articlesRouter from './routes/articles';
import categoriesRouter from './routes/categories';
import searchRouter from './routes/search';
import kajianRouter from './routes/kajian';
import mediaRouter from './routes/media';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const CORS_ORIGIN = process.env.FRONTEND_URL || '*';
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Routes
app.use('/api/articles', articlesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/search', searchRouter);
app.use('/api/kajian', kajianRouter);
app.use('/api/media', mediaRouter);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Tauheed News Express API Server is running.' });
});

app.listen(PORT, () => {
  console.log(`Tauheed News Express Backend running on http://localhost:${PORT}`);
});
