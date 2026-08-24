const Blog = require('../models/Blog');

// @desc    Get all blogs (public with search & category)
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const { category, search, limit } = req.query;
    let query = { isPublished: true };

    // If admin is requesting or explicitly wants all
    if (req.query.all === 'true') {
      delete query.isPublished;
    }

    if (category && category !== 'सभी') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    let queryExec = Blog.find(query).sort({ createdAt: -1 });
    if (limit) {
      queryExec = queryExec.limit(Number(limit));
    }

    const blogs = await queryExec;
    res.json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog by ID or Slug
// @route   GET /api/blogs/:identifier
// @access  Public
const getBlogByIdOrSlug = async (req, res) => {
  try {
    const { identifier } = req.params;
    let blog;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(identifier);
    }

    if (!blog) {
      blog = await Blog.findOne({ slug: identifier });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: 'लेख नहीं मिला' });
    }

    // Increment views
    blog.views = (blog.views || 0) + 1;
    await blog.save({ validateBeforeSave: false });

    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private (Admin)
const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, category, image, tags, isPublished } = req.body;

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      author: author || undefined,
      category,
      image: image || undefined,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      isPublished: isPublished !== undefined ? isPublished : true
    });

    res.status(201).json({ success: true, message: 'लेख सफलतापूर्वक प्रकाशित किया गया', blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
const updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'लेख नहीं मिला' });
    }

    const { title, excerpt, content, author, category, image, tags, isPublished } = req.body;

    blog.title = title !== undefined ? title : blog.title;
    blog.excerpt = excerpt !== undefined ? excerpt : blog.excerpt;
    blog.content = content !== undefined ? content : blog.content;
    blog.author = author !== undefined ? author : blog.author;
    blog.category = category !== undefined ? category : blog.category;
    blog.image = image !== undefined ? image : blog.image;
    if (tags !== undefined) {
      blog.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    }
    blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;

    await blog.save();

    res.json({ success: true, message: 'लेख सफलतापूर्वक अपडेट किया गया', blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'लेख नहीं मिला' });
    }

    await blog.deleteOne();
    res.json({ success: true, message: 'लेख सफलतापूर्वक हटा दिया गया' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog
};
