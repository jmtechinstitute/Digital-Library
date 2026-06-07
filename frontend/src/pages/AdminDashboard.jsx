import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, FileText, BookOpen } from 'lucide-react';
import UploadForm from '../components/UploadForm';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('https://digital-library-backend-26jp.onrender.com/api/books');
      setBooks(res.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      try {
        await axios.delete(`https://digital-library-backend-26jp.onrender.com/api/books/${id}`);
        fetchBooks();
      } catch (error) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="pt-24 px-6 min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-[#8C52FF] flex items-center gap-3">
          <BookOpen /> Admin Control Panel
        </h1>
        <p className="text-gray-400 mt-2">Manage your digital library collections effortlessly.</p>
      </div>

      {/* Upload Form Section */}
      <div className="max-w-2xl mx-auto mb-16 bg-[#1e293b] p-8 rounded-2xl border border-white/10 shadow-xl">
        <h2 className="text-xl font-bold mb-6 text-center">Add New Book to Library</h2>
        <UploadForm onUploadSuccess={fetchBooks} />
      </div>
      
      {/* Books List Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-[#8C52FF] pl-4">Manage Library Books</h2>
        
        {books.length === 0 ? (
          <p className="text-center text-gray-500 italic">No books available in library.</p>
        ) : (
          books.map((book) => (
            <div 
              key={book._id} 
              className="flex items-center justify-between bg-[#1e293b] p-6 rounded-2xl mb-4 border border-white/5 hover:border-[#8C52FF] transition-all"
            >
              <div className="flex items-center gap-4">
                {/* Book Icon */}
                <div className="bg-[#8C52FF]/20 p-3 rounded-lg text-[#8C52FF]">
                  <FileText className="w-6 h-6" />
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-400">Author: {book.author}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <a 
                  href={book.pdfUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs bg-white/10 px-3 py-1 rounded-full hover:bg-[#8C52FF] transition"
                >
                  View PDF
                </a>
                <button 
                  onClick={() => handleDelete(book._id)} 
                  className="text-red-400 p-2 hover:bg-red-500/20 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;