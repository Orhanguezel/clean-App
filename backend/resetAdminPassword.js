import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function resetAdminPassword() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB'ye bağlandı.");

    const newPassword = "Admin123!";
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne({ email: "admin@cleanapp.com" }, { $set: { password: hashedPassword } });

    console.log("🔄 Admin şifresi başarıyla güncellendi.");
  } catch (error) {
    console.error("❌ Şifre güncelleme hatası:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB bağlantısı kapatıldı.");
  }
}

resetAdminPassword();
