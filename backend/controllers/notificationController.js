import Notification from "../models/Notification.js";

// ✅ Yeni Bildirim Oluşturma
export const createNotification = async (req, res) => {
  try {
    const { recipient, message } = req.body;

    const notification = await Notification.create({
      recipient,
      message,
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Kullanıcının Bildirimlerini Getirme
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Bildirimi Okundu Olarak İşaretleme
export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Bildirim bulunamadı." });
    }

    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
