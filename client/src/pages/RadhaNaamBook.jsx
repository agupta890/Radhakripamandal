import React, { useState, useEffect } from 'react';
import SpiritualHeader from '../components/common/SpiritualHeader';
import {
  BookOpen,
  Sparkles,
  Flame,
  CheckCircle2,
  Heart,
  Send,
  ShieldCheck,
  Award,
  PenTool,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import API from '../services/api';
import Loader from '../components/common/Loader';

const RadhaNaamBook = () => {
  const [baseCount, setBaseCount] = useState(54823100);
  const [incrementRate, setIncrementRate] = useState(2);
  const [liveCount, setLiveCount] = useState(54823100);
  
  const [bookDetails, setBookDetails] = useState({
    bookTitle: 'श्री राधा नाम लेखन महायज्ञ पुस्तिका',
    bookSubtitle: '1,08,000 पावन श्री राधा नाम हस्तलिखित संकल्प पुस्तिका',
    bookImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    bookDescription: 'यह केवल एक पुस्तिका नहीं, अपितु श्री राधा रानी की कृपा प्राप्ति का साक्षात साधन है। इसमें भक्तिपूर्वक प्रतिदिन लाल या पीली स्याही से श्री राधा नाम लिखें। पुस्तिका पूर्ण होने पर संस्था के श्री वृन्दावन आश्रम में सुरक्षित रखी जाएगी अथवा यमुना जी में विधिपूर्वक समर्पित की जाएगी।',
    bookPages: 108,
    bookDeliveryAvailable: true
  });

  // Interactive Online Japa / Chant State
  const [userJapaCount, setUserJapaCount] = useState(0);
  const [showPetalAnimation, setShowPetalAnimation] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    state: 'उत्तर प्रदेश',
    copies: 1,
    sankalpNaam: '1,08,000 श्री राधा नाम लेखन',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/settings');
        if (res.data.success && res.data.setting) {
          const s = res.data.setting;
          const count = s.radhaNaamCount || 54823100;
          const rate = s.naamAutoIncrementRate !== undefined ? s.naamAutoIncrementRate : 2;
          setBaseCount(count);
          setLiveCount(count);
          setIncrementRate(rate);
          setBookDetails({
            bookTitle: s.bookTitle || 'श्री राधा नाम लेखन महायज्ञ पुस्तिका',
            bookSubtitle: s.bookSubtitle || '1,08,000 पावन श्री राधा नाम हस्तलिखित संकल्प पुस्तिका',
            bookImage: s.bookImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
            bookDescription: s.bookDescription || 'यह केवल एक पुस्तिका नहीं, अपितु श्री राधा रानी की कृपा प्राप्ति का साक्षात साधन है।',
            bookPages: s.bookPages || 108,
            bookDeliveryAvailable: s.bookDeliveryAvailable !== undefined ? s.bookDeliveryAvailable : true
          });
        }
      } catch (err) {
        console.error('Fetch settings error:', err);
      }
    };

    fetchSettings();
  }, []);

  // Real-time ticking counter (increments every second automatically)
  useEffect(() => {
    if (incrementRate <= 0) return;
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + incrementRate);
    }, 1000);
    return () => clearInterval(interval);
  }, [incrementRate]);

  const handleUserChant = () => {
    setUserJapaCount((prev) => prev + 1);
    setLiveCount((prev) => prev + 1);
    setShowPetalAnimation(true);
    setTimeout(() => setShowPetalAnimation(false), 800);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await API.post('/book-requests', formData);
      if (res.data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          city: '',
          pincode: '',
          state: 'उत्तर प्रदेश',
          copies: 1,
          sankalpNaam: '1,08,000 श्री राधा नाम लेखन',
          notes: ''
        });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'अनुरोध भेजने में त्रुटि आई, कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  const formatIndianNumber = (num) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      
      {/* Top Banner */}
      <SpiritualHeader
        title="श्री राधा नाम लेखन महायज्ञ"
        subtitle="1,08,000 पावन श्री राधा नाम लेखन संकल्प पुस्तिका — भक्ति, साधना एवं भवसागर से उद्धार का सरलतम मार्ग"
        breadcrumb="गृह / श्री राधा नाम पुस्तिका"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* Section 1: Massive Glowing Live Counter */}
        <div className="bg-gradient-to-r from-maroon-950 via-[#360815] to-maroon-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-gold-500/50 text-center space-y-6 relative overflow-hidden">
          
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/50 text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-saffron-400 animate-pulse" />
            <span>विश्वव्यापी श्री राधा नाम लेखन महायज्ञ (LIVE)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-spiritual text-white">
            श्रद्धालुओं द्वारा अब तक लिखे गए <br />
            <span className="text-gold-gradient">श्री राधा नाम की पावन संख्या</span>
          </h2>

          {/* Glowing Digital Digits */}
          <div className="max-w-3xl mx-auto bg-black/50 p-6 sm:p-8 rounded-3xl border-2 border-gold-500/60 shadow-[0_0_40px_rgba(212,175,55,0.3)] space-y-3">
            <div className="flex items-center justify-between text-xs text-gold-300 border-b border-gold-500/30 pb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>वास्तविक समय (Real-Time Live Counter)</span>
              </span>
              <span className="text-[11px] text-cream-200">प्रति सेकंड बढ़ रहा है</span>
            </div>

            <div className="py-2">
              <span className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-mono text-gold-300 tracking-widest drop-shadow-[0_4px_15px_rgba(245,158,11,0.6)]">
                {formatIndianNumber(liveCount)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/90 pt-2 border-t border-gold-500/20 gap-2">
              <span>🌸 वर्तमान महायज्ञ लक्ष्य: <strong>11,00,00,000 (11 करोड़ श्री राधा नाम)</strong></span>
              <span className="text-gold-400 font-semibold">समस्त भक्तों के सहयोग से</span>
            </div>
          </div>

          {/* Interactive Virtual Radha Naam Chanting Widget */}
          <div className="bg-white/10 backdrop-blur-md max-w-xl mx-auto p-5 rounded-2xl border border-gold-400/40 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gold-300">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>अभी ऑनलाइन राधा नाम जपें व महायज्ञ में जोड़ें:</span>
            </div>

            <button
              onClick={handleUserChant}
              className="px-8 py-3.5 bg-gradient-to-r from-saffron-500 via-saffron-600 to-saffron-700 hover:from-saffron-600 hover:to-saffron-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 border border-gold-300/40 flex items-center justify-center gap-3 mx-auto"
            >
              <span>🪷 श्री राधा 🪷</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono">
                {userJapaCount > 0 ? `+${userJapaCount}` : 'क्लिक करें'}
              </span>
            </button>

            {showPetalAnimation && (
              <div className="text-xs text-gold-300 font-semibold animate-bounce">
                ✨ जय श्री राधे! आपका नाम महायज्ञ में समर्पित हुआ।
              </div>
            )}
          </div>

        </div>

        {/* Section 2: Book Showcase & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Book Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-tr from-saffron-500 to-gold-400 rounded-3xl opacity-30 blur-lg"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900">
                <img
                  src={bookDetails.bookImage}
                  alt={bookDetails.bookTitle}
                  className="w-full h-[450px] object-cover"
                />
                
                {/* Book Badge */}
                <div className="absolute top-4 left-4 bg-maroon-900/90 text-gold-300 text-xs font-bold px-3 py-1.5 rounded-full border border-gold-500/40 backdrop-blur-md">
                  1,08,000 नाम संकल्प
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-maroon-950/90 backdrop-blur-md p-4 rounded-2xl border border-gold-500/40 text-white text-center">
                  <h4 className="font-spiritual text-gold-300 text-base font-bold">
                    {bookDetails.bookTitle}
                  </h4>
                  <p className="text-xs text-cream-200 mt-0.5">
                    {bookDetails.bookSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase">
              <BookOpen className="w-3.5 h-3.5 text-saffron-600" />
              <span>पुस्तिका का परिचय एवं विशेषताएं</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-spiritual text-maroon-950 leading-snug md:leading-normal py-1">
              घर बैठे प्राप्त करें <span className="text-saffron-gradient">श्री राधा नाम लेखन पुस्तिका</span>
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {bookDetails.bookDescription}
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                { title: '1,08,000 नाम क्षमता', desc: 'व्यवस्थित 108 पृष्ठों में विशेष रेखांकित कॉलम नाम लेखन हेतु।' },
                { title: 'यमुना जल अभिमंत्रित', desc: 'श्री धाम वृन्दावन के पावन भाव व संतों के आशीर्वाद से मुद्रित।' },
                { title: 'संकल्प पत्र सहित', desc: 'पुस्तिका के प्रारम्भ में विधिपूर्वक नाम जप संकल्प पत्र संलग्न।' },
                { title: 'आश्रम में समर्पण', desc: 'पूर्ण होने पर वृन्दावन आश्रम में श्री राधा रानी के चरणों में समर्पण।' }
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{f.title}</h4>
                    <p className="text-[11px] text-stone-600 leading-normal">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#order-form"
                className="px-6 py-3.5 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition flex items-center gap-2"
              >
                <span>पुस्तिका प्राप्त करने हेतु फॉर्म भरें</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

        {/* Section 3: Spiritual Benefits / Mahatmya */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-md border border-stone-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-saffron-700 uppercase bg-saffron-50 px-3 py-1 rounded-full">
              शास्त्र सम्मत महिमा
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-spiritual text-maroon-950">
              श्री राधा नाम लेखन के अलौकिक लाभ (Mahatmya)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              वेदों, पुराणों एवं रसिक संतों के अनुसार नाम लेखन से त्रिविध तापों का शमन होता है
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'मन की एकाग्रता व शांति',
                desc: 'हाथ से नाम लिखने पर मन, वाणी और दृष्टि तीनों एक साथ श्री राधा रानी में लीन हो जाते हैं, जिससे मानसिक तनाव समाप्त होता है।'
              },
              {
                title: 'कोटि जन्मों के पापों का क्षय',
                desc: 'श्री राधा नाम के एक-एक अक्षर में समस्त पापों को भस्म करने की सामर्थ्य है। हस्तलिखित नाम अनंत काल तक पुण्य प्रदान करता है।'
              },
              {
                title: 'श्री राधा-माधव की नित्य कृपा',
                desc: 'जो भक्त नियमपूर्वक राधा नाम लिखता है, उसके घर में सुख, शांति, समृद्धि और भगवद्-भक्ति का स्थायी वास होता है।'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-cream-50 p-6 rounded-2xl border border-stone-200 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-saffron-600 text-white flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </div>
                <h4 className="font-spiritual text-base font-bold text-maroon-950">{item.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Rules & Guidelines (लेखन नियम) */}
        <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gold-500/40 space-y-6">
          <div className="flex items-center gap-3 border-b border-gold-500/30 pb-4">
            <PenTool className="w-6 h-6 text-gold-400" />
            <h3 className="font-spiritual text-xl sm:text-2xl font-bold text-gold-300">
              नाम लेखन विधि एवं नियम (Guidelines)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-cream-100 font-light">
            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-gold-500/20">
              <span className="font-bold text-gold-400 text-sm">१.</span>
              <span>स्नान आदि से पवित्र होकर, शांत मन से पूर्व या उत्तर दिशा की ओर मुख करके बैठें।</span>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-gold-500/20">
              <span className="font-bold text-gold-400 text-sm">२.</span>
              <span>नाम लेखन के लिए लाल (Red) अथवा पीली (Yellow) स्याही के पेन का प्रयोग करें।</span>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-gold-500/20">
              <span className="font-bold text-gold-400 text-sm">३.</span>
              <span>प्रत्येक बार लिखते समय मुख से 'राधा-राधा' का उच्चारण अथवा मन में स्मरण अवश्य करें।</span>
            </div>
            <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-xl border border-gold-500/20">
              <span className="font-bold text-gold-400 text-sm">४.</span>
              <span>पुस्तिका पूर्ण होने पर संस्था के श्री वृन्दावन आश्रम में डाक द्वारा भेजें अथवा स्वयं पधारकर समर्पित करें।</span>
            </div>
          </div>
        </div>

        {/* Section 5: Order / Request Book Form */}
        <div id="order-form" className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-stone-200 max-w-3xl mx-auto space-y-6">
          
          <div className="text-center space-y-2 border-b border-stone-200 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-700 uppercase">
              <BookOpen className="w-4 h-4 text-saffron-600" />
              <span>निःशुल्क / सेवा भेंट पुस्तिका अनुरोध</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-spiritual text-maroon-950">
              श्री राधा नाम लेखन पुस्तिका घर मंगवाएं
            </h3>
            <p className="text-xs text-stone-500">
              कृपया अपना सही व पूरा डाक पता दर्ज करें ताकि पुस्तिका शीघ्र आप तक पहुंचाई जा सके।
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-spiritual text-maroon-950 font-bold">जय श्री राधे! आपका अनुरोध प्राप्त हुआ</h4>
              <p className="text-stone-700 text-xs sm:text-sm max-w-md mx-auto">
                संस्था परिवार द्वारा श्री राधा नाम लेखन पुस्तिका शीघ्र ही आपके दिए गए पते पर डाक द्वारा प्रेषित कर दी जाएगी।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-saffron-600 text-white rounded-xl text-xs font-semibold"
              >
                नया अनुरोध दर्ज करें
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
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
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा. राधेश्याम गुप्ता"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    मोबाइल नंबर (व्हाट्सएप) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="उदा. 98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ईमेल पता (वैकल्पिक)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="उदा. radhe@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  पूरा डाक पता (मकान नं., गली, मोहल्ला, लैंडमार्क) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="कृपया पूरा पता लिखें ताकि डाकिया आसानी से पहुंचा सके..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    शहर / जिला *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="उदा. मथुरा / जयपुर"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    पिनकोड *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="उदा. 281001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    राज्य *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="उदा. उत्तर प्रदेश"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    पुस्तिका प्रतियों की संख्या (Copies) *
                  </label>
                  <select
                    value={formData.copies}
                    onChange={(e) => setFormData({ ...formData, copies: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  >
                    <option value={1}>1 पुस्तिका (1 प्रति)</option>
                    <option value={2}>2 पुस्तिकाएं (सपरिवार)</option>
                    <option value={3}>3 पुस्तिकाएं</option>
                    <option value={5}>5 पुस्तिकाएं (भजन मंडल)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    संकल्प का प्रकार
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formData.sankalpNaam}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-stone-600 text-xs sm:text-sm font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  अतिरिक्त टिप्पणी / निर्देश
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="कोई विशेष निर्देश..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white font-bold rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {loading ? 'अनुरोध भेजा जा रहा है...' : (
                  <>
                    <span>पुस्तिका प्राप्ति हेतु अनुरोध सबमिट करें</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default RadhaNaamBook;
