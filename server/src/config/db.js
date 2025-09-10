import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI ;
  try {
    await mongoose.connect(uri, { dbName: 'mern_eats' });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err.message);
    process.exit(1);
  }
};
