import mongoose from 'mongoose';

let isDbConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('\n⚠️ [Database Warning] MONGODB_URI is not defined in backend/.env.');
    console.warn('Backend will run in resilient local fallback mode.');
    console.warn('To connect to MongoDB Atlas, add your connection string to backend/.env.\n');
    isDbConnected = false;
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    isDbConnected = true;
    console.log(`\n🍃 [MongoDB Connected] Host: ${conn.connection.host}, Database: ${conn.connection.name}\n`);
    return true;
  } catch (error) {
    isDbConnected = false;
    console.warn('\n⚠️ [MongoDB Connection Notice]');
    console.warn(`Could not connect to MongoDB at "${uri}".`);
    console.warn(`Reason: ${error.message}`);
    console.warn('The API will remain online and serve data gracefully.\n');
    return false;
  }
};

export const getDbStatus = () => ({
  connected: isDbConnected,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host || null,
  name: mongoose.connection.name || null,
});
