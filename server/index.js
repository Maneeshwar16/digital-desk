import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

// Load environment variables
dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Correct allowed frontend origins (PROD + DEV)
const allowedOrigins = [
  'https://digital-desk.vercel.app', // ✅ your deployed frontend
  'http://localhost:5173'            // ✅ local dev
];

// ✅ CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// ✅ API routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ Todo App Backend is running!' });
});

// ✅ Root fallback
app.get('/', (req, res) => {
  res.send('🎯 Welcome to the Todo App Backend (Render Deployed)');
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error('❌ Internal Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ✅ Start server (for Render)
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
