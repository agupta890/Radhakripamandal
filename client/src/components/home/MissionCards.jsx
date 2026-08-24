import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Sun, Users, Shield, ArrowRight, Sparkles } from 'lucide-react';

const MISSIONS = [
  {
    icon: Sun,
    title: 'आध्यात्मिक जागरूकता',
    subtitle: 'Spiritual Awakening',
    desc: 'श्रीमद्भागवत कथा, अखण्ड संकीर्तन, सत्संग एवं तीर्थ यात्राओं के माध्यम से जनमानस में भक्ति, प्रेम और आत्मिक शांति का संचार करना।',
    color: 'from-amber-500 to-saffron-600',
    bgLight: 'bg-amber-50',
    link: '/events'
  },
  {
    icon: Heart,
    title: 'गौ सेवा एवं संरक्षण',
    subtitle: 'Cow Protection',
    desc: 'वृन्दावन धाम में 500+ असहाय एवं निराश्रित गोवंशों की नित्य सेवा, हरा चारा, गुड़-लापसी वितरण एवं 24/7 चिकित्सा सहायता उपलब्ध कराना।',
    color: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-emerald-50',
    link: '/services'
  },
  {
    icon: BookOpen,
    title: 'शिक्षा एवं बाल संस्कार',
    subtitle: 'Values & Education',
    desc: 'आगामी पीढ़ी में वैदिक संस्कृति, श्रीमद्भगवद्गीता के श्लोक, योग, मातृ-पितृ भक्ति एवं अनुशासन के संस्कारों का रोपण करना।',
    color: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50',
    link: '/services'
  },
  {
    icon: Users,
    title: 'अन्नदान व भोजन सेवा',
    subtitle: 'Food Relief & Prasadam',
    desc: 'वृन्दावन परिक्रमा मार्ग एवं निर्धन बस्तियों में प्रतिदिन साधु-संतों, तीर्थयात्रियों एवं असहाय बंधुओं को शुद्ध सात्विक महाप्रसाद वितरण।',
    color: 'from-saffron-600 to-maroon-700',
    bgLight: 'bg-saffron-50',
    link: '/services'
  },
  {
    icon: Shield,
    title: 'चिकित्सा व जरूरतमंद सहायता',
    subtitle: 'Healthcare & Aid',
    desc: 'निःशुल्क नेत्र जांच शिविर, मोतियाबिंद ऑपरेशन सहायता, दवा वितरण एवं शीतकाल में कम्बल तथा वस्त्र वितरण सेवा।',
    color: 'from-rose-600 to-maroon-800',
    bgLight: 'bg-rose-50',
    link: '/services'
  }
];

const MissionCards = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-cream-100/60 to-cream-50 font-hindi border-y border-stone-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>हमारा पावन संकल्प</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-spiritual text-maroon-950">
            संस्था के <span className="text-saffron-gradient">प्रमुख सेवा स्तम्भ</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            भगवान श्री कृष्ण और श्री राधा रानी के पावन चरणों में समर्पित हमारे प्रमुख सेवा प्रकल्प, जो समाज के सर्वांगीण उत्थान के लिए कार्यरत हैं।
          </p>
          <div className="w-20 h-1 bg-gold-400 mx-auto rounded-full mt-2"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {MISSIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-7 shadow-md hover:shadow-2xl border border-stone-200/80 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle top decorative accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.color}`}></div>

                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-saffron-700 font-bold block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="text-xl font-bold font-spiritual text-maroon-950 mb-3 group-hover:text-saffron-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-xs font-bold text-maroon-900 group-hover:text-saffron-600 transition-colors pt-2 border-t border-stone-100"
                >
                  <span>विस्तार से जानें</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}

          {/* 6th Card: Join / Donate CTA */}
          <div className="bg-gradient-to-br from-maroon-950 via-maroon-900 to-maroon-950 rounded-2xl p-7 text-white shadow-xl border border-gold-500/40 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl">🪷</div>
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gold-500/20 border border-gold-400/40 text-gold-300 flex items-center justify-center shadow-md mb-6">
                <Sparkles className="w-7 h-7 text-gold-400" />
              </div>

              <span className="text-[11px] uppercase tracking-wider text-gold-400 font-bold block mb-1">
                Your Contribution
              </span>

              <h3 className="text-xl font-bold font-spiritual text-white mb-3">
                आप भी बनें इस पुण्य कार्य का भागीदार
              </h3>

              <p className="text-cream-200/90 text-sm leading-relaxed mb-6 font-light">
                आपका थोड़ा सा सहयोग किसी निराश्रित गाय को आहार, किसी निर्धन को भोजन और किसी बालक को श्रेष्ठ संस्कार दे सकता है।
              </p>
            </div>

            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-950 font-bold rounded-xl text-sm transition shadow-lg"
            >
              <span>सहयोग / दान करें</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MissionCards;
