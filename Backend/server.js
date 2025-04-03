const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const loanRoutes = require('./routes/loanRoutes');
const { globalErrorHandler } = require('./middlewares/errorMiddleware');
const { authenticateJWT } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Throttle API

// Routes
app.use('/auth', authRoutes);
app.use('/loans', authenticateJWT, loanRoutes);

// Global Error Handler
app.use(globalErrorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
