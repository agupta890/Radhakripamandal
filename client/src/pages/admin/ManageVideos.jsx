import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Video, CheckCircle2, Play } from 'lucide-react';
import API from '../../services/api';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';

const CATEGORIES = ['भजन', 'सत्संग', 'प्रवचन', 'धार्मिक कार्यक्रम', 'आरती एवं वंदना'];

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  
  const initialForm = {
    title: '',
    category: 'भजन',
    youtubeUrl: '',
    description: '',
    isFeatured: false
  };

  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await API.get('/videos');
      if (res.data.success) {
        setVideos(res.data.videos);
      }
    } catch (err) {
      console.error('Fetch videos error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingVideo(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (v) => {
    setEditingVideo(v);
    setFormData({
      title: v.title,
      category: v.category,
      youtubeUrl: v.youtubeUrl || `https://www.youtube.com/watch?v=${v.videoId}`,
      description: v.description || '',
      isFeatured: v.isFeatured || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('क्या आप निश्चित रूप से इस वीडियो को हटाना चाहते हैं?')) {
      try {
        const res = await API.delete(`/videos/${id}`);
        if (res.data.success) {
          setVideos(videos.filter((v) => v._id !== id));
          setFeedback('वीडियो हटा दिया गया है');
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
      if (editingVideo) {
        const res = await API.put(`/videos/${editingVideo._id}`, formData);
        if (res.data.success) {
          setVideos(videos.map((v) => (v._id === editingVideo._id ? res.data.video : v)));
          setFeedback('वीडियो सफलतापूर्वक अपडेट किया गया');
        }
      } else {
        const res = await API.post('/videos', formData);
        if (res.data.success) {
          setVideos([res.data.video, ...videos]);
          setFeedback('नया वीडियो लिंक जोड़ा गया');
        }
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedback(''), 3000);
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
            वीडियो प्रबंधन (Manage Videos)
          </h1>
          <p className="text-xs text-stone-500">
            यूट्यूब भजन, प्रवचन एवं सत्संग वीडियो लिंक जोड़ें, संपादित करें अथवा हटाएं
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>नया वीडियो जोड़ें</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Videos Grid */}
      {loading ? (
        <Loader message="वीडियो सूची लोड हो रही है..." />
      ) : videos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <p className="text-stone-600 text-sm">वर्तमान में कोई वीडियो नहीं है। नया वीडियो जोड़ने के लिए ऊपर दिए गए बटन पर क्लिक करें।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${vid.videoId || '7b70yq9gPec'}/hqdefault.jpg`}
                    alt={vid.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute top-2 left-2 bg-maroon-900/90 text-gold-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-gold-500/30">
                    {vid.category}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="font-spiritual text-sm font-bold text-maroon-950 line-clamp-2">
                    {vid.title}
                  </h4>
                  {vid.description && (
                    <p className="text-xs text-stone-500 line-clamp-2">{vid.description}</p>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-400">ID: {vid.videoId}</span>
                
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(vid)}
                    className="p-1.5 text-stone-600 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg transition"
                    title="संपादित करें"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(vid._id)}
                    className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="हटाएं"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingVideo ? 'वीडियो संपादित करें' : 'नया वीडियो जोड़ें'}
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-hindi">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                वीडियो का शीर्षक *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="उदा. श्री राधा कृपा कटाक्ष स्तोत्रम्"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                श्रेणी (Category) *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                YouTube लिंक अथवा Video ID *
              </label>
              <input
                type="text"
                required
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                विवरण (वैकल्पिक)
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="वीडियो के बारे में संक्षिप्त जानकारी..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs sm:text-sm resize-none"
              ></textarea>
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
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow transition"
              >
                {saving ? 'सहेजा जा रहा है...' : (editingVideo ? 'अपडेट करें' : 'वीडियो जोड़ें')}
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default ManageVideos;
