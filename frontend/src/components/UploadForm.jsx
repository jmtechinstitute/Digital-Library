import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Loader2 } from 'lucide-react';

const UploadForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [pdfFile, setPdfFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isFree', isFree);
    formData.append('pdfFile', pdfFile);
    formData.append('coverImage', coverImage);

    try {
      await axios.post('https://digital-library-backend-26jp.onrender.com/api/books/upload', formData);
      alert('Book Published Successfully! ✅');
      setTitle(''); setAuthor(''); setPdfFile(null); setCoverImage(null);
      onUploadSuccess(); // Dashboard list-a update panna
    } catch (err) {
      alert('Upload Failed! ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-10 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white">Upload New Book</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="bg-black/20 p-3 rounded-lg text-white" required />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className="bg-black/20 p-3 rounded-lg text-white" required />
      </div>
      <div className="space-y-4 mb-4">
        <input type="file" onChange={(e) => setPdfFile(e.target.files[0])} className="w-full bg-black/20 p-2 rounded-lg text-gray-400" />
        <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} className="w-full bg-black/20 p-2 rounded-lg text-gray-400" />
      </div>
      <button type="button" onClick={() => setIsFree(!isFree)} className={`w-full py-2 rounded-lg font-bold ${isFree ? 'bg-green-600' : 'bg-yellow-600'}`}>
        {isFree ? 'Free Mode' : 'Premium Mode'}
      </button>
      <button type="submit" className="w-full bg-[#8C52FF] py-3 mt-4 rounded-lg font-bold">
        {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Publish'}
      </button>
    </form>
  );
};

export default UploadForm;