const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Video = require('../models/Video');

const videosData = [
  // 1. आरती एवं वंदना
  {
    title: 'श्री राधा कृपा कटाक्ष स्तोत्रम् — अति पावन एवं मधुर पाठ',
    category: 'आरती एवं वंदना',
    youtubeUrl: 'https://www.youtube.com/watch?v=7b70yq9gPec',
    videoId: '7b70yq9gPec',
    description: 'समस्त कष्टों का निवारण करने वाला और श्री राधा जी की अहैतुकी कृपा दिलाने वाला दिव्य स्तोत्र।',
    isFeatured: true
  },
  {
    title: 'श्री बांके बिहारी जी की दिव्य आरती — श्री वृन्दावन धाम',
    category: 'आरती एवं वंदना',
    youtubeUrl: 'https://www.youtube.com/watch?v=vS5tWw4zXF0',
    videoId: 'vS5tWw4zXF0',
    description: 'श्री वृन्दावन धाम में बांके बिहारी मंदिर की मंगलकारी सायंकालीन आरती दर्शन।',
    isFeatured: false
  },
  {
    title: 'श्री यमुना जी की दिव्य महाआरती — विश्राम घाट, मथुरा',
    category: 'आरती एवं वंदना',
    youtubeUrl: 'https://www.youtube.com/watch?v=2vYkU8tGq5A',
    videoId: '2vYkU8tGq5A',
    description: 'विश्राम घाट पर 108 दीपकों एवं शंखध्वनि के साथ संपन्न हुई सायंकालीन पावन यमुना महाआरती।',
    isFeatured: false
  },

  // 2. भजन
  {
    title: 'मेरी लगी श्याम संग प्रीत — भावपूर्ण श्री कृष्ण भजन',
    category: 'भजन',
    youtubeUrl: 'https://www.youtube.com/watch?v=gT5-hZ_JbEI',
    videoId: 'gT5-hZ_JbEI',
    description: 'वृन्दावन धाम की पावन भूमि पर गाया गया भावविभोर कर देने वाला मधुर संकीर्तन पद।',
    isFeatured: true
  },
  {
    title: 'हरे कृष्ण हरे राम महामंत्र — अखण्ड संकीर्तन ध्वनि (24 Hour Kirtan)',
    category: 'भजन',
    youtubeUrl: 'https://www.youtube.com/watch?v=e_4zWd3Xj-I',
    videoId: 'e_4zWd3Xj-I',
    description: 'मन को असीम शांति एवं एकाग्रता प्रदान करने वाला दिव्य महामंत्र संकीर्तन।',
    isFeatured: true
  },
  {
    title: 'किशोरी कुछ ऐसा इंतज़ाम हो जाए — श्री राधा रानी भजन',
    category: 'भजन',
    youtubeUrl: 'https://www.youtube.com/watch?v=s7z41Z8Hq6A',
    videoId: 's7z41Z8Hq6A',
    description: 'रसिकाचार्यों द्वारा रचित अत्यंत लोकप्रिय एवं हृदयस्पर्शी श्री राधा प्रार्थना भजन।',
    isFeatured: true
  },
  {
    title: 'राधे राधे जपो चले आएंगे बिहारी — पावन संकीर्तन',
    category: 'भजन',
    youtubeUrl: 'https://www.youtube.com/watch?v=f6UvVbLp1t4',
    videoId: 'f6UvVbLp1t4',
    description: 'वृन्दावन की गलियों में गूंजने वाला सर्वप्रिय राधा नाम महासंकीर्तन।',
    isFeatured: false
  },

  // 3. प्रवचन
  {
    title: 'श्रीमद्भागवत कथा — भक्ति, ज्ञान और वैराग्य का सार (अमृत वचन)',
    category: 'प्रवचन',
    youtubeUrl: 'https://www.youtube.com/watch?v=kYJ3sWpT4_U',
    videoId: 'kYJ3sWpT4_U',
    description: 'पूज्य संतों द्वारा सरल एवं व्यावहारिक भाषा में समझाया गया भागवत महापुराण का गूढ़ रहस्य।',
    isFeatured: false
  },
  {
    title: 'श्री राधा नाम की महिमा और नाम जप की अलौकिक शक्ति',
    category: 'प्रवचन',
    youtubeUrl: 'https://www.youtube.com/watch?v=d3XjWv7Kq6Y',
    videoId: 'd3XjWv7Kq6Y',
    description: 'कलिकाल में केवल नाम जप ही जीवन को पार लगाने वाली परम नौका है - संतों के प्रेरक विचार।',
    isFeatured: false
  },
  {
    title: 'कर्म योग एवं निष्काम सेवा: भगवद्गीता के अनमोल सूत्र',
    category: 'प्रवचन',
    youtubeUrl: 'https://www.youtube.com/watch?v=m6V8xL4K7pQ',
    videoId: 'm6V8xL4K7pQ',
    description: 'दैनिक जीवन में बिना फल की चिंता किए सेवा और कर्तव्य पालन कैसे करें।',
    isFeatured: false
  },

  // 4. सत्संग
  {
    title: 'गौ सेवा की महिमा एवं सनातन संस्कृति में इसका स्थान',
    category: 'सत्संग',
    youtubeUrl: 'https://www.youtube.com/watch?v=Xz2x1k9g7m8',
    videoId: 'Xz2x1k9g7m8',
    description: 'गौ माता के संरक्षण, संवर्धन एवं आध्यात्मिक महत्व पर संतों द्वारा विशेष उद्बोधन।',
    isFeatured: false
  },
  {
    title: 'नित्य साधना, ध्यान एवं अंतःकरण शुद्धि के सरल उपाय',
    category: 'सत्संग',
    youtubeUrl: 'https://www.youtube.com/watch?v=p1L2v7X4K8q',
    videoId: 'p1L2v7X4K8q',
    description: 'आश्रम सत्संग भवन में आयोजित दैनिक ध्यान एवं प्राणायाम सत्र का विशेष अंश।',
    isFeatured: false
  },

  // 5. धार्मिक कार्यक्रम
  {
    title: 'श्री गिरिराज गोवर्धन 21 किमी दिव्य परिक्रमा दर्शन',
    category: 'धार्मिक कार्यक्रम',
    youtubeUrl: 'https://www.youtube.com/watch?v=n5K8xL2v9t4',
    videoId: 'n5K8xL2v9t4',
    description: 'गोवर्धन धाम में मानसी गंगा, दानघाटी, कुसुम सरोवर एवं पूँछरी का लौठा दर्शन।',
    isFeatured: false
  },
  {
    title: 'बरसाना श्री लाडली जी मंदिर दिव्य दर्शन एवं उत्सव झांकी',
    category: 'धार्मिक कार्यक्रम',
    youtubeUrl: 'https://www.youtube.com/watch?v=w9V2kL7X4q1',
    videoId: 'w9V2kL7X4q1',
    description: 'ब्रज मंडल के पावन बरसाना धाम में श्री राधा रानी के महल का अलौकिक दृश्य।',
    isFeatured: false
  }
];

const seedVideos = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/radhakripamandal';
    await mongoose.connect(mongoUri, { family: 4, serverSelectionTimeoutMS: 20000 });
    console.log('🌸 Connected to MongoDB...');

    await Video.deleteMany({});
    console.log('🧹 Existing videos cleared.');

    await Video.insertMany(videosData);
    console.log(`✅ Successfully inserted ${videosData.length} spiritual videos across all categories!`);

    const count = await Video.countDocuments();
    console.log(`📊 Total videos now in collection: ${count}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding videos:', error);
    process.exit(1);
  }
};

seedVideos();
