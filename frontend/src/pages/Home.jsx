import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PdfViewer from '../components/PdfViewer';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // LocalStorage-la irukkura user info-a edukkarom
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      if (res.data.success) {
        setBooks(res.data.books);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRead = (book) => {
    // Premium access control logic
    if (book.accessType === 'premium' && (!user || user.role !== 'premium')) {
      alert("This is a Premium Book! Please upgrade your membership to read. 💎");
      return;
    }
    // PDF URL-a set panni viewer-a open pandrom
    setSelectedPdf(book.pdfFile);
  };

  return (
    <div className="pt-32 px-6 min-h-screen bg-[#0f172a] text-white">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Explore the Digital Library
        </h1>
        <p className="text-gray-400 text-lg">Build, Learn & Secure your knowledge.</p>
      </div>
      
      {loading ? (
        <div className="text-center text-xl">Loading library...</div>
      ) : books.length === 0 ? (
        <div className="text-center text-gray-500">No books found in the library yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {books.map((book) => (
            <div key={book._id} className="bg-white/5 p-4 rounded-2xl border border-white/10 hover:border-[#8C52FF] transition group">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-64 object-cover rounded-xl mb-4 group-hover:scale-105 transition duration-500" 
              />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold truncate">{book.title}</h3>
                <span className={`text-[10px] px-2 py-1 rounded ${book.accessType === 'premium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                  {book.accessType.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">{book.author}</p>
              <button 
                onClick={() => handleRead(book)}
                className="w-full bg-[#8C52FF] hover:bg-[#713be2] py-2 rounded-lg font-bold transition"
              >
                {book.accessType === 'premium' ? 'Read Premium' : 'Read Now'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PDF Viewer Component Call */}
      {selectedPdf && (
        <PdfViewer 
          isOpen={true} 
          onClose={() => setSelectedPdf(null)} 
          pdfUrl={selectedPdf} 
        />
      )}
    </div>
  );
};

export default Home;