import React, { useState } from 'react';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { Heart, Sparkles, Target, Compass, Award, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import VolunteerModal from '../components/forms/VolunteerModal';

const About = () => {
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title="हमारे बारे में (About Us)"
        subtitle="श्री राधा कृपा मंडल संस्था — सेवा, संस्कार, साधना और सनातन धर्म की रक्षा के लिए समर्पित"
        breadcrumb="गृह / संस्था परिचय"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* Section 1: Intro & Inspiration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>संस्था की स्थापना एवं परिचय</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-spiritual text-maroon-950 leading-snug md:leading-normal py-1">
              श्री धाम वृन्दावन की पावन रज से प्रेरित <span className="text-saffron-gradient">एक दिव्य संकल्प</span>
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              <strong>श्री राधा कृपा मंडल संस्था</strong> की स्थापना पूज्य संतों एवं समाजसेवियों के आशीर्वाद से श्री धाम वृन्दावन में हुई। संस्था का मूल उद्देश्य भगवान श्री कृष्ण की आल्हादिनी शक्ति <strong>श्री राधा रानी</strong> के करुणा-भाव को आत्मसात करते हुए समाज के पीड़ित, उपेक्षित एवं निराश्रित जीवों की निःस्वार्थ सेवा करना है।
            </p>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              हमारा विश्वास है कि "नर सेवा ही नारायण सेवा है"। केवल मंदिर में पूजा-अर्चना तक सीमित न रहकर, समाज के प्रत्येक वर्ग में सनातन धर्म के संस्कारों, मानवीय मूल्यों और परोपकार की भावना को जाग्रत करना ही हमारी संस्था का पावन ध्येय है।
            </p>

            <div className="p-4 rounded-xl bg-saffron-50/80 border-l-4 border-saffron-600 text-maroon-950 italic text-sm">
              "जीव मात्र पर दया करना और निष्काम भाव से की गई सेवा ही ईश्वर की सच्ची आराधना है।"
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1000&q=80"
                alt="श्री राधा कृपा मंडल आश्रम"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <h4 className="font-spiritual text-lg font-bold text-gold-300">श्री राधा कृपा मंडल सत्संग प्रांगण</h4>
                  <p className="text-xs text-cream-100">परिक्रमा मार्ग, श्री वृन्दावन धाम (मथुरा)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Mission, Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-md border border-stone-200 hover:border-gold-400 transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-saffron-100 text-saffron-700 flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-spiritual text-maroon-950">हमारा उद्देश्य (Our Mission)</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                समाज में आध्यात्मिक जागरूकता फैलाना, निराश्रित गोवंश की रक्षा करना, निर्धनों को नित्य भोजन उपलब्ध कराना और नई पीढ़ी को भारतीय सनातन संस्कृति के संस्कारों से समृद्ध करना।
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-stone-200 hover:border-gold-400 transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-100 text-gold-700 flex items-center justify-center">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-spiritual text-maroon-950">हमारा दृष्टिकोण (Our Vision)</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                एक ऐसे समरस, करुणामय और संस्कारवान समाज का निर्माण करना जहां कोई भी प्राणी भूख, बीमारी अथवा अज्ञानता के कारण उपेक्षित न रहे और सनातन धर्म की ध्वजा सदैव उच्च रहे।
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md border border-stone-200 hover:border-gold-400 transition flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-maroon-100 text-maroon-800 flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-spiritual text-maroon-950">हमारी प्रेरणा (Inspiration)</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                वृन्दावन के रसिकाचार्य, पूज्यपाद गौड़ीय एवं निम्बार्क सम्प्रदाय के संत, और श्रीमद्भगवद्गीता के उपदेश ही हमारी प्रत्येक सेवा गतिविधि के मार्गदर्शक एवं प्रेरणा स्रोत हैं।
              </p>
            </div>
          </div>

        </div>

        {/* Section 3: Founder & Leadership Section */}
        <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-gold-500/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-4 text-center">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gold-400 shadow-xl bg-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80"
                  alt="संस्थापक / मार्गदर्शक"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-spiritual text-xl font-bold text-gold-300 mt-4">
                पूज्य स्वामी जी / प्रेरणा स्रोत
              </h4>
              <p className="text-xs text-cream-200">संस्थापक एवं मुख्य संरक्षक</p>
            </div>

            <div className="lg:col-span-8 space-y-4 font-hindi">
              <span className="text-gold-400 text-xs font-bold uppercase tracking-wider">
                संस्थापक संदेश (Founder's Message)
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-spiritual text-white">
                "भक्ति का फल सेवा है और सेवा का फल आत्म-शांति है"
              </h3>
              <p className="text-cream-100 text-sm sm:text-base leading-relaxed font-light">
                "प्रिय भक्तजनों, मनुष्य जीवन भगवान का सबसे अनमोल वरदान है। यह जीवन केवल व्यक्तिगत सुख-सुविधाओं के उपभोग के लिए नहीं, अपितु दूसरों के आंसुओं को पोंछने और असहायों की सेवा के लिए मिला है। जब आप किसी भूखे को अन्न खिलाते हैं अथवा किसी बीमार गाय की सेवा करते हैं, तो साक्षात भगवान श्री राधा-माधव प्रसन्न होते हैं। आप सभी इस पुण्य महायज्ञ में सहभागी बनें।"
              </p>
              
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsVolunteerOpen(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow transition flex items-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>सेवा से जुड़ें (Join as Volunteer)</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Section 4: Our Journey & Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-maroon-950">
              हमारी यात्रा एवं कार्यप्रणाली (Our Journey)
            </h2>
            <p className="text-stone-600 text-sm">
              एक छोटे से संकीर्तन मंडल से प्रारम्भ होकर आज एक व्यापक सामाजिक व आध्यात्मिक न्यास तक
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { year: 'वर्ष 2015', title: 'संकीर्तन मंडल का आरम्भ', desc: 'वृन्दावन परिक्रमा मार्ग में नित्य हरिनाम संकीर्तन एवं अन्न वितरण से शुरुआत।' },
              { year: 'वर्ष 2018', title: 'गौ सेवा प्रकल्प', desc: 'निराश्रित गोवंशों के लिए प्रथम गौशाला की स्थापना एवं निःशुल्क चिकित्सा सेवा।' },
              { year: 'वर्ष 2021', title: 'बाल संस्कार अभियान', desc: 'गाँवों और नगरों में बच्चों के लिए नैतिक व गीता ज्ञान कक्षाओं का संचालन।' },
              { year: 'वर्ष 2026', title: 'विस्तार एवं डिजिटल सेवा', desc: 'राष्ट्रव्यापी भक्तों को जोड़ने हेतु ऑनलाइन सत्संग, सहयोग एवं पारदर्शिता।' },
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm relative">
                <span className="text-xs font-bold text-saffron-700 bg-saffron-50 px-2.5 py-1 rounded-md mb-3 inline-block">
                  {step.year}
                </span>
                <h4 className="font-spiritual text-lg font-bold text-maroon-950 mb-2">{step.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />
    </div>
  );
};

export default About;
