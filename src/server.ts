import express, { type Application, type Request, type Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1', messageRoutes);

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Valentine Project Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB...');

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(' Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err.message);
  });
