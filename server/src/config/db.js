import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  // Use .env variable or fallback to local MongoDB
  const uri = process.env.DB_URI;

  try {
    await mongoose.connect(uri, {
      dbName: "mern_eats", // database name
    });
    console.log("✅ MongoDB connected:", uri);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
