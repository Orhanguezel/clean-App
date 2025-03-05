import express from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Görev işlemleri
router.post("/", protect, createTask); // Yeni görev ekleme
router.get("/", protect, getAllTasks); // Tüm görevleri getirme
router.get("/:id", protect, getTaskById); // Tek bir görevi getirme
router.put("/:id", protect, updateTask); // Görevi güncelleme
router.delete("/:id", protect, deleteTask); // Görevi silme

export default router;
