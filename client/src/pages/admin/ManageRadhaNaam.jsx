import React, { useState, useEffect } from 'react';
import {
  Flame,
  BookOpen,
  Save,
  CheckCircle2,
  Trash2,
  Phone,
  MapPin,
  Sparkles,
  Truck,
  Eye,
  Settings,
  Layers
} from 'lucide-react';
import API from '../../services/api';
import Loader from '../../components/common/Loader';

const ManageRadhaNaam = () => {
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  // Counter & Book Details State
  const [settings, setSettings] = useState({
    radhaNaamCount: 54823100,
    naamAutoIncrementRate: 2,
    bookTitle: 'श्री राधा नाम लेखन महायज्ञ पुस्तिका',
    bookSubtitle: '1,08,000 पावन श्री राधा नाम हस्तलिखित संकल्प पुस्तिका',
    bookImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    bookDescription: 'यह केवल एक पुस्तिका नहीं, अपितु श्री राधा रानी की कृपा प्राप्ति का साक्षात साधन है।',
    bookPages: 108,
    bookDeliveryAvailable: true
  });

  // Book Requests List State
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' or 'requests'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [settingsRes, requestsRes] = await Promise.all([
        API.get('/settings'),
        API.get('/book-requests')
      ]);

      if (settingsRes.data.success && settingsRes.data.setting) {
        const s = settingsRes.data.setting;
        setSettings({
          radhaNaamCount: s.radhaNaamCount !== undefined ? s.radhaNaamCount : 54823100,
          naamAutoIncrementRate: s.naamAutoIncrementRate !== undefined ? s.naamAutoIncrementRate : 2,
          bookTitle: s.bookTitle || 'श्री राधा नाम लेखन महायज्ञ पुस्तिका',
          bookSubtitle: s.bookSubtitle || '1,08,000 पावन श्री राधा नाम हस्तलिखित संकल्प पुस्तिका',
          bookImage: s.bookImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
          bookDescription: s.bookDescription || 'यह केवल एक पुस्तिका नहीं, अपितु श्री राधा रानी की कृपा प्राप्ति का साक्षात साधन है।',
          bookPages: s.bookPages || 108,
          bookDeliveryAvailable: s.bookDeliveryAvailable !== undefined ? s.bookDeliveryAvailable : true
        });
      }

      if (requestsRes.data.success) {
        setRequests(requestsRes.data.requests);
      }
    } catch (err) {
      console.error('Fetch Radha Naam admin error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const res = await API.put('/settings', settings);
      if (res.data.success) {
        setFeedback('राधा नाम काउंटर एवं पुस्तिका सेटिंग्स सफलतापूर्वक अपडेट हो गईं!');
        setTimeout(() => setFeedback(''), 4000);
      }
    } catch (err) {
      alert('सेटिंग्स सहेजने में त्रुटि आई');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await API.put(`/book-requests/${id}`, { status: newStatus });
      if (res.data.success) {
        setRequests(requests.map((r) => (r._id === id ? { ...r, status: newStatus } : r)));
        setFeedback('अनुरोध स्थिति अपडेट की गई');
        setTimeout(() => setFeedback(''), 3000);
      }
    } catch (err) {
      alert('त्रुटि आई');
    }
  };

  const handleDeleteRequest = async (id) => {
    if (window.confirm('क्या आप निश्चित रूप से इस अनुरोध को हटाना चाहते हैं?')) {
      try {
        const res = await API.delete(`/book-requests/${id}`);
        if (res.data.success) {
          setRequests(requests.filter((r) => r._id !== id));
          setFeedback('अनुरोध हटा दिया गया');
          setTimeout(() => setFeedback(''), 3000);
        }
      } catch (err) {
        alert('त्रुटि आई');
      }
    }
  };

  if (loading) {
    return <Loader message="राधा नाम प्रबंधन लोड हो रहा है..." />;
  }

  return (
    <div className="space-y-6 font-hindi pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-spiritual text-2xl font-bold text-maroon-950 flex items-center gap-2">
              <span>🪷</span> श्री राधा नाम पुस्तिका एवं लाइव काउंटर प्रबंधन
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              वेबसाइट पर लाइव काउंटर की संख्या, प्रति सेकंड बढ़ने की गति, पुस्तिका छवि एवं भक्तों के वितरण अनुरोध संभालें
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-stone-100 p-1 rounded-2xl shrink-0">
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'settings'
                  ? 'bg-maroon-900 text-gold-300 shadow'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              काउंटर व पुस्तक सेटिंग्स
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'requests'
                  ? 'bg-saffron-600 text-white shadow'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              पुस्तिका अनुरोध ({requests.length})
            </button>
          </div>
        </div>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {activeTab === 'settings' ? (
        /* Settings Tab */
        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          {/* Box 1: Live Counter Control */}
          <div className="bg-gradient-to-r from-maroon-950 via-[#330a15] to-maroon-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border-2 border-gold-500/40 space-y-5">
            <div className="flex items-center gap-3 border-b border-gold-500/30 pb-3">
              <Flame className="w-6 h-6 text-saffron-400" />
              <div>
                <h3 className="font-spiritual text-xl font-bold text-gold-300">
                  श्री राधा नाम लाइव काउंटर नियंत्रण (Live Ticker Control)
                </h3>
                <p className="text-xs text-cream-200/80">
                  यहाँ से आप कुल लिखे गए नामों का बेस नंबर और ऑटो-इंक्रीमेंट स्पीड सेट कर सकते हैं।
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gold-300">
                  वर्तमान बेस संख्या (Total Radha Naam Base Count) *
                </label>
                <input
                  type="number"
                  required
                  name="radhaNaamCount"
                  value={settings.radhaNaamCount}
                  onChange={handleSettingsChange}
                  className="w-full px-4 py-3 rounded-xl border border-gold-400/60 bg-black/40 text-gold-300 font-mono text-xl sm:text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <p className="text-[11px] text-cream-200/70">
                  उदा. 54823100 (५ करोड़ ४८ लाख २३ हजार १००)
                </p>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-gold-300">
                  प्रति सेकंड स्वतः वृद्धि दर (Auto-Increment Names Per Second) *
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  max={100}
                  name="naamAutoIncrementRate"
                  value={settings.naamAutoIncrementRate}
                  onChange={handleSettingsChange}
                  className="w-full px-4 py-3 rounded-xl border border-gold-400/60 bg-black/40 text-gold-300 font-mono text-xl sm:text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <p className="text-[11px] text-cream-200/70">
                  हर सेकंड इतने नाम वेबसाइट पर लाइव जुड़ते रहेंगे (उदा. 2 प्रति सेकंड)
                </p>
              </div>
            </div>
          </div>

          {/* Box 2: Book Showcase Configuration */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
            <h3 className="font-spiritual text-lg font-bold text-maroon-950 border-b border-stone-100 pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-saffron-600" />
              <span>पुस्तिका विवरण एवं इमेज कस्टमाइज़र</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  पुस्तिका का शीर्षक (Book Title)
                </label>
                <input
                  type="text"
                  name="bookTitle"
                  value={settings.bookTitle}
                  onChange={handleSettingsChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  उप-शीर्षक (Subtitle)
                </label>
                <input
                  type="text"
                  name="bookSubtitle"
                  value={settings.bookSubtitle}
                  onChange={handleSettingsChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                पुस्तिका की वास्तविक छवि URL (Book Cover Image URL) *
              </label>
              <input
                type="url"
                name="bookImage"
                value={settings.bookImage}
                onChange={handleSettingsChange}
                placeholder="https://... (अपनी वास्तविक पुस्तक की छवि का लिंक यहाँ पेस्ट करें)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                भविष्य में जब आपके पास असली पुस्तक की फोटो हो, तो सीधे उसका लिंक यहाँ बदल सकते हैं।
              </p>
            </div>

            {/* Image Preview */}
            {settings.bookImage && (
              <div className="flex items-center gap-4 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <img
                  src={settings.bookImage}
                  alt="Preview"
                  className="w-20 h-24 object-cover rounded-xl shadow-sm border border-stone-300"
                />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-stone-700">वर्तमान पुस्तक छवि पूर्वावलोकन (Preview):</span>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{settings.bookImage}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  कुल पृष्ठ संख्या (Total Pages)
                </label>
                <input
                  type="number"
                  name="bookPages"
                  value={settings.bookPages}
                  onChange={handleSettingsChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="bookDeliveryAvailable"
                  name="bookDeliveryAvailable"
                  checked={settings.bookDeliveryAvailable}
                  onChange={handleSettingsChange}
                  className="w-4 h-4 text-saffron-600 rounded focus:ring-saffron-500"
                />
                <label htmlFor="bookDeliveryAvailable" className="text-xs font-semibold text-stone-700 cursor-pointer">
                  डाक द्वारा घर पर वितरण उपलब्ध है (Delivery Active)
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                पुस्तिका का विस्तृत आध्यात्मिक विवरण (Description)
              </label>
              <textarea
                rows={3}
                name="bookDescription"
                value={settings.bookDescription}
                onChange={handleSettingsChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingSettings}
                className="px-8 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? 'सहेजा जा रहा है...' : 'काउंटर व पुस्तक सेटिंग्स सहेजें'}</span>
              </button>
            </div>

          </div>

        </form>
      ) : (
        /* Requests Tab */
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-spiritual text-lg font-bold text-maroon-950">
              श्रद्धालुओं से प्राप्त पुस्तक वितरण अनुरोध ({requests.length})
            </h3>
          </div>

          {requests.length === 0 ? (
            <div className="text-center py-16 p-8">
              <p className="text-stone-500 text-sm">वर्तमान में कोई पुस्तिका अनुरोध उपलब्ध नहीं है।</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                    <th className="p-4">नाम व संपर्क</th>
                    <th className="p-4">पूरा डाक पता</th>
                    <th className="p-4">शहर, राज्य, पिन</th>
                    <th className="p-4">प्रतियां</th>
                    <th className="p-4">स्थिति</th>
                    <th className="p-4 text-right">कार्य</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {requests.map((req) => (
                    <tr key={req._id} className="hover:bg-stone-50/80">
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-bold text-stone-900">{req.name}</div>
                        <div className="text-[11px] text-stone-600 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-saffron-600" />
                          <a href={`tel:${req.phone}`} className="hover:underline">{req.phone}</a>
                        </div>
                        {req.email && (
                          <div className="text-[10px] text-stone-400">{req.email}</div>
                        )}
                      </td>
                      <td className="p-4 text-stone-700 max-w-xs whitespace-pre-line leading-relaxed">
                        {req.address}
                      </td>
                      <td className="p-4 whitespace-nowrap text-stone-600">
                        <div className="font-medium text-stone-800">{req.city}, {req.state}</div>
                        <div className="font-mono text-[11px] text-stone-500">पिन: {req.pincode}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap font-bold text-maroon-900">
                        {req.copies} प्रति
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req._id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-saffron-500 bg-stone-50"
                        >
                          <option value="pending">लंबित (Pending)</option>
                          <option value="dispatched">डाक से भेजी गई (Dispatched)</option>
                          <option value="delivered">पहुंच गई (Delivered)</option>
                          <option value="cancelled">रद्द (Cancelled)</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteRequest(req._id)}
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
          )}
        </div>
      )}

    </div>
  );
};

export default ManageRadhaNaam;
