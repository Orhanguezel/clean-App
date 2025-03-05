import express from "express";
import userRoutes from "./userRoutes.js";
import apartmentRoutes from "./apartmentRoutes.js";
import taskRoutes from "./taskRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import financeRoutes from "./financeRoutes.js";
import commentRoutes from "./commentRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import reportRoutes from "./reportRoutes.js";
import paymentRoutes from "./paymentRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/apartments", apartmentRoutes);
router.use("/tasks", taskRoutes);
router.use("/employees", employeeRoutes);
router.use("/finance", financeRoutes);
router.use("/comments", commentRoutes);
router.use("/notifications", notificationRoutes);
router.use("/reports", reportRoutes);
router.use("/payments", paymentRoutes);

export default router;


