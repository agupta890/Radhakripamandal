import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import API from '../../services/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    sansthaName: 'श्री राधा कृपा मंडल संस्था',
    tagline: 'सेवा • संस्कार • साधना • समाज कल्याण',
    phonePrimary: '+91 98765 43210',
    phoneSecondary: '+91 91234 56789',
    email: 'info@radhakripamandal.org',
    address: 'श्री राधा कृपा आश्रम, परिक्रमा मार्ग, श्री वृन्दावन धाम, मथुरा, उत्तर प्रदेश - 281121',
    bankName: 'State Bank of India (भारतीय स्टेट बैंक)',
    accountNumber: '40982341908234',
    ifscCode: 'SBIN0001234',
    upiId: 'radhakripa@sbi'
  });

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

  return (
    <footer className="bg-gradient-to-b from-maroon-950 via-[#2d0914] to-[#1a050b] text-stone-300 font-hindi pt-16 pb-8 border-t-4 border-gold-500 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gold-500/20">
          
          {/* Column 1: Organization Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-saffron-600 to-gold-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-maroon-950 rounded-full flex items-center justify-center text-2xl">
                  🪷
                </div>
              </div>
              <div>
                <h3 className="font-spiritual text-xl font-bold text-cream-50 leading-normal">
                  श्री राधा कृपा मंडल संस्था
                </h3>
                <p className="text-xs text-gold-400 font-semibold tracking-normal">
                  वृन्दावन धाम, मथुरा
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-cream-200/80 leading-relaxed font-light">
              श्री राधा कृपा मंडल संस्था एक सामाजिक एवं आध्यात्मिक संस्था है जिसका उद्देश्य समाज में सेवा, संस्कार, भक्ति, गौ संरक्षण और मानव कल्याण की भावना को बढ़ावा देना है।
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/10 text-gold-300 border border-gold-500/30">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>राधे-राधे जपो चले आएंगे बिहारी</span>
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-spiritual text-base font-bold text-gold-300 border-b border-gold-500/30 pb-2 inline-block">
              त्वरित लिंक (Quick Links)
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'होम (मुख्य पृष्ठ)', path: '/' },
                { name: 'श्री राधा नाम पुस्तिका', path: '/radha-naam-pustika' },
                { name: 'संस्था का परिचय', path: '/about' },
                { name: 'सेवा प्रकल्प (कार्य)', path: '/services' },
                { name: 'आगामी कार्यक्रम', path: '/events' },
                { name: 'चित्र वीथिका (Gallery)', path: '/gallery' },
                { name: 'दिव्य वीडियो एवं भजन', path: '/videos' },
                { name: 'समाचार एवं ब्लॉग', path: '/blogs' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-gold-300 transition-colors flex items-center gap-2 text-cream-200/90 text-xs md:text-sm"
                  >
                    <ArrowRight className="w-3 h-3 text-saffron-500 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Seva & Support Details */}
          <div className="space-y-4">
            <h4 className="font-spiritual text-base font-bold text-gold-300 border-b border-gold-500/30 pb-2 inline-block">
              सेवा एवं सहयोग (Donation)
            </h4>
            <p className="text-xs text-cream-200/80 leading-relaxed">
              आपके द्वारा दिया गया सहयोग गौ सेवा, अन्नदान एवं बच्चों के संस्कार शिविरों में उपयोग किया जाता है।
            </p>
            
            <div className="bg-maroon-900/60 p-3.5 rounded-xl border border-gold-500/30 space-y-1.5 text-xs text-cream-100">
              <div className="flex justify-between">
                <span className="text-gold-400">बैंक:</span>
                <span className="font-medium text-right">{settings.bankName?.split('(')[0] || 'SBI'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold-400">खाता संख्या:</span>
                <span className="font-mono">{settings.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold-400">IFSC कोड:</span>
                <span className="font-mono">{settings.ifscCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold-400">UPI ID:</span>
                <span className="font-mono text-saffron-300">{settings.upiId}</span>
              </div>
            </div>

            <Link
              to="/donate"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white rounded-lg transition shadow"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>सहयोग / दान का विवरण देखें</span>
            </Link>
          </div>

          {/* Column 4: Contact & Social Info */}
          <div className="space-y-4">
            <h4 className="font-spiritual text-base font-bold text-gold-300 border-b border-gold-500/30 pb-2 inline-block">
              संपर्क सूत्र (Contact)
            </h4>
            <div className="space-y-3 text-xs md:text-sm text-cream-200/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{settings.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <div className="flex flex-col text-xs">
                  <a href={`tel:${settings.phonePrimary}`} className="hover:text-gold-300">{settings.phonePrimary}</a>
                  {settings.phoneSecondary && (
                    <a href={`tel:${settings.phoneSecondary}`} className="hover:text-gold-300">{settings.phoneSecondary}</a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-xs hover:text-gold-300">{settings.email}</a>
              </div>
            </div>

            {/* Social media presence */}
            <div className="pt-2">
              <p className="text-xs text-gold-400 font-semibold mb-2">सामाजिक माध्यम (Social):</p>
              <div className="flex items-center gap-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-maroon-900 hover:bg-saffron-600 text-cream-100 flex items-center justify-center transition border border-gold-500/30 text-xs font-bold" aria-label="Facebook">
                  f
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-maroon-900 hover:bg-saffron-600 text-cream-100 flex items-center justify-center transition border border-gold-500/30 text-xs font-bold" aria-label="Instagram">
                  ig
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-maroon-900 hover:bg-saffron-600 text-cream-100 flex items-center justify-center transition border border-gold-500/30 text-xs font-bold" aria-label="YouTube">
                  yt
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-maroon-900 hover:bg-emerald-600 text-cream-100 flex items-center justify-center transition border border-gold-500/30 text-xs font-bold" aria-label="WhatsApp">
                  wa
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60 font-hindi text-center sm:text-left">
          <p>© 2026 {settings.sansthaName}। सर्वाधिकार सुरक्षित। (All Rights Reserved)</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-gold-300 transition">सहायता एवं सुझाव</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-gold-300 transition">व्यवस्थापक लॉगिन (Admin)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
