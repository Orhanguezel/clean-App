import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Çalışan işlemleri
router.post("/", protect, createEmployee); // Yeni çalışan ekleme
router.get("/", protect, getAllEmployees); // Tüm çalışanları getirme
router.get("/:id", protect, getEmployeeById); // Tek bir çalışanı getirme
router.put("/:id", protect, updateEmployee); // Çalışanı güncelleme
router.delete("/:id", protect, deleteEmployee); // Çalışanı silme

export default router;
