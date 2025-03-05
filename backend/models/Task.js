import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment" },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    period: { type: String, enum: ["daily", "weekly", "bi-weekly"], required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
