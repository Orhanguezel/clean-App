import Finance from "../models/Finance.js";
import logger from "../utils/logger.js";

// ✅ Yeni Gelir/Gider Kaydı Ekleme
export const createFinanceRecord = async (req, res, next) => {
  try {
    const { type, amount, description, date } = req.body;

    const finance = await Finance.create({
      type,
      amount,
      description,
      date,
    });

    logger.info(`💰 Yeni finans kaydı eklendi: ${type} - ${amount}₺ (${finance._id})`);
    res.status(201).json(finance);
  } catch (error) {
    logger.error(`❌ Finans kaydı eklenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Tüm Gelir-Gider Kayıtlarını Getirme
export const getAllFinanceRecords = async (req, res, next) => {
  try {
    const records = await Finance.find();

    if (!records.length) {
      logger.warn(`⚠️ Henüz finans kaydı bulunmamaktadır.`);
      return res.status(404).json({ message: "Henüz finans kaydı bulunmamaktadır." });
    }

    logger.info(`📊 ${records.length} finans kaydı listelendi.`);
    res.json(records);
  } catch (error) {
    logger.error(`❌ Finans kayıtları getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Tek Bir Finans Kaydını Getirme
export const getFinanceRecordById = async (req, res, next) => {
  try {
    const record = await Finance.findById(req.params.id);

    if (!record) {
      logger.warn(`⚠️ Finans kaydı bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Finans kaydı bulunamadı." });
    }

    logger.info(`📊 Finans kaydı getirildi: ${record.type} - ${record.amount}₺ (${record._id})`);
    res.json(record);
  } catch (error) {
    logger.error(`❌ Finans kaydı getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Finans Kaydını Güncelleme
export const updateFinanceRecord = async (req, res, next) => {
  try {
    const record = await Finance.findById(req.params.id);

    if (!record) {
      logger.warn(`⚠️ Güncellenmek istenen finans kaydı bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Finans kaydı bulunamadı." });
    }

    const { type, amount, description, date } = req.body;

    record.type = type || record.type;
    record.amount = amount || record.amount;
    record.description = description || record.description;
    record.date = date || record.date;

    await record.save();
    logger.info(`✏️ Finans kaydı güncellendi: ${record.type} - ${record.amount}₺ (${record._id})`);
    res.json(record);
  } catch (error) {
    logger.error(`❌ Finans kaydı güncellenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Finans Kaydını Silme
export const deleteFinanceRecord = async (req, res, next) => {
  try {
    const record = await Finance.findById(req.params.id);

    if (!record) {
      logger.warn(`⚠️ Silinmek istenen finans kaydı bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Finans kaydı bulunamadı." });
    }

    await record.deleteOne();
    logger.info(`🗑️ Finans kaydı silindi: ${record.type} - ${record.amount}₺ (${record._id})`);
    res.json({ message: "Finans kaydı başarıyla silindi." });
  } catch (error) {
    logger.error(`❌ Finans kaydı silinirken hata oluştu: ${error.message}`);
    next(error);
  }
};
