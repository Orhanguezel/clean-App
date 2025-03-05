import Comment from "../models/Comment.js";

// ✅ Yeni Yorum Ekleme
export const createComment = async (req, res) => {
  try {
    const { apartment, content, rating } = req.body;

    const comment = await Comment.create({
      user: req.user._id,
      apartment,
      content,
      rating,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Belirli Bir Apartmanın Yorumlarını Getirme
export const getCommentsByApartment = async (req, res) => {
  try {
    const comments = await Comment.find({ apartment: req.params.apartmentId }).populate("user", "name email");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Yorumu Silme (Sadece Admin)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Yorum bulunamadı." });
    }

    await comment.deleteOne();
    res.json({ message: "Yorum başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
