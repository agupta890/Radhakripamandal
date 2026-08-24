import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  BookOpen,
  Image,
  Video,
  Mail,
  Users,
  TrendingUp,
  Sparkles,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Settings
} from 'lucide-react';
import API from '../../services/api';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await API.get('/settings/stats');
        if (statsRes.data.success) {
          setStats(statsRes.data.stats);
        }

        const contactsRes = await API.get('/contact');
        if (contactsRes.data.success) {
          setRecentContacts(contactsRes.data.contacts.slice(0, 5));
        }
      } catch (err) {
        console.error('Admin Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader message="डैशबोर्ड आंकड़े लोड हो रहे हैं..." />;
  }

  const statCards = [
    { title: 'राधा नाम महायज्ञ (Count)', count: '5.48 Cr+', sub: `${stats?.totalBookRequests || 0} पुस्तिका अनुरोध`, icon: Sparkles, color: 'from-amber-500 to-gold-600', link: '/admin/radha-naam' },
    { title: 'कुल कार्यक्रम (Events)', count: stats?.totalEvents || 0, sub: `${stats?.upcomingEvents || 0} आगामी`, icon: Calendar, color: 'from-saffron-500 to-saffron-600', link: '/admin/events' },
    { title: 'प्रकाशित लेख (Blogs)', count: stats?.totalBlogs || 0, sub: 'आध्यात्मिक लेख', icon: BookOpen, color: 'from-amber-500 to-amber-600', link: '/admin/blogs' },
    { title: 'गैलरी चित्र (Photos)', count: stats?.totalImages || 0, sub: 'सत्संग एवं उत्सव छवियां', icon: Image, color: 'from-emerald-500 to-emerald-600', link: '/admin/gallery' },
    { title: 'वीडियो लिंक (Videos)', count: stats?.totalVideos || 0, sub: 'YouTube भजन व प्रवचन', icon: Video, color: 'from-rose-500 to-rose-600', link: '/admin/videos' },
    { title: 'संपर्क संदेश (Enquiries)', count: stats?.totalMessages || 0, sub: `${stats?.unreadMessages || 0} नए संदेश`, icon: Mail, color: 'from-blue-500 to-blue-600', link: '/admin/messages' },
  ];

  return (
    <div className="space-y-8 font-hindi">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gold-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>व्यवस्थापक नियंत्रण कक्ष (Control Panel)</span>
          </div>
          <h1 className="font-spiritual text-2xl sm:text-3xl font-bold text-cream-50">
            राधे-राधे! श्री राधा कृपा मंडल प्रबंधन
          </h1>
          <p className="text-xs text-cream-200/80 mt-1">
            यहाँ से आप संस्था की वेबसाइट सामग्री, कार्यक्रम, लेख, चित्र, वीडियो एवं दान विवरण का प्रबंधन कर सकते हैं।
          </p>
        </div>

        <Link
          to="/"
          target="_blank"
          className="px-4 py-2.5 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl text-xs font-semibold shadow hover:shadow-lg transition shrink-0 flex items-center gap-1.5"
        >
          <span>लाइव वेबसाइट देखें</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border border-stone-200 hover:border-gold-400 transition-all duration-300 flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-semibold text-stone-500 block mb-1">
                  {card.title}
                </span>
                <span className="text-3xl font-bold font-spiritual text-maroon-950 block">
                  {card.count}
                </span>
                <span className="text-[11px] text-saffron-700 font-medium mt-1 inline-block">
                  {card.sub}
                </span>
              </div>

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Buttons */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-4">
        <h3 className="font-spiritual text-lg font-bold text-maroon-950 border-b border-stone-100 pb-2">
          त्वरित क्रियाएं (Quick Actions)
        </h3>
        
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/events"
            className="px-4 py-2 bg-saffron-50 hover:bg-saffron-100 text-saffron-800 rounded-xl text-xs font-semibold border border-saffron-200 transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-saffron-600" />
            <span>नया कार्यक्रम जोड़ें</span>
          </Link>

          <Link
            to="/admin/blogs"
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-xs font-semibold border border-amber-200 transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-amber-600" />
            <span>नया ब्लॉग लेख लिखें</span>
          </Link>

          <Link
            to="/admin/gallery"
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold border border-emerald-200 transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>गैलरी में चित्र जोड़ें</span>
          </Link>

          <Link
            to="/admin/videos"
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-900 rounded-xl text-xs font-semibold border border-rose-200 transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-rose-600" />
            <span>नया वीडियो लिंक जोड़ें</span>
          </Link>

          <Link
            to="/admin/settings"
            className="px-4 py-2 bg-maroon-50 hover:bg-maroon-100 text-maroon-900 rounded-xl text-xs font-semibold border border-maroon-200 transition flex items-center gap-1.5"
          >
            <Settings className="w-4 h-4 text-maroon-700" />
            <span>दान व बैंक विवरण अपडेट करें</span>
          </Link>
        </div>
      </div>

      {/* Recent Enquiries / Messages */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="font-spiritual text-lg font-bold text-maroon-950">
            हाल ही में प्राप्त संदेश (Recent Messages)
          </h3>
          <Link
            to="/admin/messages"
            className="text-xs font-bold text-saffron-700 hover:text-saffron-800"
          >
            सभी संदेश देखें →
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <p className="text-stone-500 text-xs py-4 text-center">वर्तमान में कोई संदेश उपलब्ध नहीं है।</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                  <th className="p-3">नाम</th>
                  <th className="p-3">मोबाइल नंबर</th>
                  <th className="p-3">विषय</th>
                  <th className="p-3">संदेश</th>
                  <th className="p-3">दिनांक</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentContacts.map((c) => (
                  <tr key={c._id} className="hover:bg-stone-50/80">
                    <td className="p-3 font-semibold text-stone-800">{c.name}</td>
                    <td className="p-3 text-stone-600">{c.phone}</td>
                    <td className="p-3 font-medium text-maroon-950">{c.subject}</td>
                    <td className="p-3 text-stone-500 max-w-xs truncate">{c.message}</td>
                    <td className="p-3 text-stone-400">
                      {new Date(c.createdAt).toLocaleDateString('hi-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
