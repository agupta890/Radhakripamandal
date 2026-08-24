import React, { useState } from 'react';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { Heart, BookOpen, Users, Shield, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import VolunteerModal from '../components/forms/VolunteerModal';
import { Link } from 'react-router-dom';

const SERVICES_DATA = [
  {
    id: 'samaj-seva',
    title: 'समाज सेवा एवं दीन-दुखी सहायता',
    subtitle: 'Social Welfare & Humanitarian Aid',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
    description: 'श्री राधा कृपा मंडल संस्था द्वारा समाज के वंचित, असहाय एवं निर्धन बंधुओं के लिए निरंतर कल्याणकारी सेवाएं संचालित की जाती हैं।',
    items: [
      'नित्य अन्नक्षेत्र सेवा: तीर्थयात्रियों, साधु-संतों एवं असहाय बंधुओं को निःशुल्क सात्विक महाप्रसाद।',
      'वस्त्र एवं कम्बल वितरण: शीत ऋतु में निराश्रितों एवं ग्रामीण अंचलों में ऊनी कम्बल तथा वस्त्र वितरण।',
      'आपदा राहत सहयोग: प्राकृतिक आपदाओं के समय पीड़ितों तक तत्काल खाद्य सामग्री एवं प्राथमिक सहायता।'
    ]
  },
  {
    id: 'gau-seva',
    title: 'गौ सेवा एवं गौशाला संरक्षण',
    subtitle: 'Cow Protection & Gaushala Welfare',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80',
    description: 'सनातन संस्कृति में गौ माता को पूजनीय माना गया है। संस्था 500 से अधिक निराश्रित, अंधी एवं वृद्ध गायों की सेवा हेतु समर्पित गौशाला का संचालन करती है।',
    items: [
      'प्रतिदिन पौष्टिक हरा चारा, दलिया, गुड़ एवं लापसी सेवा।',
      '24 घंटे पशु चिकित्सक परामर्श, निःशुल्क औषधियां एवं घायल गोवंशों की मरहम-पट्टी।',
      'सड़क पर निराश्रित घूम रहे बीमार व दुर्घटनाग्रस्त गोवंशों को आश्रय एवं पुनर्वास।'
    ]
  },
  {
    id: 'shiksha-sanskar',
    title: 'शिक्षा एवं बाल संस्कार अभियान',
    subtitle: 'Value-Based Education & Youth Camps',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    description: 'आधुनिक युग में बच्चों को नैतिक मूल्यों, मातृ-पितृ भक्ति, भारतीय संस्कृति और आध्यात्मिक ज्ञान से जोड़ना अत्यंत आवश्यक है।',
    items: [
      'श्रीमद्भगवद्गीता के पावन श्लोकों का शुद्ध उच्चारण एवं अर्थ की शिक्षा।',
      'ग्रीष्मकालीन बाल संस्कार शिविरों में योग, प्राणायाम, ध्यान एवं सदाचार का प्रशिक्षण।',
      'निर्धन एवं मेधावी बालकों को निःशुल्क पाठ्य सामग्री, कॉपियां एवं स्कूल बैग वितरण।'
    ]
  },
  {
    id: 'swasthya-seva',
    title: 'स्वास्थ्य सेवा एवं चिकित्सा शिविर',
    subtitle: 'Free Healthcare & Eye Checkup Camps',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    description: 'ग्रामीण एवं निर्धन बस्तियों के उन लोगों तक चिकित्सा सेवाएं पहुंचाना जो आर्थिक अभाव के कारण उपचार कराने में असमर्थ हैं।',
    items: [
      'नेत्र परीक्षण शिविर: मोतियाबिंद की निःशुल्क जांच, ऑपरेशन सहायता एवं चश्मा वितरण।',
      'सामान्य स्वास्थ्य जांच, मधुमेह (शुगर) एवं रक्तचाप (बीपी) परीक्षण शिविर।',
      'आयुर्वेदिक एवं प्राकृतिक चिकित्सा परामर्श व निःशुल्क आयुर्वेदिक औषधि वितरण।'
    ]
  }
];

const Services = () => {
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title="हमारे सेवा कार्य (Our Services)"
        subtitle="मानव सेवा, गौ सेवा, संस्कार निर्माण एवं समाज कल्याण के पावन प्रकल्प"
        breadcrumb="गृह / सेवा कार्य"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-saffron-700 bg-saffron-100 px-3 py-1 rounded-full">
            निःस्वार्थ सेवा संकल्प
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-spiritual text-maroon-950">
            प्रत्येक जीव में <span className="text-saffron-gradient">ईश्वर का रूप देखकर सेवा</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            श्री राधा कृपा मंडल संस्था द्वारा संचालित समस्त सेवा कार्य पूर्णतः भक्तों एवं दानदाताओं के सहयोग से संचालित होते हैं।
          </p>
        </div>

        {/* Detailed Service Blocks */}
        <div className="space-y-16">
          {SERVICES_DATA.map((srv, idx) => {
            const Icon = srv.icon;
            const isEven = idx % 2 === 0;
            return (
              <div
                key={srv.id}
                id={srv.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-6 sm:p-10 rounded-3xl shadow-md border border-stone-200 hover:border-gold-400/50 transition duration-300 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg h-80 sm:h-96">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-maroon-900/90 text-gold-300 flex items-center justify-center backdrop-blur-sm border border-gold-500/30">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? '' : 'lg:order-1'}`}>
                  <span className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                    {srv.subtitle}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-bold font-spiritual text-maroon-950">
                    {srv.title}
                  </h3>

                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {srv.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-saffron-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <button
                      onClick={() => setIsVolunteerOpen(true)}
                      className="px-5 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow transition flex items-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>इस सेवा से जुड़ें</span>
                    </button>

                    <Link
                      to="/donate"
                      className="px-5 py-2.5 bg-maroon-900 hover:bg-maroon-950 text-gold-300 rounded-xl text-xs sm:text-sm font-semibold shadow transition flex items-center gap-2"
                    >
                      <span>सहयोग / दान करें</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />
    </div>
  );
};

export default Services;
