import express from 'express';
import cors from 'cors';
import userRoutes from './routes';
import { connectToDatabase } from './connection';

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Base route
app.get('/', (_req, res) => {
  res.send('Employee Management API is running');
});

// Start server
app.listen(port, async () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  await connectToDatabase();
});