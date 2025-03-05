import logger from "../utils/logger.js";

// 404 Hata Yönetimi
export const notFound = (req, res, next) => {
  const error = new Error(`❌ ${req.originalUrl} bulunamadı!`);
  res.status(404);
  next(error);
};

// Genel Hata Yönetimi
export const errorHandler = (err, req, res, next) => {
  logger.error(`🚨 ${req.method} ${req.originalUrl} - ${err.message}`);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Sunucu Hatası",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // stack bilgisini production'da gizle
  });
};
