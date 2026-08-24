import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Image,
  Video,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Globe,
  Sparkles,
  UserCheck
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-stone-100 font-hindi">लोड हो रहा है...</div>;
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const navItems = [
    { name: 'डैशबोर्ड (Overview)', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'राधा नाम पुस्तिका व काउंटर', path: '/admin/radha-naam', icon: Sparkles },
    { name: 'कार्यक्रम प्रबंधन (Events)', path: '/admin/events', icon: Calendar },
    { name: 'ब्लॉग प्रबंधन (Blogs)', path: '/admin/blogs', icon: BookOpen },
    { name: 'गैलरी प्रबंधन (Gallery)', path: '/admin/gallery', icon: Image },
    { name: 'वीडियो प्रबंधन (Videos)', path: '/admin/videos', icon: Video },
    { name: 'संदेश व स्वयंसेवक (Messages)', path: '/admin/messages', icon: Mail },
    { name: 'संस्था सेटिंग्स व दान (Settings)', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-stone-100 font-hindi flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-maroon-950 text-white px-4 py-3 flex items-center justify-between border-b border-gold-500/30">
        <div className="flex items-center gap-2">
          <span className="text-xl">🪷</span>
          <span className="font-spiritual font-bold text-gold-300 text-sm">व्यवस्थापक कक्ष</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-white/10 text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-gradient-to-b from-maroon-950 via-[#2d0914] to-[#1a050b] text-stone-200 border-r border-gold-500/30 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Admin Brand */}
          <div className="p-6 border-b border-gold-500/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-saffron-600 to-gold-400 p-0.5 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-maroon-950 rounded-full flex items-center justify-center text-xl">
                🪷
              </div>
            </div>
            <div>
              <h2 className="font-spiritual text-base font-bold text-cream-50 leading-normal">
                श्री राधा कृपा मंडल
              </h2>
              <span className="text-[10px] text-gold-400 font-semibold tracking-normal block">
                व्यवस्थापक डैशबोर्ड
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-saffron-600 to-saffron-700 text-white shadow-md'
                      : 'text-stone-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gold-500/20 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-cream-200/80 hover:text-white hover:bg-white/10 transition"
          >
            <Globe className="w-4 h-4 text-gold-400" />
            <span>मुख्य वेबसाइट देखें</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-950/50 hover:text-red-200 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>लॉगआउट (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen p-4 sm:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
