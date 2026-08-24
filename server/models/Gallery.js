const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'कृपया शीर्षक दर्ज करें'],
      trim: true
    },
    category: {
      type: String,
      enum: ['धार्मिक कार्यक्रम', 'सत्संग', 'भजन संध्या', 'सेवा कार्य', 'विशेष उत्सव'],
      required: [true, 'कृपया श्रेणी चुनें']
    },
    imageUrl: {
      type: String,
      required: [true, 'कृपया छवि यूआरएल दर्ज करें']
    },
    caption: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);
