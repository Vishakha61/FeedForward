import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';

dotenv.config();

const SEED_USERS = [
  {
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
    phone: '9876543200',
    address: 'HQ, Tech Park',
    city: 'Mumbai',
    state: 'Maharashtra',
  },
  {
    name: 'Rahul Sharma',
    email: 'rahul@demo.com',
    password: 'demo123',
    role: 'donor',
    phone: '9876543210',
    address: '42, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
  },
  {
    name: 'Hope Foundation',
    email: 'hope@demo.com',
    password: 'demo123',
    role: 'ngo',
    organization: 'Hope Foundation NGO',
    phone: '9876543211',
    address: '15, Park Street',
    city: 'Delhi',
    state: 'Delhi',
  },
  {
    name: 'Priya Patel',
    email: 'priya@demo.com',
    password: 'demo123',
    role: 'recipient',
    phone: '9876543212',
    address: '78, Civil Lines',
    city: 'Bangalore',
    state: 'Karnataka',
  },
];

async function seed() {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/feedforward';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    for (const userData of SEED_USERS) {
      const exists = await User.findOne({ email: userData.email });
      if (exists) {
        console.log(`⏭️  User already exists: ${userData.email} (${userData.role})`);
      } else {
        await User.create(userData);
        console.log(`✅ Created user: ${userData.email} (${userData.role})`);
      }
    }

    console.log('\n🎉 Seeding complete! You can now login with:');
    console.log('   Admin:     admin@demo.com / admin123');
    console.log('   Donor:     rahul@demo.com / demo123');
    console.log('   NGO:       hope@demo.com / demo123');
    console.log('   Recipient: priya@demo.com / demo123');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
