import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import API from '../../services/api';
import Loader from '../../components/common/Loader';

const ManageSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [pwFeedback, setPwFeedback] = useState('');
  const [pwError, setPwError] = useState('');

  const [settings, setSettings] = useState({
    sansthaName: 'श्री राधा कृपा मंडल संस्था',
    tagline: 'सेवा • संस्कार • साधना • समाज कल्याण',
    phonePrimary: '+91 98765 43210',
    phoneSecondary: '+91 91234 56789',
    email: 'info@radhakripamandal.org',
    address: 'श्री राधा कृपा आश्रम, परिक्रमा मार्ग, श्री वृन्दावन धाम, मथुरा, उत्तर प्रदेश - 281121',
    announcementText: '🌸 आगामी दिव्य आयोजन: 7 दिवसीय श्रीमद्भागवत सप्ताह ज्ञान यज्ञ - वृन्दावन धाम में आगामी 15 मार्च से।',
    bankName: 'State Bank of India (भारतीय स्टेट बैंक)',
    accountName: 'Shri Radha Kripa Mandal Sanstha',
    accountNumber: '40982341908234',
    ifscCode: 'SBIN0001234',
    branch: 'Vrindavan Dham Branch, Mathura',
    upiId: 'radhakripa@sbi',
    qrCodeUrl: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await API.get('/settings');
      if (res.data.success && res.data.setting) {
        setSettings(res.data.setting);
      }
    } catch (err) {
      console.error('Fetch settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await API.put('/settings', settings);
      if (res.data.success) {
        setFeedback('संस्था विवरण एवं दान सेटिंग्स सफलतापूर्वक सहेजी गईं!');
        setTimeout(() => setFeedback(''), 4000);
      }
    } catch (err) {
      alert('सेटिंग्स सहेजने में त्रुटि आई');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwFeedback('');
    setPwError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPwError('नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते');
      return;
    }

    try {
      const res = await API.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      if (res.data.success) {
        setPwFeedback(res.data.message);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setPwFeedback(''), 4000);
      }
    } catch (err) {
      setPwError(err.response?.data?.message || 'पासवर्ड बदलने में त्रुटि आई');
    }
  };

  if (loading) {
    return <Loader message="सेटिंग्स लोड हो रही हैं..." />;
  }

  return (
    <div className="space-y-8 font-hindi pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
        <h1 className="font-spiritual text-2xl font-bold text-maroon-950">
          संस्था विवरण एवं दान सेटिंग्स (Sanstha Settings & Donation)
        </h1>
        <p className="text-xs text-stone-500">
          वेबसाइट पर प्रदर्शित होने वाली संपर्क जानकारी, घोषणा पट्टी एवं बैंक/UPI विवरण अपडेट करें
        </p>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* Section 1: General Sanstha Info */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <h3 className="font-spiritual text-lg font-bold text-maroon-950 border-b border-stone-100 pb-3 flex items-center gap-2">
            <span>🪷</span> सामान्य संस्था जानकारी
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                संस्था का नाम
              </label>
              <input
                type="text"
                name="sansthaName"
                value={settings.sansthaName}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ध्येय वाक्य (Tagline)
              </label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                प्राथमिक फोन नंबर (Helpline)
              </label>
              <input
                type="text"
                name="phonePrimary"
                value={settings.phonePrimary}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                द्वितीयक फोन नंबर (वैकल्पिक)
              </label>
              <input
                type="text"
                name="phoneSecondary"
                value={settings.phoneSecondary}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                संस्था ईमेल पता
              </label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              आश्रम एवं कार्यालय का पूर्ण पता
            </label>
            <input
              type="text"
              name="address"
              value={settings.address}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              वेबसाइट घोषणा पट्टी संदेश (Announcement Bar)
            </label>
            <input
              type="text"
              name="announcementText"
              value={settings.announcementText}
              onChange={handleChange}
              placeholder="उदा. आगामी श्रीमद्भागवत कथा 15 मार्च से..."
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Section 2: Donation & Bank Info */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
          <h3 className="font-spiritual text-lg font-bold text-maroon-950 border-b border-stone-100 pb-3 flex items-center gap-2">
            <span>🏦</span> दान एवं बैंक खाता विवरण (Donation Details)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                बैंक का नाम
              </label>
              <input
                type="text"
                name="bankName"
                value={settings.bankName}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                खाता धारक का नाम (Account Name)
              </label>
              <input
                type="text"
                name="accountName"
                value={settings.accountName}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                खाता संख्या (A/C Number)
              </label>
              <input
                type="text"
                name="accountNumber"
                value={settings.accountNumber}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                IFSC कोड
              </label>
              <input
                type="text"
                name="ifscCode"
                value={settings.ifscCode}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                शाखा (Branch)
              </label>
              <input
                type="text"
                name="branch"
                value={settings.branch}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                UPI ID (PhonePe / GPay / Paytm)
              </label>
              <input
                type="text"
                name="upiId"
                value={settings.upiId}
                onChange={handleChange}
                placeholder="radhakripa@sbi"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                कस्टम QR कोड इमेज URL (वैकल्पिक)
              </label>
              <input
                type="url"
                name="qrCodeUrl"
                value={settings.qrCodeUrl}
                onChange={handleChange}
                placeholder="खाली छोड़ने पर UPI ID से स्वतः QR जनरेट होगा"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'सहेजा जा रहा है...' : 'सभी सेटिंग्स सहेजें (Save All Settings)'}</span>
            </button>
          </div>
        </div>

      </form>

      {/* Section 3: Change Password */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-200 space-y-6">
        <h3 className="font-spiritual text-lg font-bold text-maroon-950 border-b border-stone-100 pb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-saffron-600" />
          <span>व्यवस्थापक पासवर्ड बदलें (Change Password)</span>
        </h3>

        {pwFeedback && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold">
            {pwFeedback}
          </div>
        )}

        {pwError && (
          <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs font-semibold">
            {pwError}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              वर्तमान पासवर्ड *
            </label>
            <input
              type="password"
              required
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              नया पासवर्ड * (कम से कम 6 अक्षर)
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              नए पासवर्ड की पुष्टि करें *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-maroon-900 hover:bg-maroon-950 text-gold-300 rounded-xl text-xs font-bold transition shadow"
          >
            पासवर्ड अपडेट करें
          </button>
        </form>
      </div>

    </div>
  );
};

export default ManageSettings;
