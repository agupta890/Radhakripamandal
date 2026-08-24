const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    sanstha: 'श्री राधा कृपा मंडल संस्था',
    message: 'जय श्री राधे! Backend API is operational.'
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/volunteer', require('./routes/volunteerRoutes'));
app.use('/api/book-requests', require('./routes/bookRequestRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API रूट नहीं मिला (Endpoint not found)'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'आंतरिक सर्वर त्रुटि (Internal Server Error)'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌸 Server running on port ${PORT} | श्री राधा कृपा मंडल संस्था API`);
});
