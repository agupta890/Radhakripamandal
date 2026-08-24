const { execSync } = require('child_process');

console.log('--- 1. Seeding radhakripamandal DB ---');
execSync('node seed/seedData.js', { stdio: 'inherit', env: { ...process.env, MONGO_URI: 'mongodb+srv://ansh890hh:Himi890@cluster0.3lvsxs5.mongodb.net/radhakripamandal?retryWrites=true&w=majority' } });

console.log('\n--- 2. Seeding test DB (active running instance) ---');
execSync('node seed/seedData.js', { stdio: 'inherit', env: { ...process.env, MONGO_URI: 'mongodb+srv://ansh890hh:Himi890@cluster0.3lvsxs5.mongodb.net/test?retryWrites=true&w=majority' } });

console.log('\n✨ Both database instances are fully seeded with all 14 videos, events, blogs, etc.!');
