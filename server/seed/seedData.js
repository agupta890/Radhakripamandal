const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Event = require('../models/Event');
const Blog = require('../models/Blog');
const Gallery = require('../models/Gallery');
const Video = require('../models/Video');
const Contact = require('../models/Contact');
const Volunteer = require('../models/Volunteer');
const Setting = require('../models/Setting');
const BookRequest = require('../models/BookRequest');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/radhakripamandal';
    console.log('Connecting to MongoDB at:', mongoUri.replace(/:([^:@]{4})[^:@]*@/, ':****@'));
    await mongoose.connect(mongoUri, { family: 4, serverSelectionTimeoutMS: 20000 });
    console.log('🌸 MongoDB connected successfully...');

    // Clear collections
    await User.deleteMany({});
    await Event.deleteMany({});
    await Blog.deleteMany({});
    await Gallery.deleteMany({});
    await Video.deleteMany({});
    await Contact.deleteMany({});
    await Volunteer.deleteMany({});
    await BookRequest.deleteMany({});
    await Setting.deleteMany({});

    console.log('🧹 Cleaned all dummy data from collections.');

    // 1. Admin User
    const adminUser = await User.create({
      name: 'श्री राधा कृपा मंडल व्यवस्थापक',
      email: (process.env.ADMIN_EMAIL || 'admin@radhakripamandal.org').toLowerCase(),
      password: process.env.ADMIN_PASSWORD || 'Radha@Admin2026',
      role: 'admin'
    });
    console.log(`✅ Admin user initialized: ${adminUser.email}`);

    // 2. Base Settings
    await Setting.create({
      sansthaName: 'श्री राधा कृपा मंडल संस्था',
      tagline: 'सेवा • संस्कार • साधना • समाज कल्याण',
      phonePrimary: '+91 98765 43210',
      phoneSecondary: '+91 91234 56789',
      email: 'info@radhakripamandal.org',
      address: 'श्री राधा कृपा आश्रम, रमणरेती परिक्रमा मार्ग, श्री वृन्दावन धाम, मथुरा, उत्तर प्रदेश - 281121',
      announcementText: '🌸 श्री राधा कृपा मंडल संस्था में आपका स्वागत है।',
      bankName: 'State Bank of India',
      accountName: 'Shri Radha Kripa Mandal Sanstha',
      accountNumber: '40982341908234',
      ifscCode: 'SBIN0001234',
      branch: 'Vrindavan Dham Branch, Mathura (U.P.)',
      upiId: 'radhakripa@sbi',
      qrCodeUrl: '',
      radhaNaamCount: 0,
      naamAutoIncrementRate: 1,
      bookTitle: 'श्री राधा नाम लेखन महायज्ञ पुस्तिका',
      bookSubtitle: '1,08,000 पावन श्री राधा नाम हस्तलिखित संकल्प पुस्तिका',
      bookImage: '',
      bookDescription: 'श्री राधा नाम लेखन पुस्तिका प्राप्त करने हेतु ऑनलाइन आवेदन करें।',
      bookPages: 108,
      bookDeliveryAvailable: true
    });
    console.log('✅ Base Settings initialized.');

    console.log('\n======================================================');
    console.log('✨ Database is completely fresh and clean!');
    console.log('🔑 Admin Credentials:');
    console.log(`   Email:    ${process.env.ADMIN_EMAIL || 'admin@radhakripamandal.org'}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'Radha@Admin2026'}`);
    console.log('======================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

seedDatabase();
