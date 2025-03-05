import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Bildirimi alan kullanıcı
    message: { type: String, required: true }, // Bildirim içeriği
    isRead: { type: Boolean, default: false }, // Okundu mu?
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
