import express from "express";
import {
  createComment,
  getCommentsByApartment,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createComment); // Yeni yorum ekleme
router.get("/:apartmentId", protect, getCommentsByApartment); // Belirli bir apartmanın yorumlarını alma
router.delete("/:id", protect, deleteComment); // Yorumu silme (sadece admin)

export default router;
