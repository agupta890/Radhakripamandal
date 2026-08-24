import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import API from '../../services/api';
import Modal from '../common/Modal';

const VideoPreview = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get('/videos?limit=3');
        if (res.data.success) {
          setVideos(res.data.videos);
        }
      } catch (err) {
        console.error('Video fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-cream-50 font-hindi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
              <span>सत्संग एवं रसधारा</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-spiritual text-maroon-950">
              दिव्य भजन एवं <span className="text-saffron-gradient">प्रवचन वीडियो</span>
            </h2>
          </div>

          <Link
            to="/videos"
            className="inline-flex items-center gap-2 text-sm font-bold text-saffron-700 hover:text-saffron-800 transition"
          >
            <span>सभी वीडियो देखें (Watch All)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Video Cards Grid */}
        {loading ? (
          <div className="text-center py-12 text-stone-500 text-sm">वीडियो लोड हो रहे हैं...</div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-stone-600">वर्तमान में कोई वीडियो उपलब्ध नहीं है।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((vid) => (
              <div
                key={vid._id}
                onClick={() => setActiveVideo(vid)}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-stone-200 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail with YouTube play overlay */}
                  <div className="relative h-48 bg-black overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${vid.videoId || '7b70yq9gPec'}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    
                    {/* Play Button Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-saffron-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-saffron-600 transition-all duration-300 border-2 border-white/80">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      YouTube
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-semibold text-saffron-700 uppercase bg-saffron-50 px-2.5 py-0.5 rounded-full border border-saffron-200 inline-block">
                      {vid.category}
                    </span>

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
                    <span>वीडियो चलाएं</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <Modal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={activeVideo.title}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId || '7b70yq9gPec'}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
            {activeVideo.description && (
              <p className="text-stone-700 text-sm font-hindi leading-relaxed">
                {activeVideo.description}
              </p>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default VideoPreview;
