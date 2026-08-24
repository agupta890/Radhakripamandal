import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles, ArrowRight, Heart, Flame, ShieldCheck } from 'lucide-react';
import API from '../../services/api';

const RadhaNaamBanner = () => {
  const [baseCount, setBaseCount] = useState(54823100);
  const [incrementRate, setIncrementRate] = useState(2);
  const [liveCount, setLiveCount] = useState(54823100);
  const [bookDetails, setBookDetails] = useState({
    bookTitle: 'श्री राधा नाम लेखन महायज्ञ पुस्तिका',
    bookSubtitle: '1,08,000 पावन श्री राधा नाम हस्तलिखित संकल्प पुस्तिका',
    bookImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    bookDescription: 'श्रद्धालु भक्तों द्वारा प्रतिदिन भक्तिपूर्वक लाल व पीली स्याही से श्री राधा नाम लेखन का पावन महायज्ञ।'
  });

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
            bookDescription: s.bookDescription || 'श्रद्धालु भक्तों द्वारा प्रतिदिन भक्तिपूर्वक लाल व पीली स्याही से श्री राधा नाम लेखन का पावन महायज्ञ।'
          });
        }
      } catch (err) {
        console.error('Fetch settings error in RadhaNaamBanner:', err);
      }
    };

    fetchSettings();
  }, []);

  // Real-time ticking counter
  useEffect(() => {
    if (incrementRate <= 0) return;
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + incrementRate);
    }, 1000);
    return () => clearInterval(interval);
  }, [incrementRate]);

  // Format with Indian commas
  const formatIndianNumber = (num) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-maroon-950 via-[#3a0c19] to-maroon-950 text-white font-hindi relative overflow-hidden border-y-4 border-gold-500 shadow-2xl">
      
      {/* Sacred Geometric Background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-gold-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-saffron-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Live Ticking Counter & Info */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/50 text-gold-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Flame className="w-4 h-4 text-saffron-400 animate-pulse" />
              <span>श्री राधा नाम संकीर्तन व लेखन महायज्ञ</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-spiritual text-white leading-snug md:leading-normal py-1">
              श्रद्धालुओं द्वारा अब तक लिखे गए <br />
              <span className="text-gold-gradient">श्री राधा नाम की पावन संख्या</span>
            </h2>

            {/* Glowing Live Digital Counter */}
            <div className="bg-black/40 backdrop-blur-md p-5 sm:p-6 rounded-3xl border-2 border-gold-500/50 shadow-[0_0_30px_rgba(212,175,55,0.25)] space-y-3">
              <div className="flex items-center justify-between text-xs text-gold-300 font-semibold border-b border-gold-500/30 pb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-emerald-300 font-bold">LIVE महायज्ञ काउंटर (निरंतर गतिशील)</span>
                </span>
                <span className="text-[11px] text-cream-200/80">समस्त विश्व के श्रद्धालु</span>
              </div>

              {/* Digit Box */}
              <div className="flex items-center justify-center py-2">
                <div className="inline-block bg-gradient-to-b from-[#1a050b] to-[#2d0914] px-6 sm:px-8 py-3 rounded-2xl border border-gold-400/60 shadow-inner">
                  <span className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-mono tracking-widest text-gold-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
                    {formatIndianNumber(liveCount)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-cream-200/90 pt-1">
                <span className="flex items-center gap-1 text-gold-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>प्रति सेकंड नए नाम जुड़ रहे हैं</span>
                </span>
                <span className="text-stone-300 font-medium">लक्ष्य: 11 करोड़ श्री राधा नाम</span>
              </div>
            </div>

            <p className="text-cream-100 text-xs sm:text-sm leading-relaxed font-light">
              संस्था द्वारा भक्तों के लिए विशेष <strong>"श्री राधा नाम लेखन पुस्तिका"</strong> तैयार की गई है जिसमें 1,08,000 नाम लिखने का संकल्प लिया जाता है। आप भी इस दिव्य महायज्ञ का हिस्सा बनें।
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1 font-hindi">
              <Link
                to="/radha-naam-pustika"
                className="px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-950 font-bold rounded-2xl text-xs sm:text-sm shadow-xl hover:shadow-gold-500/30 transition flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-maroon-950" />
                <span>पुस्तिका प्राप्त करें व विस्तार से जानें</span>
                <ArrowRight className="w-4 h-4 text-maroon-950" />
              </Link>
            </div>

          </div>

          {/* Right Column: Book Mockup Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none group">
              
              {/* Outer Golden Aura Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold-400 via-saffron-500 to-maroon-600 rounded-3xl opacity-50 blur-xl group-hover:opacity-75 transition duration-500"></div>

              {/* Book Card */}
              <div className="relative bg-gradient-to-b from-[#2a0610] to-[#1a040a] rounded-3xl overflow-hidden border-2 border-gold-400 shadow-2xl p-6 space-y-4 text-center">
                
                {/* Book Cover Container */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-inner border border-gold-500/40 bg-stone-900 mx-auto">
                  <img
                    src={bookDetails.bookImage}
                    alt={bookDetails.bookTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow border border-gold-400">
                    पवित्र लेखन संकल्प
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-3 left-3 right-3 text-center text-white">
                    <span className="text-[10px] text-gold-300 font-semibold block uppercase">
                      श्री राधा कृपा मंडल न्यास
                    </span>
                    <h4 className="font-spiritual text-base font-bold text-cream-50 leading-tight">
                      {bookDetails.bookTitle}
                    </h4>
                  </div>
                </div>

                {/* Features Pill */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-cream-100">
                  <div className="bg-white/10 p-2 rounded-xl border border-gold-500/20">
                    <span className="text-gold-400 font-bold block">1,08,000</span>
                    <span>राधा नाम लेखन क्षमता</span>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl border border-gold-500/20">
                    <span className="text-gold-400 font-bold block">निःशुल्क / सेवा</span>
                    <span>घर बैठे डाक द्वारा प्राप्त करें</span>
                  </div>
                </div>

                <Link
                  to="/radha-naam-pustika"
                  className="block w-full py-2.5 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white font-semibold rounded-xl text-xs shadow transition"
                >
                  पुस्तिका हेतु घर का पता दर्ज करें →
                </Link>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default RadhaNaamBanner;
