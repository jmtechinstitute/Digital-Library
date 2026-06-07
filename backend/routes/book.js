const express = require('express');
const router = express.Router(); // MUKKIYAM: Ithu iruntha thaan 'router' work aagum
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Book = require('../models/Book');

// 1. Cloudinary Setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'digital_library',
      resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image',
    };
  },
});

const upload = multer({ storage: storage });

// 2. Upload Route
router.post('/upload', upload.fields([
  { name: 'coverImage', maxCount: 1 }, 
  { name: 'pdfFile', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, author, isFree } = req.body;
    const accessType = isFree === 'true' ? 'free' : 'premium';

    const newBook = new Book({
      title,
      author,
      accessType,
      coverImage: req.files.coverImage[0].path,
      pdfFile: req.files.pdfFile[0].path
    });

    await newBook.save();
    res.status(201).json({ success: true, message: 'Book Published! 📚✅' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. GET Books Route
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// 4. DELETE Route
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Book deleted successfully! ✅' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed!' });
  }
});

module.exports = router;