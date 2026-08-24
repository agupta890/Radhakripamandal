import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import API from '../../services/api';
import Modal from '../common/Modal';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events?limit=3');
        if (res.data.success) {
          setEvents(res.data.events);
        }
      } catch (err) {
        console.error('Events fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

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
    <section className="py-16 md:py-24 bg-cream-50 font-hindi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>धार्मिक एवं सेवा आयोजन</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-spiritual text-maroon-950">
              आगामी <span className="text-saffron-gradient">दिव्य कार्यक्रम</span>
            </h2>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-saffron-700 hover:text-saffron-800 transition"
          >
            <span>सभी कार्यक्रम देखें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12 text-stone-500 text-sm">कार्यक्रम लोड हो रहे हैं...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-stone-600 font-hindi">वर्तमान में कोई आगामी कार्यक्रम निर्धारित नहीं है।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-stone-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Event Image & Badge */}
                  <div className="relative h-52 overflow-hidden bg-stone-100">
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80'}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-maroon-900/90 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-gold-500/30">
                      {event.category}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-saffron-700">
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

                    <p className="text-xs text-stone-600 line-clamp-2 pt-2 border-t border-stone-100">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full py-2.5 px-4 rounded-xl bg-saffron-50 hover:bg-saffron-600 text-saffron-800 hover:text-white font-semibold text-xs transition duration-200 flex items-center justify-center gap-2"
                  >
                    <span>विवरण देखें (View Details)</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-saffron-50/60 rounded-xl border border-saffron-200 text-xs">
              <div>
                <span className="text-stone-500 block">दिनांक:</span>
                <span className="font-bold text-stone-800">{formatDate(selectedEvent.date)}</span>
              </div>
              <div>
                <span className="text-stone-500 block">समय:</span>
                <span className="font-bold text-stone-800">{selectedEvent.time}</span>
              </div>
              <div>
                <span className="text-stone-500 block">स्थान:</span>
                <span className="font-bold text-stone-800">{selectedEvent.location}</span>
              </div>
            </div>

            <div>
              <h4 className="font-spiritual text-base font-bold text-maroon-900 mb-1">
                कार्यक्रम का विस्तृत विवरण:
              </h4>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
              <span>आयोजक: {selectedEvent.organizer}</span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-maroon-900 text-white rounded-lg font-semibold hover:bg-maroon-950 transition"
              >
                बंद करें
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default UpcomingEvents;
