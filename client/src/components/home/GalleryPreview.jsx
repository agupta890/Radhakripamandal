import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye, Image as ImageIcon } from 'lucide-react';
import API from '../../services/api';
import Modal from '../common/Modal';

const GalleryPreview = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await API.get('/gallery?limit=6');
        if (res.data.success) {
          setImages(res.data.images);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-cream-50 via-cream-100/50 to-cream-50 font-hindi border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>चित्र वीथिका</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-spiritual text-maroon-950">
              भक्ति एवं सेवा की <span className="text-saffron-gradient">पावन झलकियां</span>
            </h2>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-saffron-700 hover:text-saffron-800 transition"
          >
            <span>संपूर्ण गैलरी देखें (Full Gallery)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12 text-stone-500 text-sm">चित्र लोड हो रहे हैं...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-stone-600">गैलरी में चित्र शीघ्र ही उपलब्ध होंगे।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div
                key={img._id}
                onClick={() => setSelectedImage(img)}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-white cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 bg-maroon-900/80 px-2.5 py-0.5 rounded-full self-start mb-2 border border-gold-500/30">
                    {img.category}
                  </span>
                  <h4 className="font-spiritual text-base font-bold text-cream-100 group-hover:text-gold-300 transition-colors line-clamp-1">
                    {img.title}
                  </h4>
                  {img.caption && (
                    <p className="text-xs text-cream-200/80 line-clamp-1 mt-0.5">
                      {img.caption}
                    </p>
                  )}
                </div>

                {/* View Icon on hover */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          title={selectedImage.title}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4 font-hindi">
            <div className="rounded-xl overflow-hidden shadow-2xl bg-black max-h-[70vh] flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-stone-200 text-xs">
              <span className="font-semibold text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200 self-start">
                {selectedImage.category}
              </span>
              {selectedImage.caption && (
                <p className="text-stone-600 italic">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default GalleryPreview;
