import express from "express";
import {
  createApartment,
  getAllApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
} from "../controllers/apartmentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apartman işlemleri
router.post("/", protect, createApartment); // Apartman ekleme (sadece giriş yapmış kullanıcılar)
router.get("/", protect, getAllApartments); // Tüm apartmanları getirme
router.get("/:id", protect, getApartmentById); // Tek apartmanı getirme
router.put("/:id", protect, updateApartment); // Apartmanı güncelleme
router.delete("/:id", protect, deleteApartment); // Apartmanı silme

export default router;
