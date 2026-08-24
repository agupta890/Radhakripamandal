import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { Calendar, User, Eye, ArrowLeft, Tag, Share2, Sparkles, Heart } from 'lucide-react';
import API from '../services/api';
import Loader from '../components/common/Loader';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/blogs/${id}`);
        if (res.data.success) {
          setBlog(res.data.blog);
        }
        
        // Fetch recent blogs for sidebar
        const recentRes = await API.get('/blogs?limit=4');
        if (recentRes.data.success) {
          setRecentBlogs(recentRes.data.blogs.filter(b => (b.slug || b._id) !== id));
        }
      } catch (err) {
        console.error('Blog detail error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 font-hindi pt-20">
        <Loader message="लेख लोड हो रहा है..." />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-cream-50 font-hindi pt-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-spiritual text-maroon-950">लेख प्राप्त नहीं हुआ</h2>
        <Link to="/blogs" className="text-saffron-600 font-semibold hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>सभी ब्लॉग लेखों पर लौटें</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title={blog.title}
        subtitle={blog.excerpt}
        breadcrumb="गृह / ब्लॉग / लेख विवरण"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Back Link & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-stone-600 border-b border-stone-200 pb-4">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 font-bold text-saffron-700 hover:text-saffron-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>सभी लेखों पर लौटें</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-saffron-600" />
              <span>{formatDate(blog.createdAt)}</span>
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-saffron-600" />
              <span>{blog.author}</span>
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-stone-400" />
              <span>{blog.views} दर्शन</span>
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-maroon-900 hover:text-saffron-700 bg-white px-2.5 py-1 rounded-md border border-stone-200 shadow-sm"
              title="लेख साझा करें"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'लिंक कॉपी हुआ' : 'साझा करें'}</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Article + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Article Main Body */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl shadow-md border border-stone-200 space-y-6">
            
            {/* Banner Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96">
              <img
                src={blog.image || 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80'}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category badge */}
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-saffron-100 text-saffron-800 font-bold text-xs">
                {blog.category}
              </span>
            </div>

            {/* Article Content Rendered */}
            <div className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 font-hindi whitespace-pre-line">
              {blog.content}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-stone-400" />
                <span className="text-xs font-semibold text-stone-500">संबंधित विषय:</span>
                {blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 bg-stone-100 hover:bg-saffron-50 text-stone-700 text-xs rounded-full border border-stone-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Card Footer */}
            <div className="bg-cream-50 p-5 rounded-2xl border border-gold-500/30 flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-maroon-900 text-gold-300 flex items-center justify-center font-bold text-lg shrink-0">
                🪷
              </div>
              <div>
                <h4 className="font-spiritual text-base font-bold text-maroon-950">
                  {blog.author}
                </h4>
                <p className="text-xs text-stone-600">
                  श्री राधा कृपा मंडल संस्था परिवार, श्री वृन्दावन धाम
                </p>
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Donation Quick Box */}
            <div className="bg-gradient-to-br from-maroon-950 to-maroon-900 text-white p-6 rounded-3xl shadow-xl border border-gold-500/40 space-y-4">
              <span className="text-gold-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-gold-400" />
                <span>सेवा संकल्प</span>
              </span>
              <h3 className="font-spiritual text-xl font-bold text-white">
                गौ सेवा एवं अन्नदान में सहयोग दें
              </h3>
              <p className="text-xs text-cream-200/90 leading-relaxed font-light">
                आपके द्वारा की गई छोटी सी भेंट भी किसी असहाय जीव के जीवन में दिव्य परिवर्तन ला सकती है।
              </p>
              <Link
                to="/donate"
                className="inline-block w-full text-center py-2.5 bg-gold-500 hover:bg-gold-600 text-maroon-950 font-bold rounded-xl text-xs transition shadow"
              >
                सहयोग / दान करें
              </Link>
            </div>

            {/* Recent Blogs */}
            <div className="bg-white p-6 rounded-3xl shadow-md border border-stone-200 space-y-4">
              <h3 className="font-spiritual text-lg font-bold text-maroon-950 border-b border-stone-200 pb-2">
                अन्य प्रकाशित लेख (Recent Posts)
              </h3>
              
              <div className="space-y-4">
                {recentBlogs.map((item) => (
                  <Link
                    key={item._id}
                    to={`/blogs/${item.slug || item._id}`}
                    className="group flex gap-3 items-center hover:bg-saffron-50/60 p-2 rounded-xl transition"
                  >
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=200&q=80'}
                      alt={item.title}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] text-saffron-700 font-semibold block">
                        {item.category}
                      </span>
                      <h4 className="font-spiritual text-xs font-bold text-stone-900 group-hover:text-saffron-700 transition line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
