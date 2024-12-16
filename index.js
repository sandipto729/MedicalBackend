const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;
const userRoutes = require('./routes/index');
const path = require('path');
const cookieParser =require('cookie-parser');
// Load environment variables
require('dotenv').config();

app.use(cookieParser());



// Connect to MongoDB
connectDB();

// Middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Express Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
