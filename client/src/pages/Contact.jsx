import React, { useState, useEffect } from 'react';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { MapPin, Phone, Mail, Send, CheckCircle2, Sparkles, Clock, MessageSquare } from 'lucide-react';
import API from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [settings, setSettings] = useState({
    sansthaName: 'श्री राधा कृपा मंडल संस्था',
    phonePrimary: '+91 98765 43210',
    phoneSecondary: '+91 91234 56789',
    email: 'info@radhakripamandal.org',
    address: 'श्री राधा कृपा आश्रम, परिक्रमा मार्ग, श्री वृन्दावन धाम, मथुरा, उत्तर प्रदेश - 281121'
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/settings');
        if (res.data.success && res.data.setting) {
          setSettings(res.data.setting);
        }
      } catch (e) {}
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await API.post('/contact', formData);
      if (res.data.success) {
        setSuccessMsg(res.data.message);
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'संदेश भेजने में त्रुटि आई, कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title="संपर्क करें (Contact Us)"
        subtitle="श्री धाम वृन्दावन में संस्था कार्यालय अथवा किसी भी सेवा सहयोग हेतु हमसे संपर्क करें"
        breadcrumb="गृह / संपर्क"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-saffron-100 text-saffron-700 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-spiritual text-base font-bold text-maroon-950">आश्रम व कार्यालय का पता</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{settings.address}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-100 text-gold-700 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-spiritual text-base font-bold text-maroon-950">हेल्पलाइन व संपर्क सूत्र</h4>
              <p className="text-xs text-stone-600">{settings.phonePrimary}</p>
              {settings.phoneSecondary && (
                <p className="text-xs text-stone-600">{settings.phoneSecondary}</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-maroon-100 text-maroon-800 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-spiritual text-base font-bold text-maroon-950">ईमेल संपर्क</h4>
              <p className="text-xs text-stone-600">{settings.email}</p>
              <p className="text-[11px] text-stone-400">24 से 48 घंटे में प्रत्युत्तर</p>
            </div>
          </div>

        </div>

        {/* Contact Form + Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Form */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl shadow-lg border border-stone-200 space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-700 uppercase">
                <MessageSquare className="w-4 h-4 text-saffron-600" />
                <span>संदेश भेजें</span>
              </div>
              <h3 className="text-2xl font-bold font-spiritual text-maroon-950">
                संस्था से सीधा संवाद करें
              </h3>
              <p className="text-xs text-stone-500">
                कथा, संकीर्तन, गौ सेवा, अन्नदान अथवा किसी भी जिज्ञासा हेतु संदेश लिखें
              </p>
            </div>

            {successMsg ? (
              <div className="text-center py-10 space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-spiritual text-maroon-950 font-bold">राधे-राधे! संदेश प्राप्त हुआ</h4>
                <p className="text-stone-700 text-xs sm:text-sm">{successMsg}</p>
                <button
                  onClick={() => setSuccessMsg('')}
                  className="px-5 py-2 bg-saffron-600 text-white rounded-xl text-xs font-semibold"
                >
                  नया संदेश लिखें
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                {errorMsg && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      आपका पूरा नाम *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="उदा. रमेश कुमार"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      मोबाइल नंबर *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="उदा. 98XXXXXXXX"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      ईमेल पता (वैकल्पिक)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="उदा. ramesh@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      विषय (Subject) *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="उदा. भागवत कथा / गौ सेवा सहयोग"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    आपका संदेश *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="कृपया अपना संदेश यहाँ विस्तार से लिखें..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  {loading ? 'संदेश भेजा जा रहा है...' : (
                    <>
                      <span>संदेश भेजें (Send Message)</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map + Ashram Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Google Maps Embed */}
            <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-stone-200 h-80 bg-stone-100 relative">
              <iframe
                title="Radha Kripa Mandal Vrindavan Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14163.687440381665!2d77.68962657731776!3d27.58123846665798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736ce47bff6489%3A0xb35a39cb22204aa7!2sVrindavan%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Visit timings card */}
            <div className="bg-gradient-to-br from-maroon-950 to-maroon-900 text-white p-6 rounded-3xl border border-gold-500/40 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-gold-300 font-bold text-sm">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>दर्शन एवं आश्रम कार्यालय समय:</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-cream-200">
                <div className="bg-white/5 p-2.5 rounded-xl border border-gold-500/20">
                  <span className="text-gold-400 font-semibold block">प्रातः काल:</span>
                  <span>07:00 AM – 12:30 PM</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-gold-500/20">
                  <span className="text-gold-400 font-semibold block">सायं काल:</span>
                  <span>04:00 PM – 08:30 PM</span>
                </div>
              </div>
              <p className="text-[11px] text-cream-200/70 pt-1">
                विशेष पर्व एवं उत्सवों पर आश्रम 24 घंटे भक्तों की सेवा हेतु खुला रहता है।
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
