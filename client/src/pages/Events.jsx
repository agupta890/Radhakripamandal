import React, { useState, useEffect } from 'react';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { Calendar, Clock, MapPin, Search, Filter, Sparkles, ArrowRight, User } from 'lucide-react';
import API from '../services/api';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';

const CATEGORIES = ['सभी', 'भागवत कथा', 'भजन संध्या', 'सत्संग', 'सेवा कार्यक्रम', 'उत्सव'];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [statusTab, setStatusTab] = useState('upcoming'); // 'upcoming' or 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, statusTab]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let url = `/events?status=${statusTab}`;
      if (selectedCategory !== 'सभी') {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const res = await API.get(url);
      if (res.data.success) {
        setEvents(res.data.events);
      }
    } catch (err) {
      console.error('Events error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title="धार्मिक एवं सेवा कार्यक्रम (Events)"
        subtitle="श्रीमद्भागवत कथा, संकीर्तन संध्या, सत्संग महोत्सव एवं सेवा अभियानों का विवरण"
        breadcrumb="गृह / कार्यक्रम"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Status Tabs (Upcoming vs Past) & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
          
          {/* Tabs */}
          <div className="flex bg-stone-100 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setStatusTab('upcoming')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition ${
                statusTab === 'upcoming'
                  ? 'bg-saffron-600 text-white shadow'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              आगामी कार्यक्रम (Upcoming)
            </button>
            <button
              onClick={() => setStatusTab('completed')}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs md:text-sm font-semibold transition ${
                statusTab === 'completed'
                  ? 'bg-maroon-900 text-gold-300 shadow'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              संपन्न कार्यक्रम (Past Events)
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-80">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="कार्यक्रम खोजें..."
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-cream-50/50"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-maroon-900 hover:bg-maroon-950 text-white text-xs font-semibold rounded-xl transition shrink-0"
            >
              खोजें
            </button>
          </form>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-stone-400 shrink-0 ml-1" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-maroon-900 text-gold-300 shadow-sm border border-gold-500/40'
                  : 'bg-white text-stone-600 hover:bg-saffron-50 hover:text-saffron-700 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        {loading ? (
          <Loader message="कार्यक्रम विवरण लोड हो रहा है..." />
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <div className="text-5xl">🪷</div>
            <h3 className="text-xl font-bold font-spiritual text-maroon-950">कोई कार्यक्रम नहीं मिला</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              इस श्रेणी अथवा खोज में वर्तमान में कोई कार्यक्रम उपलब्ध नहीं है। कृपया अन्य श्रेणी चुनें।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-stone-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Event Banner Image */}
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-maroon-900/90 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-gold-500/30">
                      {event.category}
                    </div>
                    {event.status === 'completed' && (
                      <div className="absolute top-3 right-3 bg-stone-900/80 text-white text-[10px] px-2.5 py-0.5 rounded-full">
                        संपन्न
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-saffron-700">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{formatDate(event.date)}</span>
                    </div>

                    <h3 className="font-spiritual text-xl font-bold text-maroon-950 group-hover:text-saffron-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-3 pt-2 border-t border-stone-100 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-saffron-50 to-amber-50 hover:from-saffron-600 hover:to-saffron-700 text-saffron-900 hover:text-white font-bold text-xs transition duration-200 flex items-center justify-center gap-2 border border-saffron-200 hover:border-transparent shadow-sm"
                  >
                    <span>सम्पूर्ण विवरण देखें (View Details)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Event Details Lightbox Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 font-hindi">
            <div className="h-64 rounded-xl overflow-hidden shadow-inner">
              <img
                src={selectedEvent.image || 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80'}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-saffron-50/70 rounded-xl border border-saffron-200 text-xs">
              <div>
                <span className="text-stone-500 block font-medium">दिनांक:</span>
                <span className="font-bold text-stone-800">{formatDate(selectedEvent.date)}</span>
              </div>
              <div>
                <span className="text-stone-500 block font-medium">समय:</span>
                <span className="font-bold text-stone-800">{selectedEvent.time}</span>
              </div>
              <div>
                <span className="text-stone-500 block font-medium">स्थान:</span>
                <span className="font-bold text-stone-800">{selectedEvent.location}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-spiritual text-base font-bold text-maroon-900">
                कार्यक्रम का विस्तृत विवरण:
              </h4>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line bg-stone-50 p-4 rounded-xl border border-stone-200">
                {selectedEvent.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-wrap justify-between items-center text-xs text-stone-600 gap-2">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-saffron-600" />
                <span>आयोजक: <strong>{selectedEvent.organizer}</strong></span>
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 bg-maroon-900 text-white rounded-lg font-semibold hover:bg-maroon-950 transition text-xs"
              >
                बंद करें
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Events;
