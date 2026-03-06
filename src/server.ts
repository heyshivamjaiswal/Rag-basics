import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { initialIndex } from './vector/vectorDB';
import { search } from './rag/query';
import { ingestionBook } from './ingestion/ingestionResource';
import multer from 'multer';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//multer uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploads = multer({ storage });

//html file
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.send('RAG PDF SERVER IS RUNNING');
});

//upload pdf

app.post('/upload', async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'no file uploaded' });
  }
  const filePath = path.join('uploads', req.file.filename);

  await ingestionBook(filePath);

  res.json({ message: 'PDF successfull' });
});

app.post('/ask', async (req: Request, res: Response) => {
  const { question } = req.body;
  const answer = await search(question);

  res.json({ answer });
});

const PORT = process.env.PORT || 3000;

async function start() {
  await initialIndex();

  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
}

start();
