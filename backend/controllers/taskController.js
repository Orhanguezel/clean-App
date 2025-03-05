import Task from "../models/Task.js";

// ✅ Yeni Görev Ekleme
export const createTask = async (req, res) => {
  try {
    const { description, assignedTo, apartment, status, period } = req.body;

    const task = await Task.create({
      description,
      assignedTo,
      apartment,
      status,
      period,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Tüm Görevleri Getirme
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("apartment", "name address");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Tek Bir Görevi Getirme
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("apartment", "name address");

    if (!task) {
      return res.status(404).json({ message: "Görev bulunamadı." });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Görevi Güncelleme
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Görev bulunamadı." });
    }

    const { description, assignedTo, apartment, status, period } = req.body;

    task.description = description || task.description;
    task.assignedTo = assignedTo || task.assignedTo;
    task.apartment = apartment || task.apartment;
    task.status = status || task.status;
    task.period = period || task.period;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Görevi Silme
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Görev bulunamadı." });
    }

    await task.deleteOne();
    res.json({ message: "Görev başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
