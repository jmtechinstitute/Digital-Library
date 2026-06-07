const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Route Imports
const bookRoutes = require('./routes/book'); // File name 'books.js' na inga 'books' nu kudunga
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors({
    origin: "*", // Testing-kku *, deploy pannum pothu unga frontend URL-a mattum allow pannunga
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Digital Library Backend is Running! 🚀');
});

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected Super-aa!');
    
    // Default Admin Setup
    try {
      const adminExists = await User.findOne({ email: 'safi@admin' });
      
      if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('safi@18', salt);
        
        const defaultAdmin = new User({
          username: 'Safi Admin',
          email: 'safi@admin',
          password: hashedPassword,
          role: 'admin'
        });
        
        await defaultAdmin.save();
        console.log('👑 Default Admin Account Created!');
      }
    } catch (error) {
      console.error('Admin Setup Error:', error);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error);
  });