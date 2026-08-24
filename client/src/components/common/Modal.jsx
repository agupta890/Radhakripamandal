import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      />
      <div className={`relative bg-cream-50 w-full ${maxWidth} rounded-2xl shadow-2xl border border-gold-500/40 overflow-hidden z-10 max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white px-6 py-4 flex items-center justify-between border-b border-gold-500/30">
          <h3 className="font-spiritual text-lg md:text-xl text-gold-300 font-semibold flex items-center gap-2">
            <span>🪷</span> {title}
          </h3>
          <button
            onClick={onClose}
            className="text-cream-200 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
