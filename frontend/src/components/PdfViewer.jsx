import React from 'react';
import { X } from 'lucide-react';

const PdfViewer = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  // Cloudinary PDF-a Google PDF Viewer-kku convert pandrom
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f172a] w-full max-w-5xl h-[90vh] rounded-2xl border border-white/10 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h2 className="text-white font-bold">PDF Reader</h2>
          <button onClick={onClose} className="text-white bg-red-500/20 p-2 rounded-full hover:bg-red-500/50 transition">
            <X size={20} />
          </button>
        </div>

        {/* Google PDF Viewer (Fixes loading issue) */}
        <iframe 
          src={googleViewerUrl} 
          className="w-full h-full flex-grow"
          title="PDF Viewer"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default PdfViewer;