import React, { useState } from 'react';
import Modal from '../common/Modal';
import API from '../../services/api';
import { Heart, Send, CheckCircle2 } from 'lucide-react';

const VolunteerModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    interest: 'गौ सेवा',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await API.post('/volunteer', formData);
      if (res.data.success) {
        setSuccessMsg(res.data.message);
        setFormData({
          name: '',
          phone: '',
          email: '',
          city: '',
          interest: 'गौ सेवा',
          message: ''
        });
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'पंजीकरण में त्रुटि आई, कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="सेवा से जुड़ें (Volunteer Registration)">
      {successMsg ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-spiritual text-maroon-900 font-bold">जय श्री राधे!</h4>
          <p className="text-stone-700 font-hindi text-sm max-w-md mx-auto">{successMsg}</p>
          <button
            onClick={() => { setSuccessMsg(''); onClose(); }}
            className="mt-4 px-6 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white rounded-lg font-medium transition shadow-md"
          >
            बंद करें
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-hindi">
          <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-3 flex items-start gap-3">
            <Heart className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" />
            <p className="text-xs text-saffron-900 leading-relaxed">
              "सेवा ही परम धर्म है।" संस्था के विभिन्न सेवा प्रकल्पों (गौ सेवा, अन्नक्षेत्र, बाल संस्कार, चिकित्सा शिविर) में अपना अमूल्य समय व सहयोग दें।
            </p>
          </div>

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
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="उदा. राहुल शर्मा"
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                मोबाइल नंबर (व्हाट्सएप) *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="उदा. 98XXXXXXXX"
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-white text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ईमेल पता (वैकल्पिक)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="उदा. rahul@example.com"
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                शहर / जिला *
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="उदा. मथुरा / दिल्ली"
                className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              आप किस सेवा क्षेत्र में सहयोग करना चाहते हैं? *
            </label>
            <select
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-white text-sm"
            >
              <option value="गौ सेवा">गौ सेवा (चारा, गौशाला सहयोग)</option>
              <option value="अन्नक्षेत्र / भोजन सेवा">अन्नक्षेत्र / भोजन सेवा (महाप्रसाद वितरण)</option>
              <option value="धार्मिक कार्यक्रम व उत्सव">धार्मिक कार्यक्रम व उत्सव (कथा, संकीर्तन व्यवस्था)</option>
              <option value="शिक्षा एवं बाल संस्कार">शिक्षा एवं बाल संस्कार (संस्कार शिविर, शिक्षण)</option>
              <option value="प्रचार एवं तकनीक सेवा">प्रचार एवं तकनीक सेवा (सोशल मीडिया, फोटोग्राफी)</option>
              <option value="अन्य सेवा">अन्य सेवा</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              अतिरिक्त विवरण / सुझाव
            </label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="आप किस प्रकार संस्था के कार्यों में सहयोग देना चाहते हैं..."
              className="w-full px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-white text-sm resize-none"
            ></textarea>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium rounded-lg"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white rounded-lg font-semibold text-sm shadow-md transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? 'पंजीकरण हो रहा है...' : (
                <>
                  <span>सेवा हेतु पंजीकरण करें</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default VolunteerModal;
