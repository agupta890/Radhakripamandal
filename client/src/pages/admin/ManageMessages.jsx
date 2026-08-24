import React, { useState, useEffect } from 'react';
import { Mail, Users, Trash2, CheckCircle2, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import API from '../../services/api';
import Loader from '../../components/common/Loader';

const ManageMessages = () => {
  const [activeTab, setActiveTab] = useState('contacts'); // 'contacts' or 'volunteers'
  const [contacts, setContacts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contactsRes, volunteersRes] = await Promise.all([
        API.get('/contact'),
        API.get('/volunteer')
      ]);
      if (contactsRes.data.success) setContacts(contactsRes.data.contacts);
      if (volunteersRes.data.success) setVolunteers(volunteersRes.data.volunteers);
    } catch (err) {
      console.error('Fetch messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('क्या आप इस संदेश को हटाना चाहते हैं?')) {
      try {
        const res = await API.delete(`/contact/${id}`);
        if (res.data.success) {
          setContacts(contacts.filter((c) => c._id !== id));
          setFeedback('संदेश हटा दिया गया');
          setTimeout(() => setFeedback(''), 3000);
        }
      } catch (err) {
        alert('त्रुटि आई');
      }
    }
  };

  const handleDeleteVolunteer = async (id) => {
    if (window.confirm('क्या आप इस स्वयंसेवक पंजीकरण को हटाना चाहते हैं?')) {
      try {
        const res = await API.delete(`/volunteer/${id}`);
        if (res.data.success) {
          setVolunteers(volunteers.filter((v) => v._id !== id));
          setFeedback('पंजीकरण हटा दिया गया');
          setTimeout(() => setFeedback(''), 3000);
        }
      } catch (err) {
        alert('त्रुटि आई');
      }
    }
  };

  const handleVolunteerStatus = async (id, newStatus) => {
    try {
      const res = await API.put(`/volunteer/${id}`, { status: newStatus });
      if (res.data.success) {
        setVolunteers(volunteers.map((v) => (v._id === id ? { ...v, status: newStatus } : v)));
        setFeedback('स्थिति अपडेट की गई');
        setTimeout(() => setFeedback(''), 3000);
      }
    } catch (err) {
      alert('त्रुटि आई');
    }
  };

  return (
    <div className="space-y-6 font-hindi">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-200">
        <h1 className="font-spiritual text-2xl font-bold text-maroon-950">
          संदेश एवं स्वयंसेवक प्रबंधन (Messages & Volunteers)
        </h1>
        <p className="text-xs text-stone-500">
          वेबसाइट से प्राप्त संपर्क संदेश एवं सेवा हेतु पंजीकृत स्वयंसेवकों की सूची
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-maroon-900 text-gold-300 shadow'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>संपर्क संदेश ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === 'volunteers'
                ? 'bg-saffron-600 text-white shadow'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>सेवा स्वयंसेवक ({volunteers.length})</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {loading ? (
        <Loader message="डेटा लोड हो रहा है..." />
      ) : activeTab === 'contacts' ? (
        // Contacts Table
        contacts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <p className="text-stone-600 text-sm">वर्तमान में कोई संपर्क संदेश उपलब्ध नहीं है।</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                    <th className="p-4">नाम व संपर्क</th>
                    <th className="p-4">विषय</th>
                    <th className="p-4">संदेश</th>
                    <th className="p-4">दिनांक</th>
                    <th className="p-4 text-right">कार्य</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {contacts.map((c) => (
                    <tr key={c._id} className="hover:bg-stone-50/80">
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-bold text-stone-900">{c.name}</div>
                        <div className="text-[11px] text-stone-600 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-saffron-600" />
                          <a href={`tel:${c.phone}`} className="hover:underline">{c.phone}</a>
                        </div>
                        {c.email && (
                          <div className="text-[10px] text-stone-400">{c.email}</div>
                        )}
                      </td>
                      <td className="p-4 font-semibold text-maroon-950 max-w-[200px]">{c.subject}</td>
                      <td className="p-4 text-stone-600 max-w-sm whitespace-pre-line leading-relaxed">{c.message}</td>
                      <td className="p-4 text-stone-400 whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString('hi-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteContact(c._id)}
                          className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="हटाएं"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        // Volunteers Table
        volunteers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <p className="text-stone-600 text-sm">वर्तमान में कोई स्वयंसेवक पंजीकरण उपलब्ध नहीं है।</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 font-semibold">
                    <th className="p-4">नाम व संपर्क</th>
                    <th className="p-4">शहर / स्थान</th>
                    <th className="p-4">रुचि / सेवा क्षेत्र</th>
                    <th className="p-4">विवरण</th>
                    <th className="p-4">स्थिति</th>
                    <th className="p-4 text-right">कार्य</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {volunteers.map((v) => (
                    <tr key={v._id} className="hover:bg-stone-50/80">
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-bold text-stone-900">{v.name}</div>
                        <div className="text-[11px] text-stone-600 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-saffron-600" />
                          <a href={`tel:${v.phone}`} className="hover:underline">{v.phone}</a>
                        </div>
                        {v.email && (
                          <div className="text-[10px] text-stone-400">{v.email}</div>
                        )}
                      </td>
                      <td className="p-4 whitespace-nowrap text-stone-700 font-medium">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          <span>{v.city}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 bg-saffron-50 text-saffron-800 rounded-full font-semibold border border-saffron-200">
                          {v.interest}
                        </span>
                      </td>
                      <td className="p-4 text-stone-600 max-w-xs">{v.message || '—'}</td>
                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={v.status}
                          onChange={(e) => handleVolunteerStatus(v._id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg border border-stone-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-saffron-500 bg-stone-50"
                        >
                          <option value="pending">लंबित (Pending)</option>
                          <option value="contacted">संपर्क किया (Contacted)</option>
                          <option value="approved">स्वीकृत (Approved)</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteVolunteer(v._id)}
                          className="p-1.5 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="हटाएं"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

    </div>
  );
};

export default ManageMessages;
