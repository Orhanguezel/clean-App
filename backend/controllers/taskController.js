import Task from "../models/Task.js";
import logger from "../utils/logger.js";

// ✅ Yeni Görev Ekleme
export const createTask = async (req, res, next) => {
  try {
    const { description, assignedTo, apartment, status, period } = req.body;

    const task = await Task.create({
      description,
      assignedTo,
      apartment,
      status,
      period,
    });

    logger.info(`📝 Yeni görev eklendi: ${description} - Atanan: ${assignedTo}`);
    res.status(201).json(task);
  } catch (error) {
    logger.error(`❌ Görev eklenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Tüm Görevleri Getirme
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("apartment", "name address");

    if (!tasks.length) {
      logger.warn(`⚠️ Hiç görev bulunmamaktadır.`);
      return res.status(404).json({ message: "Henüz görev bulunmamaktadır." });
    }

    logger.info(`📋 ${tasks.length} görev listelendi.`);
    res.json(tasks);
  } catch (error) {
    logger.error(`❌ Görevler getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Tek Bir Görevi Getirme
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("apartment", "name address");

    if (!task) {
      logger.warn(`⚠️ Görev bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Görev bulunamadı." });
    }

    logger.info(`📌 Görev getirildi: ${task.description} (${task._id})`);
    res.json(task);
  } catch (error) {
    logger.error(`❌ Görev getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Görevi Güncelleme
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      logger.warn(`⚠️ Güncellenmek istenen görev bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Görev bulunamadı." });
    }

    const { description, assignedTo, apartment, status, period } = req.body;

    task.description = description || task.description;
    task.assignedTo = assignedTo || task.assignedTo;
    task.apartment = apartment || task.apartment;
    task.status = status || task.status;
    task.period = period || task.period;

    await task.save();
    logger.info(`✏️ Görev güncellendi: ${task.description} (${task._id})`);
    res.json(task);
  } catch (error) {
    logger.error(`❌ Görev güncellenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Görevi Silme
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      logger.warn(`⚠️ Silinmek istenen görev bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Görev bulunamadı." });
    }

    await task.deleteOne();
    logger.info(`🗑️ Görev silindi: ${task.description} (${task._id})`);
    res.json({ message: "Görev başarıyla silindi." });
  } catch (error) {
    logger.error(`❌ Görev silinirken hata oluştu: ${error.message}`);
    next(error);
  }
};
