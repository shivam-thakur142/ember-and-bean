import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB, getDbStatus } from './config/db.js';
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key'],
  })
);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// General Rate Limiting
app.use('/api', apiLimiter);

// API Health Check
app.get('/api/health', (req, res) => {
  const dbStatus = getDbStatus();
  res.status(200).json({
    status: 'ok',
    message: 'EMBER & BEAN API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: dbStatus.connected,
      engine: dbStatus.connected ? 'MongoDB Atlas / Local' : 'In-Memory Resilient Cache',
    },
  });
});

// Root greeting
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'EMBER & BEAN Specialty Café API',
    tagline: 'Slow mornings. Bold coffee.',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Mount Routes
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`\n☕ ================================================`);
  console.log(`   EMBER & BEAN API Server`);
  console.log(`   Tagline: "Slow mornings. Bold coffee."`);
  console.log(`   Status: Listening on port ${PORT}`);
  console.log(`   Local URL: http://localhost:${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log(`================================================\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

export default app;
