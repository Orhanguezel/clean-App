import mongoose from "mongoose";

const FinanceSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Finance = mongoose.model("Finance", FinanceSchema);
export default Finance;
