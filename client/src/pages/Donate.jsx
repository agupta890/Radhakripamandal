import React, { useState, useEffect } from 'react';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { Heart, Copy, Check, ShieldCheck, Sparkles, Send, CheckCircle2, QrCode } from 'lucide-react';
import API from '../services/api';

const CAUSES = [
  {
    title: 'गौ सेवा एवं चारा सहयोग',
    amount: '₹ 1,100 / ₹ 2,100 / ₹ 5,100',
    desc: 'गौशाला के 500+ गोवंशों के लिए नित्य हरा चारा, दलिया, गुड़ एवं चिकित्सा सेवा।'
  },
  {
    title: 'अन्नदान एवं महाप्रसाद सेवा',
    amount: '₹ 2,500 / ₹ 5,000 / ₹ 11,000',
    desc: 'परिक्रमा मार्ग में साधु-संतों, तीर्थयात्रियों एवं निर्धनों के लिए नित्य शुद्ध सात्विक भोजन।'
  },
  {
    title: 'बाल संस्कार एवं शिक्षा सहयोग',
    amount: '₹ 1,500 / ₹ 3,000',
    desc: 'संस्कार शिविर, निःशुल्क पुस्तकें, कॉपियां एवं गीता ज्ञान प्रसार।'
  },
  {
    title: 'स्वास्थ्य एवं नेत्र चिकित्सा शिविर',
    amount: '₹ 5,000 / ₹ 11,000',
    desc: 'ग्रामीण एवं निर्धन परिवारों के लिए निःशुल्क स्वास्थ्य परामर्श, दवाइयां एवं चश्मा वितरण।'
  }
];

