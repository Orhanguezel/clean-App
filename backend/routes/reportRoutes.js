import express from "express";
import {
  generateFinanceReport,
  generateTaskReport,
  generateEmployeeReport,
  generateMonthlyFinanceReport,
    generateTaskAnalysisReport
} from "../controllers/reportController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rapor oluşturma işlemleri
router.get("/finance", protect, generateFinanceReport); // Finansal rapor oluşturma
router.get("/tasks", protect, generateTaskReport); // Görev raporu oluşturma
router.get("/employees", protect, generateEmployeeReport); // Çalışan performans raporu oluşturma
router.get("/finance/monthly", protect, generateMonthlyFinanceReport);
router.get("/tasks/analysis", protect, generateTaskAnalysisReport);


export default router;
