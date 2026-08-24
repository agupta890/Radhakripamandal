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

const clearAndReset = async (mongoUri) => {
  console.log(`Connecting to: ${mongoUri.replace(/:([^:@]{4})[^:@]*@/, ':****@')}`);
  await mongoose.connect(mongoUri, { family: 4, serverSelectionTimeoutMS: 20000 });

  // 1. Remove all content collections
  await Event.deleteMany({});
  await Blog.deleteMany({});
  await Gallery.deleteMany({});
  await Video.deleteMany({});
  await Contact.deleteMany({});
  await Volunteer.deleteMany({});
  await BookRequest.deleteMany({});
  console.log('🧹 Cleared all Events, Blogs, Galleries, Videos, Contacts, Volunteers, and Book Requests.');

  // 2. Ensure Admin User exists
  await User.deleteMany({});
  const adminUser = await User.create({
    name: 'श्री राधा कृपा मंडल व्यवस्थापक',
    email: (process.env.ADMIN_EMAIL || 'admin@radhakripamandal.org').toLowerCase(),
    password: process.env.ADMIN_PASSWORD || 'Radha@Admin2026',
    role: 'admin'
  });
  console.log(`✅ Admin user ready: ${adminUser.email} / ${process.env.ADMIN_PASSWORD || 'Radha@Admin2026'}`);

  // 3. Ensure Base Settings exists
  await Setting.deleteMany({});
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

  // Verification counts
  const counts = {
    users: await User.countDocuments(),
    settings: await Setting.countDocuments(),
    events: await Event.countDocuments(),
    blogs: await Blog.countDocuments(),
    galleries: await Gallery.countDocuments(),
    videos: await Video.countDocuments(),
    contacts: await Contact.countDocuments(),
    volunteers: await Volunteer.countDocuments(),
    bookrequests: await BookRequest.countDocuments(),
  };

  console.log('📊 Current Collection Counts:', counts);
  await mongoose.disconnect();
};

const run = async () => {
  try {
    const uris = [
      process.env.MONGO_URI || 'mongodb+srv://ansh890hh:Himi890@cluster0.3lvsxs5.mongodb.net/radhakripamandal?retryWrites=true&w=majority',
      'mongodb+srv://ansh890hh:Himi890@cluster0.3lvsxs5.mongodb.net/test?retryWrites=true&w=majority'
    ];

    for (const uri of uris) {
      await clearAndReset(uri);
    }

    console.log('\n✨ All hardcoded data removed. The database is clean and ready for manual input from the Admin Dashboard!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error clearing data:', err);
    process.exit(1);
  }
};

run();
