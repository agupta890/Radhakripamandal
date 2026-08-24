const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema(
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
    address: {
      type: String,
      required: [true, 'कृपया पूरा पता दर्ज करें'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'कृपया शहर/गाँव दर्ज करें'],
      trim: true
    },
    pincode: {
      type: String,
      required: [true, 'कृपया पिनकोड दर्ज करें'],
      trim: true
    },
    state: {
      type: String,
      default: 'उत्तर प्रदेश'
    },
    copies: {
      type: Number,
      default: 1,
      min: 1,
      max: 10
    },
    sankalpNaam: {
      type: String,
      default: '1,08,000 श्री राधा नाम लेखन'
    },
    notes: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'dispatched', 'delivered', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BookRequest', bookRequestSchema);
