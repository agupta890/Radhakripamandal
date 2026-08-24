const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router.route('/:identifier')
  .get(getBlogByIdOrSlug)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;
