import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      authSource: "admin", // Kimlik doğrulama için admin DB kullan
    });

    console.log(`✅ MongoDB Bağlandı: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Bağlantı Hatası: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
