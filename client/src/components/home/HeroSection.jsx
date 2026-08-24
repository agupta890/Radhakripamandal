import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles, Sun, ShieldCheck } from 'lucide-react';
import VolunteerModal from '../forms/VolunteerModal';

const HeroSection = () => {
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);

  return (
    <div className="relative min-h-[580px] md:min-h-[660px] flex items-center justify-center bg-gradient-to-b from-[#420d18] via-maroon-950 to-maroon-900 text-white overflow-hidden">
      
      {/* Background Spiritual Imagery with Atmospheric Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1920&q=80')`
        }}
      />

      {/* Decorative Golden Rays & Sacred Mandala Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0,transparent_70%)] pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-saffron-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gold-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8 z-10">
        
        {/* Top Divine Mantra Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/40 text-gold-300 text-xs md:text-sm font-semibold tracking-wider uppercase backdrop-blur-md animate-soft-pulse">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>॥ ॐ श्री राधायै नमः ॥</span>
          <Sparkles className="w-4 h-4 text-gold-400" />
        </div>

        {/* Main Heading */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-spiritual text-white tracking-normal leading-snug md:leading-normal py-1 drop-shadow-md">
            श्री राधा कृपा मंडल संस्था में आपका <span className="text-gold-gradient">हार्दिक स्वागत है</span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 text-gold-400 font-serif">
            <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gold-400"></span>
            <span className="text-xl">🪷</span>
            <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gold-400"></span>
          </div>

          <p className="text-lg sm:text-2xl text-cream-100 font-hindi font-medium tracking-normal">
            सेवा • संस्कार • साधना • समाज कल्याण
          </p>
          
          <p className="text-xs sm:text-base text-cream-200/85 max-w-2xl mx-auto font-hindi font-light leading-relaxed">
            वृन्दावन धाम की पावन प्रेरणा से जन-जन तक भक्ति, गौ सेवा, अन्नदान एवं नैतिक संस्कारों के प्रचार-प्रसार हेतु समर्पित एक सामाजिक एवं आध्यात्मिक न्यास।
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-hindi">
          <Link
            to="/about"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-saffron-600/30 transition-all duration-300 flex items-center gap-2 border border-saffron-400/30"
          >
            <span>हमारे बारे में जानें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setIsVolunteerOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-cream-100 font-semibold text-sm sm:text-base backdrop-blur-md border border-gold-400/40 hover:border-gold-400 text-white transition-all duration-300 flex items-center gap-2 shadow"
          >
            <Heart className="w-4 h-4 text-gold-400" />
            <span>सेवा से जुड़ें (Join Seva)</span>
          </button>

          <Link
            to="/donate"
            className="px-6 py-3.5 rounded-xl bg-gold-600/90 hover:bg-gold-600 text-maroon-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-gold-500/20 transition-all duration-300 flex items-center gap-2"
          >
            <span>सहयोग / दान करें</span>
          </Link>
        </div>

        {/* Key Highlights / Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-8 max-w-4xl mx-auto font-hindi border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gold-500/20">
            <span className="text-2xl sm:text-3xl font-bold text-gold-400 font-spiritual">500+</span>
            <p className="text-xs sm:text-sm text-cream-200 mt-1">गोवंश संरक्षण एवं सेवा</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gold-500/20">
            <span className="text-2xl sm:text-3xl font-bold text-gold-400 font-spiritual">10,000+</span>
            <p className="text-xs sm:text-sm text-cream-200 mt-1">मासिक अन्नक्षेत्र महाप्रसाद</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gold-500/20">
            <span className="text-2xl sm:text-3xl font-bold text-gold-400 font-spiritual">100+</span>
            <p className="text-xs sm:text-sm text-cream-200 mt-1">कथा एवं संकीर्तन महोत्सव</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gold-500/20">
            <span className="text-2xl sm:text-3xl font-bold text-gold-400 font-spiritual">1,500+</span>
            <p className="text-xs sm:text-sm text-cream-200 mt-1">संस्कारित बालक एवं युवा</p>
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

export default HeroSection;
