import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Yorumu yapan kullanıcı
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: "Apartment", required: true }, // Hangi apartman için yapıldığı
    content: { type: String, required: true }, // Yorum içeriği
    rating: { type: Number, min: 1, max: 5 }, // 1-5 arasında puanlama
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
