import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import Prisma Client
import { PrismaClient } from '@prisma/client';

// Import blog routes
import blogRoutes from './routes/blog';
// Import case studies routes
import caseStudiesRoutes from './routes/caseStudies';
// Import contact routes
import contactRoutes from './routes/contact';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware for security, CORS, and JSON parsing
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Health check route
 * GET /health
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'TechFlow Solutions API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * API welcome route
 * GET /api
 */
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to TechFlow Solutions API',
    version: '1.0.0'
  });
});

/**
 * Use blog routes for /api/blog
 */
app.use('/api/blog', blogRoutes);
/**
 * Use case studies routes for /api/case-studies
 */
app.use('/api/case-studies', caseStudiesRoutes);
/**
 * Use contact routes for /api/contact
 */
app.use('/api/contact', contactRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 TechFlow Solutions API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});