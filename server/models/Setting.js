const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    sansthaName: {
      type: String,
      default: 'श्री राधा कृपा मंडल संस्था'
    },
    tagline: {
      type: String,
      default: 'सेवा • संस्कार • साधना • समाज कल्याण'
    },
    phonePrimary: {
      type: String,
      default: '+91 98765 43210'
    },
    phoneSecondary: {
      type: String,
      default: '+91 91234 56789'
    },
    email: {
      type: String,
      default: 'info@radhakripamandal.org'
    },
    address: {
      type: String,
      default: 'श्री राधा कृपा आश्रम, परिक्रमा मार्ग, श्री वृन्दावन धाम, मथुरा, उत्तर प्रदेश - 281121'
    },
    announcementText: {
      type: String,
      default: '🌸 आगामी दिव्य आयोजन: 7 दिवसीय श्रीमद्भागवत सप्ताह ज्ञान यज्ञ - वृन्दावन धाम में आगामी 15 मार्च से।'
    },
    // Donation details
    bankName: {
      type: String,
      default: 'State Bank of India (भारतीय स्टेट बैंक)'
    },
    accountName: {
      type: String,
      default: 'Shri Radha Kripa Mandal Sanstha'
    },
    accountNumber: {
      type: String,
      default: '40982341908234'
    },
    ifscCode: {
      type: String,
      default: 'SBIN0001234'
    },
    branch: {
      type: String,
      default: 'Vrindavan Dham Branch, Mathura'
    },
    upiId: {
      type: String,
      default: 'radhakripa@sbi'
    },
    qrCodeUrl: {
      type: String,
      default: ''
    },
    // Radha Naam Lekhan & Pustika Promotion Settings
    radhaNaamCount: {
      type: Number,
      default: 54823100
    },
    naamAutoIncrementRate: {
      type: Number,
      default: 2 // per second increment
    },
    bookTitle: {
      type: String,
      default: 'श्री राधा नाम लेखन महायज्ञ पुस्तिका'
    },
    bookSubtitle: {
      type: String,
      default: '1,08,000 पावन श्री राधा नाम हस्तलिखित संकल्प पुस्तिका'
    },
    bookImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    },
    bookDescription: {
      type: String,
      default: 'यह केवल एक पुस्तिका नहीं, अपितु श्री राधा रानी की कृपा प्राप्ति का साक्षात साधन है। इसमें भक्तिपूर्वक प्रतिदिन लाल या पीली स्याही से श्री राधा नाम लिखें। पुस्तिका पूर्ण होने पर संस्था के श्री वृन्दावन आश्रम में सुरक्षित रखी जाएगी अथवा यमुना जी में विधिपूर्वक समर्पित की जाएगी।'
    },
    bookPages: {
      type: Number,
      default: 108
    },
    bookDeliveryAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Setting', settingSchema);
