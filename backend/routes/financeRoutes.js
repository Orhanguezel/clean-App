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
router.route("/").post(protect, createFinanceRecord).get(protect, getAllFinanceRecords);
router
  .route("/:id")
  .get(protect, getFinanceRecordById)
  .put(protect, updateFinanceRecord)
  .delete(protect, deleteFinanceRecord);

export default router;
