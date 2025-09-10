import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI not defined in environment variables');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      dbName: 'mern_eats',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};
