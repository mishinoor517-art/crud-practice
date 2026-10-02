import dns from "node:dns";
import mongoose from "mongoose";

// MongoDB Atlas SRV lookup ke liye public DNS use karein
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      family: 4,
    });
  
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

export default connectDB;