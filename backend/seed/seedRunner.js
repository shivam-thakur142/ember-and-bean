import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import Reservation from '../models/Reservation.js';
import { seedMenuItems } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const runSeed = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in backend/.env');
    process.exit(1);
  }

  try {
    console.log(`⏳ Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri);
    console.log('✅ Connected successfully to MongoDB.');

    // Clear existing menu items
    const deletedMenu = await MenuItem.deleteMany({});
    console.log(`🧹 Cleared ${deletedMenu.deletedCount} existing menu items.`);

    // Insert seed menu items
    const insertedMenu = await MenuItem.insertMany(seedMenuItems);
    console.log(`☕ Successfully seeded ${insertedMenu.length} menu items.`);

    // Clear existing reservations and insert sample reservations if empty
    const reservationCount = await Reservation.countDocuments();
    if (reservationCount === 0) {
      const sampleReservations = [
        {
          name: 'Aarav Sharma',
          email: 'aarav.sharma@example.com',
          phone: '+91 98765 43210',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          time: '10:30 AM',
          guests: 2,
          message: 'Corner table by the window with good natural light please.',
          status: 'confirmed',
          bookingReference: 'EB-2026-9041',
        },
        {
          name: 'Meera Kapoor',
          email: 'meera.k@example.com',
          phone: '+91 98112 33445',
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          time: '04:00 PM',
          guests: 4,
          message: 'Celebrating a small architectural project milestone.',
          status: 'pending',
          bookingReference: 'EB-2026-8812',
        },
        {
          name: 'Vikram Singhania',
          email: 'vikram.s@example.com',
          phone: '+91 97654 11223',
          date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
          time: '07:30 PM',
          guests: 2,
          message: 'Would love to taste the single origin pour over flights.',
          status: 'confirmed',
          bookingReference: 'EB-2026-7321',
        },
      ];
      await Reservation.insertMany(sampleReservations);
      console.log('📅 Seeded 3 sample reservations for the admin dashboard.');
    }

    console.log('\n🎉 Database seeding completed successfully!\n');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

runSeed();
