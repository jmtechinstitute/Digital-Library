const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Default admin password hash panna thevai
const User = require('./models/User'); // Default admin save panna thevai

// 👑 MOST IMPORTANT: Load env variables before importing routes!
dotenv.config();

// Route Imports
const bookRoutes = require('./routes/book');
const authRoutes = require('./routes/auth'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Definition
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
    
    // ==========================================
    // CREATE DEFAULT ADMIN (safi@admin)
    // ==========================================
    try {
      // Admin account already irukka nu check pandrom
      const adminExists = await User.findOne({ email: 'safi@admin' });
      
      if (!adminExists) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('safi@18', salt);
        
        const defaultAdmin = new User({
          username: 'Safi Admin',
          email: 'safi@admin',
          password: hashedPassword,
          role: 'admin' // Inga direct-aa admin role kuduthudrom
        });
        
        await defaultAdmin.save();
        console.log('👑 Default Admin Account Ready! (Email: safi@admin | Pass: safi@18)');
      } else {
        console.log('👑 Admin Account already exists.');
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