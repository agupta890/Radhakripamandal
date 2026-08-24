import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, BookOpen, Eye, CheckCircle2 } from 'lucide-react';
import API from '../../services/api';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';

const CATEGORIES = ['भक्ति व साधना', 'संस्था के कार्य', 'त्योहार एवं उत्सव', 'धार्मिक विचार', 'गौ सेवा व संस्कार'];

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  const initialForm = {
    title: '',
    excerpt: '',
    content: '',
    author: 'श्री राधा कृपा मंडल परिवार',
    category: 'भक्ति व साधना',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    tags: 'राधा रानी, भक्ति, साधना',
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await API.get('/blogs?all=true');
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (err) {
      console.error('Fetch blogs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingBlog(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (b) => {
    setEditingBlog(b);
    setFormData({
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      author: b.author || 'श्री राधा कृपा मंडल परिवार',
      category: b.category,
      image: b.image || '',
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
      isPublished: b.isPublished
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('क्या आप निश्चित रूप से इस लेख को हटाना चाहते हैं?')) {
      try {
        const res = await API.delete(`/blogs/${id}`);
        if (res.data.success) {
          setBlogs(blogs.filter((b) => b._id !== id));
          setFeedback('लेख हटा दिया गया है');
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
      if (editingBlog) {
        const res = await API.put(`/blogs/${editingBlog._id}`, formData);
        if (res.data.success) {
          setBlogs(blogs.map((b) => (b._id === editingBlog._id ? res.data.blog : b)));
          setFeedback('लेख सफलतापूर्वक अपडेट किया गया');
        }
      } else {
        const res = await API.post('/blogs', formData);
        if (res.data.success) {
          setBlogs([res.data.blog, ...blogs]);
          setFeedback('नया लेख प्रकाशित किया गया');
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
            समाचार एवं ब्लॉग प्रबंधन (Manage Blogs)
          </h1>
          <p className="text-xs text-stone-500">
            आध्यात्मिक लेख, समाचार एवं सत्संग संदेश जोड़ें, संपादित करें अथवा हटाएं
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-semibold shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>नया लेख लिखें</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Blog Table */}
      {loading ? (
        <Loader message="लेख सूची लोड हो रही है..." />
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <p className="text-stone-600 text-sm">वर्तमान में कोई लेख उपलब्ध नहीं है। नया लेख जोड़ने के लिए ऊपर दिए गए बटन पर क्लिक करें।</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                  <th className="p-4">छवि</th>
                  <th className="p-4">शीर्षक व सारांश</th>
                  <th className="p-4">श्रेणी</th>
                  <th className="p-4">लेखक</th>
                  <th className="p-4">दर्शन (Views)</th>
                  <th className="p-4">स्थिति</th>
                  <th className="p-4 text-right">कार्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {blogs.map((b) => (
                  <tr key={b._id} className="hover:bg-stone-50/80">
                    <td className="p-4">
                      <img
                        src={b.image || 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=200&q=80'}
                        alt={b.title}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-stone-900 line-clamp-1">{b.title}</div>
                      <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{b.excerpt}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-900 rounded-full font-semibold border border-amber-200">
                        {b.category}
                      </span>
                    </td>
                    <td className="p-4 text-stone-600 whitespace-nowrap">{b.author}</td>
                    <td className="p-4 font-mono text-stone-600">{b.views || 0}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {b.isPublished ? 'प्रकाशित' : 'ड्राफ्ट'}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(b)}
                        className="p-1.5 text-stone-600 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg mr-1 transition"
                        title="संपादित करें"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b._id)}
                        className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingBlog ? 'लेख संपादित करें' : 'नया लेख लिखें'}
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-hindi">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                लेख का शीर्षक *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="उदा. वृन्दावन धाम की महिमा और श्री राधा कृपा"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  श्रेणी (Category) *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  लेखक का नाम
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="उदा. स्वामी जी"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  प्रकाशन स्थिति
                </label>
                <select
                  value={formData.isPublished ? 'true' : 'false'}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'true' })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                >
                  <option value="true">प्रकाशित (Published)</option>
                  <option value="false">ड्राफ्ट (Draft)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                छवि यूआरएल (Featured Image URL)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                संक्षिप्त सारांश (Excerpt) *
              </label>
              <textarea
                required
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="2-3 पंक्तियों में लेख का मुख्य सार..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                मुख्य सामग्री (Content) *
              </label>
              <textarea
                required
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="लेख की पूर्ण सामग्री..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm resize-none font-mono"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                टैग्स (कॉमा से अलग करें)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="राधा रानी, गौ सेवा, वृन्दावन"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
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
                className="px-6 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-semibold shadow transition"
              >
                {saving ? 'सहेजा जा रहा है...' : (editingBlog ? 'अपडेट करें' : 'प्रकाशित करें')}
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default ManageBlogs;
