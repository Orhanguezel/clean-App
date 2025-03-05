import Payment from "../models/Payment.js";

// ✅ Kullanıcının Ödeme Durumlarını Getir
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate("apartment", "name address");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Ödeme bilgileri getirilemedi.", error: error.message });
  }
};

// ✅ Yeni Ödeme Kaydı Ekleme
export const createPayment = async (req, res) => {
  try {
    const { user, apartment, amount, dueDate } = req.body;

    const payment = await Payment.create({
      user,
      apartment,
      amount,
      dueDate,
      status: "pending",
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Ödeme kaydı oluşturulamadı.", error: error.message });
  }
};

// ✅ Ödeme Durumunu Güncelleme
export const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Ödeme kaydı bulunamadı." });
    }

    payment.status = req.body.status || payment.status;
    await payment.save();
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Ödeme durumu güncellenemedi.", error: error.message });
  }
};
