import Payment from "../models/Payment.js";
import logger from "../utils/logger.js";

// ✅ Kullanıcının Ödeme Durumlarını Getir
export const getUserPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate("apartment", "name address");

    if (!payments.length) {
      logger.warn(`⚠️ Kullanıcının ödeme kaydı bulunmamaktadır: ${req.user._id}`);
      return res.status(404).json({ message: "Ödeme kaydınız bulunmamaktadır." });
    }

    logger.info(`💳 ${payments.length} ödeme kaydı getirildi - Kullanıcı: ${req.user._id}`);
    res.json(payments);
  } catch (error) {
    logger.error(`❌ Ödeme bilgileri getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Yeni Ödeme Kaydı Ekleme
export const createPayment = async (req, res, next) => {
  try {
    const { user, apartment, amount, dueDate } = req.body;

    const payment = await Payment.create({
      user,
      apartment,
      amount,
      dueDate,
      status: "pending",
    });

    logger.info(`💰 Yeni ödeme kaydı oluşturuldu: ${amount}₺ - Kullanıcı: ${user}`);
    res.status(201).json(payment);
  } catch (error) {
    logger.error(`❌ Ödeme kaydı oluşturulurken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Ödeme Durumunu Güncelleme
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      logger.warn(`⚠️ Güncellenmek istenen ödeme kaydı bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Ödeme kaydı bulunamadı." });
    }

    payment.status = req.body.status || payment.status;
    await payment.save();
    logger.info(`✅ Ödeme durumu güncellendi: ${payment.amount}₺ - Yeni Durum: ${payment.status}`);
    res.json(payment);
  } catch (error) {
    logger.error(`❌ Ödeme durumu güncellenirken hata oluştu: ${error.message}`);
    next(error);
  }
};
