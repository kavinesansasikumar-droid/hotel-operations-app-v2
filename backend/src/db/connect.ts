// Inside src/db/connect.ts
import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    // It likely uses process.env to grab the string from your .env file
    const connString = process.env.MONGO_URI || 'mongodb://localhost:27017/hotel-operations-app'; 
    
    await mongoose.connect(connString);
    console.log('Successfully connected to MongoDB via Mongoose!');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};