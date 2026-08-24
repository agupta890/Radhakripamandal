import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, MapPin, Sparkles, CheckCircle2, X } from 'lucide-react';
import API from '../../services/api';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';

const CATEGORIES = ['भागवत कथा', 'भजन संध्या', 'सत्संग', 'सेवा कार्यक्रम', 'धार्मिक यात्रा', 'उत्सव', 'अन्य'];

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  const initialForm = {
    title: '',
    category: 'सत्संग',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: 'सायं 5:00 बजे से 8:00 बजे तक',
    location: 'श्री राधा कृपा आश्रम, वृन्दावन',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
    organizer: 'श्री राधा कृपा मंडल संस्था',
    isFeatured: false,
    status: 'upcoming'
  };

  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await API.get('/events');
      if (res.data.success) {
        setEvents(res.data.events);
      }
    } catch (err) {
      console.error('Fetch events error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditModal = (ev) => {
    setEditingEvent(ev);
    setFormData({
      title: ev.title,
      category: ev.category,
      description: ev.description,
      date: ev.date ? new Date(ev.date).toISOString().split('T')[0] : '',
      time: ev.time || '',
      location: ev.location,
      image: ev.image || '',
      organizer: ev.organizer || 'श्री राधा कृपा मंडल संस्था',
      isFeatured: ev.isFeatured || false,
      status: ev.status || 'upcoming'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('क्या आप निश्चित रूप से इस कार्यक्रम को हटाना चाहते हैं?')) {
      try {
        const res = await API.delete(`/events/${id}`);
        if (res.data.success) {
          setEvents(events.filter((e) => e._id !== id));
          setFeedback('कार्यक्रम हटा दिया गया है');
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
      if (editingEvent) {
        const res = await API.put(`/events/${editingEvent._id}`, formData);
        if (res.data.success) {
          setEvents(events.map((ev) => (ev._id === editingEvent._id ? res.data.event : ev)));
          setFeedback('कार्यक्रम सफलतापूर्वक अपडेट किया गया');
        }
      } else {
        const res = await API.post('/events', formData);
        if (res.data.success) {
          setEvents([res.data.event, ...events]);
          setFeedback('नया कार्यक्रम जोड़ा गया');
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
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
        <div>
          <h1 className="font-spiritual text-2xl font-bold text-maroon-950">
            कार्यक्रम प्रबंधन (Manage Events)
          </h1>
          <p className="text-xs text-stone-500">
            कथा, सत्संग, भजन संध्या एवं सेवा कार्यक्रमों को जोड़ें, संपादित करें अथवा हटाएं
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-semibold shadow transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>नया कार्यक्रम जोड़ें</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Events Table / List */}
      {loading ? (
        <Loader message="कार्यक्रम सूची लोड हो रही है..." />
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <p className="text-stone-600 text-sm">वर्तमान में कोई कार्यक्रम नहीं है। नया कार्यक्रम जोड़ने के लिए ऊपर दिए गए बटन पर क्लिक करें।</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                  <th className="p-4">छवि</th>
                  <th className="p-4">शीर्षक व विवरण</th>
                  <th className="p-4">श्रेणी</th>
                  <th className="p-4">दिनांक व समय</th>
                  <th className="p-4">स्थान</th>
                  <th className="p-4">स्थिति</th>
                  <th className="p-4 text-right">कार्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {events.map((ev) => (
                  <tr key={ev._id} className="hover:bg-stone-50/80">
                    <td className="p-4">
                      <img
                        src={ev.image || 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=200&q=80'}
                        alt={ev.title}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-stone-900 line-clamp-1">{ev.title}</div>
                      <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{ev.description}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-saffron-50 text-saffron-800 rounded-full font-semibold border border-saffron-200">
                        {ev.category}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-stone-800">
                        {new Date(ev.date).toLocaleDateString('hi-IN')}
                      </div>
                      <div className="text-[11px] text-stone-500">{ev.time}</div>
                    </td>
                    <td className="p-4 text-stone-600 max-w-[150px] truncate">{ev.location}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ev.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {ev.status === 'upcoming' ? 'आगामी' : 'संपन्न'}
                      </span>
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(ev)}
                        className="p-1.5 text-stone-600 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg mr-1 transition"
                        title="संपादित करें"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ev._id)}
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
          title={editingEvent ? 'कार्यक्रम संपादित करें' : 'नया कार्यक्रम जोड़ें'}
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-sm font-hindi">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                कार्यक्रम का शीर्षक *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="उदा. 7 दिवसीय श्रीमद्भागवत कथा"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  स्थिति (Status) *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                >
                  <option value="upcoming">आगामी (Upcoming)</option>
                  <option value="completed">संपन्न (Completed)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  दिनांक *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  समय (Time)
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="उदा. सायं 5:00 बजे से 8:00 बजे तक"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                स्थान (Location) *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="उदा. श्री राधा कृपा मंडल आश्रम, वृन्दावन"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                छवि यूआरएल (Image URL)
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
                विस्तृत विवरण *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="कार्यक्रम का पूर्ण विवरण..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm resize-none"
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
                className="px-6 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs font-semibold shadow transition"
              >
                {saving ? 'सहेजा जा रहा है...' : (editingEvent ? 'अपडेट करें' : 'कार्यक्रम जोड़ें')}
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};

export default ManageEvents;
