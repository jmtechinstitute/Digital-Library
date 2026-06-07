const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  author: { 
    type: String, 
    required: true,
    trim: true 
  },
  coverImage: { 
    type: String, 
    required: true // Cover image file path
  },
  pdfFile: { 
    type: String, 
    required: true // PDF file path
  },
  accessType: { 
    type: String, 
    enum: ['free', 'membership'], 
    required: true // Free-aa illana Membership thevaiya nu set panna
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);