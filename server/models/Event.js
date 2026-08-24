const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'कृपया कार्यक्रम का शीर्षक दर्ज करें'],
      trim: true
    },
    category: {
      type: String,
      enum: ['भागवत कथा', 'भजन संध्या', 'सत्संग', 'सेवा कार्यक्रम', 'धार्मिक यात्रा', 'उत्सव', 'अन्य'],
      default: 'सत्संग'
    },
    description: {
      type: String,
      required: [true, 'कृपया विवरण दर्ज करें']
    },
    date: {
      type: Date,
      required: [true, 'कृपया दिनांक दर्ज करें']
    },
    time: {
      type: String,
      default: 'सायं 5:00 बजे से 8:00 बजे तक'
    },
    location: {
      type: String,
      required: [true, 'कृपया स्थान दर्ज करें'],
      trim: true
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80'
    },
    organizer: {
      type: String,
      default: 'श्री राधा कृपा मंडल संस्था'
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'upcoming'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Event', eventSchema);
