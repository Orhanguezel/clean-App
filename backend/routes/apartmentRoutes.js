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
router.route("/").post(protect, createApartment).get(protect, getAllApartments);
router
  .route("/:id")
  .get(protect, getApartmentById)
  .put(protect, updateApartment)
  .delete(protect, deleteApartment);

export default router;
