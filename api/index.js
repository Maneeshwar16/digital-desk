import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from '../server/routes/userRoutes.js';
import todoRoutes from '../server/routes/todoRoutes.js';

dotenv.config({ path: './server/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Fix: dynamic + safe
const allowedOrigins = [
  'https://digital-desk.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  },
  credentials: true
}));

app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// ✅ Health Check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Todo App Backend is running!' });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
