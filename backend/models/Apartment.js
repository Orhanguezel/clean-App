import mongoose from "mongoose";

const ApartmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    blockCount: { type: Number, default: 1 },
    floorCount: { type: Number, default: 1 },
    cleaningPeriod: { type: String, enum: ["weekly", "bi-weekly", "monthly"], required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Apartment = mongoose.model("Apartment", ApartmentSchema);
export default Apartment;
