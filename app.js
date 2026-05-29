const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/course.routes');
require('dotenv').config();

const app = express();

/**
 * CORS MUST BE BEFORE ALL ROUTES
 */
app.use(
  cors({
    origin: [
      'https://www.coursedesiqna.com',
      'https://coursedesiqna.com',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Awesome it works 🐻',
  });
});

// Routes
app.use('/course', courseRoutes);

// 404 handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
});

// Connect DB
connectDB();

// Route logger
const listRoutes = (app, baseUrl) => {
  console.log('📂 Available Routes:');

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const method = Object.keys(
        middleware.route.methods
      ).join(', ').toUpperCase();

      console.log(`${method} ${baseUrl}${middleware.route.path}`);
    }
  });
};

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}`);
  try {
    listRoutes(app, BASE_URL);
  } catch (err) {
    console.log('Route listing skipped');
  }
});
