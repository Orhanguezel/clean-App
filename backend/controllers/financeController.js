import Finance from "../models/Finance.js";

// ✅ Yeni Gelir/Gider Kaydı Ekleme
export const createFinanceRecord = async (req, res) => {
  try {
    const { type, amount, description, date } = req.body;

    const finance = await Finance.create({
      type,
      amount,
      description,
      date,
    });

    res.status(201).json(finance);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Tüm Gelir-Gider Kayıtlarını Getirme
export const getAllFinanceRecords = async (req, res) => {
  try {
    const records = await Finance.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Tek Bir Finans Kaydını Getirme
export const getFinanceRecordById = async (req, res) => {
  try {
    const record = await Finance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Finans kaydı bulunamadı." });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Finans Kaydını Güncelleme
export const updateFinanceRecord = async (req, res) => {
  try {
    const record = await Finance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Finans kaydı bulunamadı." });
    }

    const { type, amount, description, date } = req.body;

    record.type = type || record.type;
    record.amount = amount || record.amount;
    record.description = description || record.description;
    record.date = date || record.date;

    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Finans Kaydını Silme
export const deleteFinanceRecord = async (req, res) => {
  try {
    const record = await Finance.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Finans kaydı bulunamadı." });
    }

    await record.deleteOne();
    res.json({ message: "Finans kaydı başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
