import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Apartment from "./models/Apartment.js";
import Employee from "./models/Employee.js";
import Task from "./models/Task.js";
import Finance from "./models/Finance.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI; // MongoDB bağlantısı

async function seedDatabase() {
  try {
    // ✅ MongoDB'ye bağlan
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB'ye bağlanıldı.");

    // 1️⃣ **Admin Kullanıcısını Oluştur**
    const adminEmail = "admin@cleanapp.com";
    const adminPassword = "Admin123!";
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      adminUser = new User({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log("✅ Admin kullanıcı oluşturuldu.");
    }

    // 2️⃣ **Apartman Yöneticisi Oluştur**
    const managerEmail = "manager@cleanapp.com";
    const managerPassword = "Manager123!";
    let managerUser = await User.findOne({ email: managerEmail });

    if (!managerUser) {
      const hashedPassword = await bcrypt.hash(managerPassword, 10);
      managerUser = new User({
        name: "Apartman Yöneticisi",
        email: managerEmail,
        password: hashedPassword,
        role: "manager",
      });
      await managerUser.save();
      console.log("✅ Apartman yöneticisi oluşturuldu.");
    }

    // 3️⃣ **Örnek Apartman Ekle**
    let apartment = await Apartment.findOne({ name: "Yıldız Apartmanı" });

    if (!apartment) {
      apartment = new Apartment({
        name: "Yıldız Apartmanı",
        address: "İstanbul, Beşiktaş",
        blockCount: 2,
        floorCount: 10,
        cleaningPeriod: "weekly",
        manager: managerUser._id,
      });
      await apartment.save();
      console.log("✅ Örnek apartman oluşturuldu.");
    }

    // 4️⃣ **Çalışanlar Ekleyelim**
    const employeeEmail = "employee@cleanapp.com";
    const employeePassword = "Employee123!";
    let employeeUser = await User.findOne({ email: employeeEmail });

    if (!employeeUser) {
      const hashedPassword = await bcrypt.hash(employeePassword, 10);
      employeeUser = new User({
        name: "Ahmet Temizlikçi",
        email: employeeEmail,
        password: hashedPassword,
        role: "employee",
      });
      await employeeUser.save();
      console.log("✅ Çalışan kullanıcı oluşturuldu.");
    }

    let employee = await Employee.findOne({ name: "Ahmet Temizlikçi" });

    if (!employee) {
      employee = new Employee({
        name: "Ahmet Temizlikçi",
        phone: "0555 123 45 67",
        assignedApartments: [apartment._id],
        tasks: [],
      });
      await employee.save();
      console.log("✅ Çalışan eklendi.");
    }

    // 5️⃣ **Örnek Temizlik Görevi Ekle**
    let task = await Task.findOne({ description: "Merdiven Temizliği" });

    if (!task) {
      task = new Task({
        description: "Merdiven Temizliği",
        assignedTo: employee._id,
        apartment: apartment._id,
        status: "pending",
        period: "weekly",
      });
      await task.save();
      console.log("✅ Örnek temizlik görevi oluşturuldu.");
    }

    // 6️⃣ **Örnek Gelir-Gider Kaydı Ekleyelim**
    let incomeRecord = await Finance.findOne({ description: "Apartman Aidatı" });

    if (!incomeRecord) {
      incomeRecord = new Finance({
        type: "income",
        amount: 5000,
        description: "Apartman Aidatı",
        date: new Date(),
      });
      await incomeRecord.save();
      console.log("✅ Örnek gelir kaydı eklendi.");
    }

    let expenseRecord = await Finance.findOne({ description: "Temizlik Malzemesi" });

    if (!expenseRecord) {
      expenseRecord = new Finance({
        type: "expense",
        amount: 1500,
        description: "Temizlik Malzemesi",
        date: new Date(),
      });
      await expenseRecord.save();
      console.log("✅ Örnek gider kaydı eklendi.");
    }

    console.log("🎉 Başlangıç verileri başarıyla eklendi.");
  } catch (error) {
    console.error("❌ Veri ekleme/güncelleme hatası:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB bağlantısı kapatıldı.");
  }
}

// ✅ İşlemi başlat
seedDatabase();
