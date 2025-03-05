import express from "express";
import {
  createFinanceRecord,
  getAllFinanceRecords,
  getFinanceRecordById,
  updateFinanceRecord,
  deleteFinanceRecord,
} from "../controllers/financeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Gelir-Gider işlemleri
router.post("/", protect, createFinanceRecord); // Yeni finans kaydı ekleme
router.get("/", protect, getAllFinanceRecords); // Tüm finans kayıtlarını getirme
router.get("/:id", protect, getFinanceRecordById); // Tek bir finans kaydını getirme
router.put("/:id", protect, updateFinanceRecord); // Finans kaydını güncelleme
router.delete("/:id", protect, deleteFinanceRecord); // Finans kaydını silme

export default router;
