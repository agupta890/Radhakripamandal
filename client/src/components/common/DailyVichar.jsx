import React, { useState, useEffect } from 'react';
import { Sparkles, Quote } from 'lucide-react';

const VICHARS = [
  {
    quote: "श्री राधा नाम समस्त सिद्धियों और परम आनंद का मूल है। निष्काम भाव से की गई सेवा ही सच्ची भक्ति है।",
    source: "श्री वृन्दावन महिमामृत"
  },
  {
    quote: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। निष्काम कर्म ही जीवन को धन्य और कल्याणकारी बनाता है।",
    source: "श्रीमद्भगवद्गीता"
  },
  {
    quote: "गावो ममाग्रतो नित्यं गावः पृष्ठत एव च। गावो मे सर्वतश्चैव गवां मध्ये वसाम्यहम्॥ (गौ सेवा ही साक्षात नारायण सेवा है)",
    source: "पद्म पुराण"
  },
  {
    quote: "परहित सरिस धरम नहिं भाई, पर पीड़ा सम नहिं अधमाई। जीवों पर दया और सेवा ही परम धर्म है।",
    source: "श्री रामचरितमानस"
  }
];

const DailyVichar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % VICHARS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = VICHARS[index];

  return (
    <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-amber-100 py-3 px-4 border-y border-gold-500/30 relative overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-wider uppercase bg-maroon-800/80 px-3 py-1 rounded-full border border-gold-500/30 shrink-0">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>दैनिक अमृत वचन</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm font-medium font-hindi text-cream-100 italic transition-all duration-500 ease-in-out">
          <Quote className="w-4 h-4 text-gold-400 shrink-0 opacity-70 hidden sm:inline" />
          <span>"{current.quote}"</span>
          <span className="text-gold-400 text-xs not-italic font-normal shrink-0">— {current.source}</span>
        </div>
        <div className="flex gap-1 shrink-0">
          {VICHARS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index ? 'bg-gold-400 w-4' : 'bg-maroon-700 hover:bg-gold-500/50'
              }`}
              aria-label={`Vichar slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyVichar;
