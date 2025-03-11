import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createEmployee).get(protect, getAllEmployees);
router
  .route("/:id")
  .get(protect, getEmployeeById)
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);

export default router;
