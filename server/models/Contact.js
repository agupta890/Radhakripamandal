const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'कृपया नाम दर्ज करें'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'कृपया मोबाइल नंबर दर्ज करें'],
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      required: [true, 'कृपया विषय दर्ज करें'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'कृपया संदेश दर्ज करें']
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Contact', contactSchema);
