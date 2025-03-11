import express from "express";
import { getUserPayments, createPayment, updatePaymentStatus } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getUserPayments).post(protect, createPayment);
router.route("/:id").put(protect, updatePaymentStatus);

export default router;
