import Notification from "../models/Notification.js";
import logger from "../utils/logger.js";

// ✅ Yeni Bildirim Oluşturma
export const createNotification = async (req, res, next) => {
  try {
    const { recipient, message } = req.body;

    const notification = await Notification.create({
      recipient,
      message,
    });

    logger.info(`🔔 Yeni bildirim oluşturuldu: ${message} - Alıcı: ${recipient}`);
    res.status(201).json(notification);
  } catch (error) {
    logger.error(`❌ Bildirim oluşturulurken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Kullanıcının Bildirimlerini Getirme
export const getUserNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id });

    if (!notifications.length) {
      logger.warn(`⚠️ Kullanıcının bildirimi bulunmamaktadır: ${req.user._id}`);
      return res.status(404).json({ message: "Henüz bildiriminiz bulunmamaktadır." });
    }

    logger.info(`📩 ${notifications.length} bildirim getirildi - Kullanıcı: ${req.user._id}`);
    res.json(notifications);
  } catch (error) {
    logger.error(`❌ Bildirimler getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Bildirimi Okundu Olarak İşaretleme
export const markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      logger.warn(`⚠️ Okundu olarak işaretlenmek istenen bildirim bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Bildirim bulunamadı." });
    }

    notification.isRead = true;
    await notification.save();
    logger.info(`✅ Bildirim okundu olarak işaretlendi: ${notification.message} (${notification._id})`);
    res.json(notification);
  } catch (error) {
    logger.error(`❌ Bildirim okundu olarak işaretlenirken hata oluştu: ${error.message}`);
    next(error);
  }
};
