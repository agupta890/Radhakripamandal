import React, { useState, useEffect } from 'react';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { Play, Sparkles, Search, Filter, Video as VideoIcon } from 'lucide-react';
import API from '../services/api';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';

const CATEGORIES = ['सभी', 'भजन', 'सत्संग', 'प्रवचन', 'धार्मिक कार्यक्रम', 'आरती एवं वंदना'];

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      let url = '/videos';
      if (selectedCategory !== 'सभी') {
        url += `?category=${encodeURIComponent(selectedCategory)}`;
      }
      const res = await API.get(url);
      if (res.data.success) {
        setVideos(res.data.videos);
      }
    } catch (err) {
      console.error('Videos error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = videos.filter((v) =>
    searchQuery
      ? v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title="दिव्य वीडियो एवं भजन (Videos)"
        subtitle="श्री राधा-कृष्ण के मधुर भजन, संकीर्तन, संत प्रवचन एवं उत्सवों की वीडियो धारा"
        breadcrumb="गृह / वीडियो"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-maroon-900 text-gold-300 shadow border border-gold-500/40'
                    : 'bg-stone-100 text-stone-700 hover:bg-saffron-50 hover:text-saffron-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="भजन या प्रवचन खोजें..."
              className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-cream-50/50"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </div>

        </div>

        {/* Video Cards Grid */}
        {loading ? (
          <Loader message="वीडियो लोड हो रहे हैं..." />
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <div className="text-5xl mb-2">🎬</div>
            <h3 className="text-xl font-bold font-spiritual text-maroon-950">कोई वीडियो नहीं मिला</h3>
            <p className="text-stone-500 text-sm">इस श्रेणी में वर्तमान में कोई वीडियो उपलब्ध नहीं है।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((vid) => (
              <div
                key={vid._id}
                onClick={() => setActiveVideo(vid)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-stone-200 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-black overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${vid.videoId || '7b70yq9gPec'}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-saffron-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-saffron-600 transition-all duration-300 border-2 border-white/80">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    <div className="absolute top-2 left-2 bg-maroon-900/90 text-gold-300 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-gold-500/30">
                      {vid.category}
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      YouTube
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-spiritual text-base font-bold text-maroon-950 group-hover:text-saffron-600 transition-colors line-clamp-2">
                      {vid.title}
                    </h3>

                    {vid.description && (
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {vid.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-900 group-hover:text-saffron-600">
                    <span>वीडियो चलाएं (Play Video)</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Video Player Lightbox Modal */}
      {activeVideo && (
        <Modal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={activeVideo.title}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4 font-hindi">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId || '7b70yq9gPec'}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-saffron-700 bg-saffron-50 px-3 py-1 rounded-full border border-saffron-200">
                  {activeVideo.category}
                </span>
              </div>
              {activeVideo.description && (
                <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                  {activeVideo.description}
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Videos;
