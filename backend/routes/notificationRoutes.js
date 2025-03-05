import express from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNotification); // Yeni bildirim oluşturma
router.get("/", protect, getUserNotifications); // Kullanıcının bildirimlerini getirme
router.put("/:id", protect, markNotificationAsRead); // Bildirimi okundu olarak işaretleme

export default router;
