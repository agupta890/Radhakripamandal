import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Heart, Shield, Sparkles } from 'lucide-react';

const AboutPreview = () => {
  return (
    <section className="py-16 md:py-24 bg-cream-50 relative overflow-hidden font-hindi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-saffron-500 to-gold-400 rounded-3xl opacity-20 transform -rotate-2"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80"
                  alt="श्री राधा कृपा मंडल सत्संग एवं सेवा"
                  className="w-full h-96 object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-maroon-950/90 backdrop-blur-md p-4 rounded-xl border border-gold-500/40 text-cream-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-saffron-600 flex items-center justify-center text-xl shrink-0">
                    🪷
                  </div>
                  <div>
                    <h4 className="font-spiritual text-gold-300 text-sm font-bold">सेवा परमो धर्मः</h4>
                    <p className="text-[11px] text-cream-200">निष्काम भाव से मानव एवं गौ सेवा ही सच्ची साधना</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>संस्था का संक्षिप्त परिचय</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-spiritual text-maroon-950 leading-snug md:leading-normal py-1">
              समर्पण, सेवा और सनातन संस्कृति के संरक्षण हेतु <span className="text-saffron-gradient">निरंतर प्रयासरत</span>
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              <strong>श्री राधा कृपा मंडल संस्था</strong> एक सामाजिक एवं आध्यात्मिक संस्था है जिसका मुख्य उद्देश्य समाज में सेवा, संस्कार, भक्ति और मानव कल्याण की भावना को बढ़ावा देना है। वृन्दावन धाम के रसमय संतों एवं आचार्यों के पावन आदर्शों से प्रेरित होकर यह संस्था दीन-दुखियों की सेवा, गौशाला संचालन, बाल संस्कार शालाएं एवं निःशुल्क चिकित्सा शिविरों का आयोजन करती है।
            </p>

            {/* Core Values / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                { title: 'आध्यात्मिक चेतना', desc: 'श्रीमद्भागवत कथा, संकीर्तन एवं सत्संग का नियमित आयोजन।' },
                { title: 'निःस्वार्थ गौ सेवा', desc: 'निराश्रित एवं वृद्ध गोवंशों के पोषण व स्वास्थ्य की पूर्ण व्यवस्था।' },
                { title: 'नित्य अन्नदान सेवा', desc: 'साधु-संतों, तीर्थयात्रियों एवं निर्धनों को शुद्ध सात्विक महाप्रसाद।' },
                { title: 'संस्कार एवं शिक्षा', desc: 'बच्चों को श्रीमद्भगवद्गीता एवं सनातन जीवन मूल्यों की शिक्षा।' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200/80 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-stone-600 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="px-6 py-3 bg-maroon-900 hover:bg-maroon-950 text-gold-300 hover:text-white rounded-xl font-semibold text-sm transition shadow-md flex items-center gap-2"
              >
                <span>और जानें (Read More)</span>
                <ArrowRight className="w-4 h-4 text-gold-400" />
              </Link>
              
              <Link
                to="/services"
                className="px-6 py-3 bg-white hover:bg-saffron-50 text-stone-800 hover:text-saffron-700 rounded-xl font-semibold text-sm border border-stone-300 transition"
              >
                <span>हमारे समस्त सेवा प्रकल्प देखें</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
