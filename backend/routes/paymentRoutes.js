import express from "express";
import { getUserPayments, createPayment, updatePaymentStatus } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserPayments); // Kullanıcının ödeme bilgilerini getir
router.post("/", protect, createPayment); // Yeni ödeme ekle
router.put("/:id", protect, updatePaymentStatus); // Ödeme durumunu güncelle

export default router;
