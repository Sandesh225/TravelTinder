import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/index.js'; // Assumes you have a connectDB function

// Load environment variables
dotenv.config({
  path: './.env',
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server after successful DB connection
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed!', err);
  });
