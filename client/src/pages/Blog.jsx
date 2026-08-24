import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpiritualHeader from '../components/common/SpiritualHeader';
import { Calendar, User, Eye, ArrowRight, Search, Sparkles } from 'lucide-react';
import API from '../services/api';
import Loader from '../components/common/Loader';

const CATEGORIES = ['सभी', 'भक्ति व साधना', 'संस्था के कार्य', 'त्योहार एवं उत्सव', 'धार्मिक विचार', 'गौ सेवा व संस्कार'];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('सभी');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      let url = '/blogs';
      if (selectedCategory !== 'सभी') {
        url += `?category=${encodeURIComponent(selectedCategory)}`;
      }
      if (searchQuery) {
        url += `${selectedCategory !== 'सभी' ? '&' : '?'}search=${encodeURIComponent(searchQuery)}`;
      }
      const res = await API.get(url);
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (err) {
      console.error('Blogs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-cream-50 font-hindi pb-20">
      <SpiritualHeader
        title="समाचार एवं ब्लॉग (Spiritual Blog)"
        subtitle="भक्ति, साधना, सनातन संस्कृति, गौ महिमा एवं संस्था के सेवा अभियानों पर ज्ञानवर्धक लेख"
        breadcrumb="गृह / ब्लॉग"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Search & Category Filter Bar */}
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

          {/* Search */}
          <form onSubmit={handleSearch} className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="लेख खोजें..."
              className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-saffron-500 bg-cream-50/50"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </form>

        </div>

        {/* Blog Grid */}
        {loading ? (
          <Loader message="लेख लोड हो रहे हैं..." />
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <div className="text-5xl mb-2">📜</div>
            <h3 className="text-xl font-bold font-spiritual text-maroon-950">कोई लेख नहीं मिला</h3>
            <p className="text-stone-500 text-sm">इस श्रेणी में वर्तमान में कोई लेख उपलब्ध नहीं है।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-stone-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Blog Image */}
                  <div className="relative h-52 overflow-hidden bg-stone-100">
                    <img
                      src={blog.image || 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-maroon-900/90 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border border-gold-500/30">
                      {blog.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-saffron-600" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-stone-400" />
                        <span>{blog.views || 0} दर्शन</span>
                      </span>
                    </div>

                    <h3 className="font-spiritual text-xl font-bold text-maroon-950 group-hover:text-saffron-600 transition-colors line-clamp-2">
                      <Link to={`/blogs/${blog.slug || blog._id}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <User className="w-3 h-3 text-stone-400" />
                    <span className="truncate max-w-[120px]">{blog.author}</span>
                  </span>

                  <Link
                    to={`/blogs/${blog.slug || blog._id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-saffron-700 hover:text-saffron-800 transition group-hover:translate-x-0.5 transform"
                  >
                    <span>पूरा पढ़ें (Read More)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Blog;
