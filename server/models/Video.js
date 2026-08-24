const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'कृपया वीडियो का शीर्षक दर्ज करें'],
      trim: true
    },
    category: {
      type: String,
      enum: ['भजन', 'सत्संग', 'प्रवचन', 'धार्मिक कार्यक्रम', 'आरती एवं वंदना'],
      default: 'भजन'
    },
    youtubeUrl: {
      type: String,
      required: [true, 'कृपया यूट्यूब यूआरएल या वीडियो आईडी दर्ज करें'],
      trim: true
    },
    videoId: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Extract YouTube Video ID helper before save
videoSchema.pre('save', function (next) {
  if (this.youtubeUrl) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = this.youtubeUrl.match(regExp);
    if (match && match[2].length === 11) {
      this.videoId = match[2];
    } else if (this.youtubeUrl.length === 11) {
      this.videoId = this.youtubeUrl;
    }
  }
  next();
});

module.exports = mongoose.model('Video', videoSchema);
