import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import routes from "./routes/index.js"; // Tüm API rotalarını yönetecek dosya
import setupSwagger from "./config/swagger.js";
import { requestLogger } from "./middlewares/loggerMiddleware.js";
import logger from "./utils/logger.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js"; // Hata yönetimi middleware

dotenv.config();

// MongoDB Bağlantısını Başlat
connectDB();

// Express uygulamasını başlat
const app = express();

// Middleware'ler
app.use(express.json()); // JSON veri kullanımı
app.use(cors()); // CORS izinleri
app.use(helmet()); // Güvenlik için
app.use(morgan("dev")); // HTTP logları
app.use(requestLogger); // Loglama middleware

// Tüm API rotaları için yönlendirme
app.use("/api", routes);

// Ana route
app.get("/", (req, res) => {
  res.send("Clean-App Backend API Çalışıyor...");
});

// Swagger Dokümantasyonu
setupSwagger(app);
logger.info(`📚 Swagger belgeleri hazır: http://localhost:5000/api-docs`);
console.log(`📚 Swagger belgeleri hazır: http://localhost:5000/api-docs`);

// ❌ 404 Middleware (Geçersiz Rotalar için)
app.use(notFound);

// 🚨 Hata Yönetimi Middleware (Tüm hatalar burada yakalanır)
app.use(errorHandler);

// Sunucu başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server ${PORT} portunda çalışıyor...`);
  console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
});
