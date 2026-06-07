import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import UploadForm from '../components/UploadForm';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books');
    setBooks(res.data.books);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    }
  };

  return (
    <div className="pt-24 px-6 min-h-screen bg-[#0f172a] text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10">Admin Control Panel</h1>
      <UploadForm onUploadSuccess={fetchBooks} />
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Manage Library Books</h2>
        {books.map((book) => (
          <div key={book._id} className="flex justify-between items-center bg-white/5 p-4 rounded-lg mb-4">
            <div>
              <h3 className="font-bold">{book.title}</h3>
              <p className="text-sm text-gray-400">{book.author}</p>
            </div>
            <button onClick={() => handleDelete(book._id)} className="text-red-400 p-2"><Trash2 /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;