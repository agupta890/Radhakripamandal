import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image, CheckCircle2 } from 'lucide-react';
import API from '../../services/api';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';

const CATEGORIES = ['धार्मिक कार्यक्रम', 'सत्संग', 'भजन संध्या', 'सेवा कार्य', 'विशेष उत्सव'];

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const initialForm = {
    title: '',
    category: 'धार्मिक कार्यक्रम',
    imageUrl: '',
    caption: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await API.get('/gallery');
      if (res.data.success) {
        setImages(res.data.images);
      }
    } catch (err) {
      console.error('Fetch gallery error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('क्या आप निश्चित रूप से इस चित्र को हटाना चाहते हैं?')) {
      try {
        const res = await API.delete(`/gallery/${id}`);
        if (res.data.success) {
          setImages(images.filter((img) => img._id !== id));
          setFeedback('चित्र सफलतापूर्वक हटा दिया गया');
          setTimeout(() => setFeedback(''), 3000);
        }
      } catch (err) {
        alert('हटाने में त्रुटि आई');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.post('/gallery', formData);
      if (res.data.success) {
        setImages([res.data.image, ...images]);
        setFeedback('नया चित्र गैलरी में जोड़ा गया');
        setIsModalOpen(false);
        setFormData(initialForm);
        setTimeout(() => setFeedback(''), 3000);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'त्रुटि आई');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-hindi">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
        <div>
          <h1 className="font-spiritual text-2xl font-bold text-maroon-950">
            गैलरी प्रबंधन (Manage Gallery)
          </h1>
          <p className="text-xs text-stone-500">
            उत्सव, सत्संग एवं सेवा कार्यों की छवियों को जोड़ें एवं प्रबंधित करें
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>नया चित्र जोड़ें</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <Loader message="गैलरी लोड हो रही है..." />
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <p className="text-stone-600 text-sm">गैलरी में कोई चित्र नहीं है। नया चित्र जोड़ने के लिए ऊपर दिए गए बटन पर क्लिक करें।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200 transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 bg-stone-100">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleDelete(img._id)}
                  className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow transition"
                  title="हटाएं"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-maroon-900/90 text-gold-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-gold-500/30">
                  {img.category}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-spiritual text-sm font-bold text-maroon-950 line-clamp-1">
                  {img.title}
                </h4>
                {img.caption && (
                  <p className="text-[11px] text-stone-500 line-clamp-1">{img.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="नया चित्र जोड़ें"
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-hindi">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                चित्र का शीर्षक *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="उदा. भव्य संकीर्तन संध्या"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                श्रेणी (Category) *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                चित्र का यूआरएल (Image URL) *
              </label>
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                कैप्शन / विवरण (वैकल्पिक)
              </label>
              <input
                type="text"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                placeholder="उदा. वृन्दावन आश्रम प्रांगण"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow transition"
              >
                {saving ? 'सहेजा जा रहा है...' : 'चित्र जोड़ें'}
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default ManageGallery;
