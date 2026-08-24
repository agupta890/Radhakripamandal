import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Heart,
  UserCheck,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import VolunteerModal from '../forms/VolunteerModal';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [settings, setSettings] = useState({
    sansthaName: 'श्री राधा कृपा मंडल संस्था',
    phonePrimary: '+91 98765 43210',
    email: 'info@radhakripamandal.org',
    announcementText: '🌸 आगामी कार्यक्रम: 7 दिवसीय श्रीमद्भागवत सप्ताह ज्ञान यज्ञ - वृन्दावन धाम में आगामी 15 मार्च से।'
  });
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/settings');
        if (res.data.success && res.data.setting) {
          setSettings(res.data.setting);
        }
      } catch (e) {
        // Fallback to default
      }
    };
    fetchSettings();
  }, []);

  const navLinks = [
    { name: 'होम', path: '/' },
    { name: 'राधा नाम पुस्तिका', path: '/radha-naam-pustika' },
    { name: 'हमारे बारे में', path: '/about' },
    { name: 'हमारे कार्य', path: '/services' },
    { name: 'कार्यक्रम', path: '/events' },
    { name: 'गैलरी', path: '/gallery' },
    { name: 'वीडियो', path: '/videos' },
    { name: 'ब्लॉग', path: '/blogs' },
    { name: 'सहयोग / दान', path: '/donate' },
    { name: 'संपर्क करें', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full shadow-md bg-white">
        {/* Top Info Bar */}
        <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-cream-100 text-xs py-1.5 px-4 border-b border-gold-500/20">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-4 text-xs font-hindi">
              <a href={`tel:${settings.phonePrimary}`} className="flex items-center gap-1.5 hover:text-gold-400 transition">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>{settings.phonePrimary}</span>
              </a>
              <span className="hidden sm:inline text-gold-500/40">|</span>
              <a href={`mailto:${settings.email}`} className="hidden sm:flex items-center gap-1.5 hover:text-gold-400 transition">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>{settings.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <div className="hidden md:flex items-center gap-1.5 text-gold-300 text-xs font-medium">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>श्री वृन्दावन धाम • मथुरा</span>
              </div>
              <span className="text-gold-500/40 hidden md:inline">|</span>
              {isAuthenticated ? (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1 text-gold-400 hover:text-white bg-maroon-800/70 hover:bg-maroon-800 px-2.5 py-0.5 rounded border border-gold-500/30 transition text-[11px] font-semibold"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>प्रशासन कक्ष (Admin)</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="text-stone-300 hover:text-gold-400 transition text-[11px] font-medium"
                >
                  व्यवस्थापक लॉगिन
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main Branding & Navigation Bar */}
        <div className="bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo / Branding */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-saffron-600 via-gold-500 to-maroon-700 p-0.5 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-2xl">
                    🪷
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold font-spiritual text-maroon-950 tracking-normal leading-snug group-hover:text-saffron-600 transition">
                    श्री राधा कृपा मंडल संस्था
                  </span>
                  <span className="text-[11px] md:text-xs text-saffron-700 font-semibold tracking-normal font-hindi">
                    सेवा • संस्कार • साधना • समाज कल्याण
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 font-hindi ${
                      isActive(link.path)
                        ? 'text-maroon-900 bg-saffron-50 font-bold border-b-2 border-saffron-600'
                        : 'text-stone-700 hover:text-saffron-600 hover:bg-stone-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="hidden sm:flex items-center gap-3">
                <button
                  onClick={() => setIsVolunteerOpen(true)}
                  className="relative group overflow-hidden px-4 py-2 rounded-full bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white text-xs md:text-sm font-semibold font-hindi shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 border border-saffron-400/40"
                >
                  <Heart className="w-4 h-4 text-white group-hover:scale-125 transition-transform" />
                  <span>सेवा से जुड़ें</span>
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="flex lg:hidden items-center gap-2">
                <button
                  onClick={() => setIsVolunteerOpen(true)}
                  className="p-2 rounded-lg bg-saffron-50 text-saffron-700 hover:bg-saffron-100 sm:hidden"
                  aria-label="Join Seva"
                >
                  <Heart className="w-5 h-5 text-saffron-600" />
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2.5 rounded-lg text-stone-700 hover:text-maroon-900 hover:bg-stone-100 transition"
                  aria-label="Toggle navigation"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-cream-50 border-b border-stone-200 shadow-xl animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium font-hindi transition ${
                    isActive(link.path)
                      ? 'text-saffron-800 bg-saffron-100/70 font-bold'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-saffron-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-stone-200 mt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsVolunteerOpen(true);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-lg font-semibold text-center font-hindi flex items-center justify-center gap-2 shadow-sm"
                >
                  <Heart className="w-4 h-4" />
                  <span>सेवा से जुड़ें (Volunteer)</span>
                </button>

                <Link
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 bg-maroon-900 text-gold-300 hover:bg-maroon-950 rounded-lg font-semibold text-center font-hindi flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>सहयोग / दान करें</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Volunteer Modal component */}
      <VolunteerModal
        isOpen={isVolunteerOpen}
        onClose={() => setIsVolunteerOpen(false)}
      />
    </>
  );
};

export default Navbar;
