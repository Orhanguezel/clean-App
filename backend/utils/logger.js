import winston from "winston";
import path from "path";

// Log dosya yolları
const logDir = "logs";
const errorLog = path.join(logDir, "error.log");
const combinedLog = path.join(logDir, "combined.log");

// Winston Logger yapılandırması
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: errorLog, level: "error" }), // Hata logları
    new winston.transports.File({ filename: combinedLog }), // Tüm loglar
  ],
});

// Konsola da yazsın (sadece geliştirme ortamında)
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
