import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import tracksRouter from './routes/tracks.js';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3001', 10);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/tracks', tracksRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'No such route' });
});

app.listen(PORT, () => {
  console.log(`LearnStack API listening on port ${PORT}`);
  console.log(`Content path: ${process.env.CONTENT_REPO_PATH ?? '(default)'}`);
});