const Donate = () => {
  const [settings, setSettings] = useState({
    bankName: 'State Bank of India (भारतीय स्टेट बैंक)',
    accountName: 'Shri Radha Kripa Mandal Sanstha',
    accountNumber: '40982341908234',
    ifscCode: 'SBIN0001234',
    branch: 'Vrindavan Dham Branch, Mathura (U.P.)',
    upiId: 'radhakripa@sbi',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=radhakripa@sbi&pn=Shri%20Radha%20Kripa%20Mandal'
  });
  const [copiedField, setCopiedField] = useState('');
  
  // Donation receipt / acknowledgement form
  const [receiptForm, setReceiptForm] = useState({
    name: '',
    phone: '',
    email: '',
    amount: '',
    cause: 'गौ सेवा एवं चारा सहयोग',
    transactionId: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      // Submit as contact enquiry with donation details
      const payload = {
        name: receiptForm.name,
        phone: receiptForm.phone,
        email: receiptForm.email,
        subject: `दान सहयोग रसीद अनुरोध - ₹${receiptForm.amount} (${receiptForm.cause})`,
        message: `दान राशि: ₹${receiptForm.amount}\nसेवा क्षेत्र: ${receiptForm.cause}\nट्रांजैक्शन/UTR ID: ${receiptForm.transactionId}\nसंदेश: ${receiptForm.message || 'कोई अतिरिक्त संदेश नहीं'}`
      };
      const res = await API.post('/contact', payload);
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setErrorMsg('रसीद अनुरोध भेजने में त्रुटि आई, कृपया सीधे फोन पर संपर्क करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title="सहयोग एवं दान (Support & Donate)"
        subtitle="आपके द्वारा दिया गया निःस्वार्थ दान असहाय गोवंशों, दीन-दुखियों एवं सनातन सेवा कार्यों में समर्पित होता है"
        breadcrumb="गृह / सहयोग एवं दान"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-saffron-50 via-amber-50 to-saffron-50 p-6 sm:p-8 rounded-3xl border border-saffron-200 text-center max-w-4xl mx-auto space-y-3 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>परोपकार ही परम धर्म है</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-maroon-950">
            "दान से धन घटता नहीं, अपितु आत्मा को शांति और अनंत पुण्य मिलता है"
          </h2>
          <p className="text-stone-700 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            संस्था के समस्त सेवा कार्य समाज के दानवीर बंधुओं के सहयोग से ही निर्बाध रूप से संचालित होते हैं। आप अपने शुभ अवसरों (जन्मदिन, वैवाहिक वर्षगांठ, पूर्वजों की पुण्यतिथि) पर सेवा दान कर सकते हैं।
          </p>
        </div>

        {/* Bank & UPI Details Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Bank Details */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-md border border-stone-200 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-stone-200 pb-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-saffron-100 text-saffron-700 flex items-center justify-center font-bold text-xl">
                  🏦
                </div>
                <div>
                  <h3 className="font-spiritual text-xl font-bold text-maroon-950">
                    बैंक खाते में सीधे सहयोग (NEFT / RTGS / IMPS)
                  </h3>
                  <p className="text-xs text-stone-500">सीधे बैंक ट्रांसफर हेतु विवरण</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 font-medium">खाता धारक का नाम:</span>
                  <span className="font-bold text-stone-800">{settings.accountName}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 font-medium">बैंक का नाम:</span>
                  <span className="font-bold text-stone-800">{settings.bankName}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div>
                    <span className="text-stone-500 font-medium block sm:inline mr-2">खाता संख्या (Account No):</span>
                    <span className="font-mono font-bold text-maroon-950 text-sm sm:text-base">{settings.accountNumber}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(settings.accountNumber, 'account')}
                    className="p-1.5 rounded-lg bg-saffron-100 hover:bg-saffron-200 text-saffron-800 transition text-xs flex items-center gap-1 font-semibold"
                  >
                    {copiedField === 'account' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedField === 'account' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <div>
                    <span className="text-stone-500 font-medium block sm:inline mr-2">IFSC कोड:</span>
                    <span className="font-mono font-bold text-maroon-950 text-sm sm:text-base">{settings.ifscCode}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(settings.ifscCode, 'ifsc')}
                    className="p-1.5 rounded-lg bg-saffron-100 hover:bg-saffron-200 text-saffron-800 transition text-xs flex items-center gap-1 font-semibold"
                  >
                    {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedField === 'ifsc' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 font-medium">शाखा (Branch):</span>
                  <span className="font-bold text-stone-800">{settings.branch}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>संस्था के सभी वित्तीय खाते पंजीकृत एवं ऑडिटेड हैं।</span>
            </div>
          </div>

          {/* UPI & QR Code */}
          <div className="lg:col-span-5 bg-gradient-to-b from-maroon-950 via-maroon-900 to-maroon-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-gold-500/40 text-center space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-gold-300">
                <QrCode className="w-6 h-6" />
                <h3 className="font-spiritual text-xl font-bold">UPI / QR कोड से सहयोग</h3>
              </div>

              {/* QR Image */}
              <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-xl border-2 border-gold-400 flex items-center justify-center">
                <img
                  src={settings.qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=radhakripa@sbi'}
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* UPI ID Copy Pill */}
              <div className="bg-maroon-900/90 p-3 rounded-xl border border-gold-500/40 flex items-center justify-between text-xs">
                <span className="font-mono text-gold-300 font-bold tracking-wider">{settings.upiId}</span>
                <button
                  onClick={() => copyToClipboard(settings.upiId, 'upi')}
                  className="px-2.5 py-1 rounded bg-gold-500/20 hover:bg-gold-500/40 text-gold-300 transition flex items-center gap-1 font-semibold"
                >
                  {copiedField === 'upi' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'upi' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                </button>
              </div>

              <p className="text-xs text-cream-200/80">
                PhonePe, Google Pay, Paytm, BHIM अथवा किसी भी बैंकिंग ऍप से स्कैन करें।
              </p>
            </div>

            <div className="pt-2 text-[11px] text-cream-200/70 border-t border-gold-500/20">
              सहयोग उपरांत नीचे दिए गए फॉर्म से रसीद अथवा अभिस्वीकृति प्राप्त करें।
            </div>
          </div>

        </div>

        {/* Suggested Seva Causes */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-spiritual text-maroon-950">
              सेवा प्रकल्प एवं सहयोग राशियां (Suggested Seva Causes)
            </h3>
            <p className="text-stone-600 text-sm">
              आप अपनी श्रद्धानुसार किसी भी विशेष सेवा कार्य हेतु संकल्प ले सकते हैं
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAUSES.map((cause, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-saffron-700 bg-saffron-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    {cause.amount}
                  </span>
                  <h4 className="font-spiritual text-lg font-bold text-maroon-950 mb-2">{cause.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{cause.desc}</p>
                </div>
                <button
                  onClick={() => {
                    setReceiptForm({ ...receiptForm, cause: cause.title });
                    const formEl = document.getElementById('receipt-section');
                    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-saffron-700 hover:text-saffron-800 text-left pt-2 border-t border-stone-100"
                >
                  यह सेवा चुनें ↓
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Acknowledgement / Receipt Form */}
        <div id="receipt-section" className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-stone-200 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 border-b border-stone-200 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-saffron-700 uppercase">
              <Heart className="w-4 h-4 text-saffron-600" />
              <span>दान सूचना एवं रसीद अनुरोध</span>
            </div>
            <h3 className="text-2xl font-bold font-spiritual text-maroon-950">
              सहयोग उपरांत विवरण दर्ज करें
            </h3>
            <p className="text-xs text-stone-500">
              यदि आपने बैंक अथवा UPI द्वारा सहयोग दिया है, तो कृपया रसीद प्राप्ति हेतु यह फॉर्म भरें
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-spiritual text-maroon-950 font-bold">धन्यवाद एवं जय श्री राधे!</h4>
              <p className="text-stone-700 text-sm max-w-md mx-auto">
                आपके सहयोग का विवरण संस्था को प्राप्त हो गया है। सत्यापन उपरांत आपकी रसीद शीघ्र प्रेषित कर दी जाएगी।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-saffron-600 text-white rounded-xl text-xs font-semibold"
              >
                नया विवरण दर्ज करें
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              {errorMsg && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs border border-red-200">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    आपका पूरा नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={receiptForm.name}
                    onChange={(e) => setReceiptForm({ ...receiptForm, name: e.target.value })}
                    placeholder="उदा. अमित शर्मा"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    मोबाइल नंबर (व्हाट्सएप) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={receiptForm.phone}
                    onChange={(e) => setReceiptForm({ ...receiptForm, phone: e.target.value })}
                    placeholder="उदा. 98XXXXXXXX"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    सहयोग राशि (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={receiptForm.amount}
                    onChange={(e) => setReceiptForm({ ...receiptForm, amount: e.target.value })}
                    placeholder="उदा. 2100"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    सेवा प्रकल्प चुनें *
                  </label>
                  <select
                    value={receiptForm.cause}
                    onChange={(e) => setReceiptForm({ ...receiptForm, cause: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  >
                    <option value="गौ सेवा एवं चारा सहयोग">गौ सेवा एवं चारा सहयोग</option>
                    <option value="अन्नदान एवं महाप्रसाद सेवा">अन्नदान एवं महाप्रसाद सेवा</option>
                    <option value="बाल संस्कार एवं शिक्षा सहयोग">बाल संस्कार एवं शिक्षा सहयोग</option>
                    <option value="स्वास्थ्य एवं नेत्र चिकित्सा शिविर">स्वास्थ्य एवं नेत्र चिकित्सा शिविर</option>
                    <option value="सामान्य संस्था कोष">सामान्य संस्था कोष</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    UPI / Bank Transaction / UTR ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={receiptForm.transactionId}
                    onChange={(e) => setReceiptForm({ ...receiptForm, transactionId: e.target.value })}
                    placeholder="उदा. 4098234190..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ईमेल पता (रसीद हेतु)
                  </label>
                  <input
                    type="email"
                    value={receiptForm.email}
                    onChange={(e) => setReceiptForm({ ...receiptForm, email: e.target.value })}
                    placeholder="उदा. amit@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  अतिरिक्त संदेश अथवा प्रार्थना
                </label>
                <textarea
                  rows={2}
                  value={receiptForm.message}
                  onChange={(e) => setReceiptForm({ ...receiptForm, message: e.target.value })}
                  placeholder="अपने पूर्वजों अथवा परिवार के मंगल की कामना..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 text-xs sm:text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {loading ? 'विवरण भेजा जा रहा है...' : (
                  <>
                    <span>दान विवरण व रसीद अनुरोध सबमिट करें</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default Donate;
