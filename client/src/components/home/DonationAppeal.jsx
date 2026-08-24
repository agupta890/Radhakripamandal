import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Copy, Check, QrCode, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import API from '../../services/api';

const DonationAppeal = () => {
  const [settings, setSettings] = useState({
    bankName: 'State Bank of India (भारतीय स्टेट बैंक)',
    accountName: 'Shri Radha Kripa Mandal Sanstha',
    accountNumber: '40982341908234',
    ifscCode: 'SBIN0001234',
    branch: 'Vrindavan Dham Branch, Mathura',
    upiId: 'radhakripa@sbi',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=radhakripa@sbi&pn=Shri%20Radha%20Kripa%20Mandal'
  });
  const [copiedField, setCopiedField] = useState('');

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

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-maroon-950 via-[#360814] to-maroon-950 text-white font-hindi relative overflow-hidden border-y-4 border-gold-500">
      
      {/* Background Sacred Geometric / Mandala Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Spiritual Message */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/40 text-gold-300 text-xs font-semibold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-gold-400" />
            <span>परोपकाराय सतां विभूतयः</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-spiritual text-white leading-snug md:leading-normal py-1">
            आपके सहयोग से <span className="text-gold-gradient">सेवा का कार्य आगे बढ़ता है</span>
          </h2>

          <p className="text-cream-100 text-sm sm:text-base leading-relaxed font-light">
            "आपका छोटा सा सहयोग भी किसी निराश्रित गौवंश के पोषण, किसी भूखे के भोजन और किसी बालक के संस्कारी भविष्य में बड़ा परिवर्तन ला सकता है।"
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto rounded-full mt-2"></div>
        </div>

        {/* Donation Details Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Bank Account Details */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold font-spiritual text-gold-300 flex items-center gap-2 border-b border-gold-500/30 pb-3">
              <span>🏦</span> बैंक खाते में सीधे सहयोग (NEFT/RTGS/IMPS)
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-cream-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/20">
                <span className="text-gold-400 font-semibold">खाता धारक का नाम:</span>
                <span className="font-medium text-stone-200">{settings.accountName}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/20">
                <span className="text-gold-400 font-semibold">बैंक का नाम:</span>
                <span className="font-medium text-stone-200">{settings.bankName}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/20">
                <div>
                  <span className="text-gold-400 font-semibold block sm:inline mr-2">खाता संख्या (A/C No):</span>
                  <span className="font-mono font-bold text-white text-sm sm:text-base">{settings.accountNumber}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(settings.accountNumber, 'account')}
                  className="p-1.5 rounded-md bg-gold-500/20 hover:bg-gold-500/40 text-gold-300 transition text-xs flex items-center gap-1"
                  aria-label="Copy Account Number"
                >
                  {copiedField === 'account' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/20">
                <div>
                  <span className="text-gold-400 font-semibold block sm:inline mr-2">IFSC कोड:</span>
                  <span className="font-mono font-bold text-white text-sm sm:text-base">{settings.ifscCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(settings.ifscCode, 'ifsc')}
                  className="p-1.5 rounded-md bg-gold-500/20 hover:bg-gold-500/40 text-gold-300 transition text-xs flex items-center gap-1"
                  aria-label="Copy IFSC Code"
                >
                  {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-maroon-900/50 border border-gold-500/20">
                <span className="text-gold-400 font-semibold">शाखा (Branch):</span>
                <span className="font-medium text-stone-200">{settings.branch}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-cream-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>सभी दान राशि संस्था के सेवा कार्यों में पूर्ण पारदर्शिता के साथ उपयोग की जाती है।</span>
            </div>
          </div>

          {/* UPI & QR Code Column */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl text-center space-y-4">
            <h3 className="text-xl font-bold font-spiritual text-gold-300 border-b border-gold-500/30 pb-3">
              📱 UPI व QR कोड द्वारा सहयोग
            </h3>

            {/* QR Code Container */}
            <div className="w-44 h-44 mx-auto bg-white p-2.5 rounded-2xl shadow-xl flex items-center justify-center border-2 border-gold-400">
              <img
                src={settings.qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=radhakripa@sbi'}
                alt="Donation QR Code"
                className="w-full h-full object-contain"
              />
            </div>

            {/* UPI ID Pill */}
            <div className="bg-maroon-900/80 p-3 rounded-xl border border-gold-500/30 flex items-center justify-between text-xs">
              <span className="font-mono text-gold-300 font-bold tracking-wider">{settings.upiId}</span>
              <button
                onClick={() => copyToClipboard(settings.upiId, 'upi')}
                className="px-2.5 py-1 rounded bg-gold-500/20 hover:bg-gold-500/40 text-gold-300 transition flex items-center gap-1 font-semibold"
              >
                {copiedField === 'upi' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>कॉपी हुआ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>कॉपी करें</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-cream-200/80">
              Google Pay, PhonePe, Paytm अथवा किसी भी UPI ऍप से स्कैन करें
            </p>

            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white font-bold rounded-xl text-sm transition shadow-lg"
            >
              <span>दान विवरण व रसीद अनुरोध</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DonationAppeal;
