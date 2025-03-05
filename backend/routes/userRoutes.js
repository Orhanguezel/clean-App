import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Kullanıcı kayıt (Register)
router.post("/register", registerUser);

// Kullanıcı giriş (Login)
router.post("/login", loginUser);

// Kullanıcı profilini al (Sadece giriş yapan kullanıcı görebilir)
router.get("/profile", protect, getUserProfile);

// Kullanıcı profilini güncelle (Sadece giriş yapan kullanıcı güncelleyebilir)
router.put("/profile", protect, updateUserProfile);

export default router;
``
