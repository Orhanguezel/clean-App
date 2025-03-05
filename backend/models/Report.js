import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["finance", "task", "employee"], required: true }, // Rapor türü
    data: { type: Object, required: true }, // Rapor verileri JSON formatında saklanacak
    date: { type: Date, default: Date.now }, // Rapor oluşturulma tarihi
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);
export default Report;
