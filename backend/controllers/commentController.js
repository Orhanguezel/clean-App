import Comment from "../models/Comment.js";
import logger from "../utils/logger.js";

// ✅ Yeni Yorum Ekleme
export const createComment = async (req, res, next) => {
  try {
    const { apartment, content, rating } = req.body;

    const comment = await Comment.create({
      user: req.user._id,
      apartment,
      content,
      rating,
    });

    logger.info(`💬 Yeni yorum eklendi: Apartman ${apartment} - Kullanıcı: ${req.user._id}`);
    res.status(201).json(comment);
  } catch (error) {
    logger.error(`❌ Yorum eklenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Belirli Bir Apartmanın Yorumlarını Getirme
export const getCommentsByApartment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ apartment: req.params.apartmentId }).populate("user", "name email");

    if (!comments.length) {
      logger.warn(`⚠️ Apartman ${req.params.apartmentId} için yorum bulunamadı.`);
      return res.status(404).json({ message: "Bu apartmana ait yorum bulunamadı." });
    }

    logger.info(`📜 Apartman ${req.params.apartmentId} için ${comments.length} yorum getirildi.`);
    res.json(comments);
  } catch (error) {
    logger.error(`❌ Yorumlar getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Yorumu Silme (Sadece Admin)
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      logger.warn(`⚠️ Silinmek istenen yorum bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Yorum bulunamadı." });
    }

    await comment.deleteOne();
    logger.info(`🗑️ Yorum silindi: ${req.params.id} - Kullanıcı: ${comment.user}`);
    res.json({ message: "Yorum başarıyla silindi." });
  } catch (error) {
    logger.error(`❌ Yorum silinirken hata oluştu: ${error.message}`);
    next(error);
  }
};
