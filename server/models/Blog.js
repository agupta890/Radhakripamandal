const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'कृपया ब्लॉग का शीर्षक दर्ज करें'],
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: [true, 'कृपया संक्षिप्त विवरण दर्ज करें']
    },
    content: {
      type: String,
      required: [true, 'कृपया मुख्य सामग्री दर्ज करें']
    },
    author: {
      type: String,
      default: 'श्री राधा कृपा मंडल परिवार'
    },
    category: {
      type: String,
      enum: ['भक्ति व साधना', 'संस्था के कार्य', 'त्योहार एवं उत्सव', 'धार्मिक विचार', 'गौ सेवा व संस्कार'],
      default: 'भक्ति व साधना'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80'
    },
    tags: [String],
    isPublished: {
      type: Boolean,
      default: true
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Auto-generate slug before saving
blogSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\u0900-\u097F]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now().toString().slice(-4);
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
