import React, { useState, useEffect } from 'react';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { Filter, Eye, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';
import API from '../services/api';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';

const CATEGORIES = ['सभी', 'धार्मिक कार्यक्रम', 'सत्संग', 'भजन संध्या', 'सेवा कार्य', 'विशेष उत्सव'];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, [selectedCategory]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      let url = '/gallery';
      if (selectedCategory !== 'सभी') {
        url += `?category=${encodeURIComponent(selectedCategory)}`;
      }
      const res = await API.get(url);
      if (res.data.success) {
        setImages(res.data.images);
      }
    } catch (err) {
      console.error('Gallery error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else {
      setSelectedImageIndex(images.length - 1);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else {
      setSelectedImageIndex(0);
    }
  };

  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title="चित्र वीथिका (Photo Gallery)"
        subtitle="श्री राधा कृपा मंडल संस्था के पावन धार्मिक उत्सवों, संकीर्तन एवं सेवा कार्यों की छवियां"
        breadcrumb="गृह / गैलरी"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-maroon-900 text-gold-300 shadow-md border border-gold-500/40 scale-105'
                  : 'bg-white text-stone-700 hover:bg-saffron-50 hover:text-saffron-700 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <Loader message="चित्र वीथिका लोड हो रही है..." />
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <div className="text-5xl mb-2">🪷</div>
            <h3 className="text-xl font-bold font-spiritual text-maroon-950">कोई चित्र नहीं मिला</h3>
            <p className="text-stone-500 text-sm">इस श्रेणी में वर्तमान में कोई चित्र उपलब्ध नहीं है।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <div
                key={img._id}
                onClick={() => setSelectedImageIndex(index)}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-white cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/95 via-maroon-950/40 to-transparent opacity-75 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 bg-maroon-900/90 px-2 py-0.5 rounded self-start mb-1.5 border border-gold-500/30">
                    {img.category}
                  </span>
                  <h4 className="font-spiritual text-sm font-bold text-cream-100 group-hover:text-gold-300 transition-colors line-clamp-2">
                    {img.title}
                  </h4>
                  {img.caption && (
                    <p className="text-[11px] text-cream-200/80 line-clamp-1 mt-0.5">
                      {img.caption}
                    </p>
                  )}
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal with Next / Prev navigation */}
      {currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          
          {/* Close button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition z-20"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl w-full flex flex-col items-center z-10 px-6">
            <div className="max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl border-2 border-gold-500/40 bg-black flex items-center justify-center">
              <img
                src={currentImage.imageUrl}
                alt={currentImage.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>
            
            <div className="mt-4 text-center text-white space-y-1">
              <span className="text-xs text-gold-400 font-semibold bg-maroon-900/80 px-3 py-1 rounded-full border border-gold-500/30 inline-block">
                {currentImage.category} • ({selectedImageIndex + 1} / {images.length})
              </span>
              <h3 className="text-lg font-spiritual font-bold text-cream-100">
                {currentImage.title}
              </h3>
              {currentImage.caption && (
                <p className="text-xs text-cream-200/80 max-w-lg mx-auto">
                  {currentImage.caption}
                </p>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Gallery;
