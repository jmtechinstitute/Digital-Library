import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookFile, setBookFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('book', bookFile);
    formData.append('cover', coverFile);

    try {
      await axios.post('https://digital-library-backend-26jp.onrender.com/api/books/upload', formData);
      alert("Book Uploaded Successfully!");
      onUploadSuccess(); // Update list after upload
      setTitle('');
      setAuthor('');
    } catch (error) {
      alert("Upload Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" placeholder="Book Title" value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/20 text-white" required 
      />
      <input 
        type="text" placeholder="Author Name" value={author} 
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#0f172a] border border-white/20 text-white" required 
      />
      
      {/* PDF Upload */}
      <div className="text-sm text-gray-400">
        <label className="block mb-1">Upload Book (PDF):</label>
        <input 
          type="file" onChange={(e) => setBookFile(e.target.files[0])} 
          className="w-full p-2 rounded-lg bg-[#0f172a] border border-white/20" required 
        />
      </div>

      {/* Cover Upload */}
      <div className="text-sm text-gray-400">
        <label className="block mb-1">Upload Book Cover:</label>
        <input 
          type="file" onChange={(e) => setCoverFile(e.target.files[0])} 
          className="w-full p-2 rounded-lg bg-[#0f172a] border border-white/20" required 
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-[#8C52FF] py-3 rounded-lg font-bold hover:bg-[#713be2] transition"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Publish Book"}
      </button>
    </form>
  );
};

export default UploadForm;