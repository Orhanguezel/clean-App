import express from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createNotification).get(protect, getUserNotifications);
router.route("/:id").put(protect, markNotificationAsRead);


export default router;
