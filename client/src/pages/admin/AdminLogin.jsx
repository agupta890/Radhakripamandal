import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@radhakripamandal.org');
  const [password, setPassword] = useState('Radha@Admin2026');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'लॉगिन विफल रहा, कृपया क्रेडेंशियल्स जांचें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-maroon-950 via-[#330a15] to-maroon-950 flex items-center justify-center p-4 font-hindi relative overflow-hidden">
      
      {/* Background Sacred Geometric Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gold-500/40 relative z-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white p-8 text-center space-y-3 border-b border-gold-500/30">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-saffron-600 to-gold-400 p-0.5 mx-auto shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-maroon-950 rounded-full flex items-center justify-center text-3xl">
              🪷
            </div>
          </div>
          
          <h2 className="font-spiritual text-2xl font-bold text-cream-50">
            व्यवस्थापक प्रवेश (Admin Login)
          </h2>
          <p className="text-xs text-gold-300">
            श्री राधा कृपा मंडल संस्था • प्रबंधन प्रणाली
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs border border-red-200">
              {errorMsg}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-stone-700">
              व्यवस्थापक ईमेल (Admin Email)
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@radhakripamandal.org"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-stone-700">
              पासवर्ड (Password)
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-0.5">
            <p className="font-semibold">🔑 डिफ़ॉल्ट क्रेडेंशियल्स (Initial Seed):</p>
            <p>ईमेल: <span className="font-mono">admin@radhakripamandal.org</span></p>
            <p>पासवर्ड: <span className="font-mono">Radha@Admin2026</span></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            {loading ? 'सत्यापित किया जा रहा है...' : (
              <>
                <span>सुरक्षित लॉगिन करें</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-saffron-700 hover:text-saffron-900 font-semibold">
              ← मुख्य वेबसाइट पर लौटें
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
