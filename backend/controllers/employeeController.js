import Employee from "../models/Employee.js";
import logger from "../utils/logger.js";

// ✅ Yeni Çalışan Ekleme
export const createEmployee = async (req, res, next) => {
  try {
    const { name, phone, assignedApartments, tasks } = req.body;

    const employee = await Employee.create({
      name,
      phone,
      assignedApartments,
      tasks,
    });

    logger.info(`👷 Yeni çalışan eklendi: ${employee.name} (${employee._id})`);
    res.status(201).json(employee);
  } catch (error) {
    logger.error(`❌ Çalışan eklenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Tüm Çalışanları Getirme
export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find()
      .populate("assignedApartments", "name address")
      .populate("tasks", "description status");

    logger.info(`📋 ${employees.length} çalışan listelendi.`);
    res.json(employees);
  } catch (error) {
    logger.error(`❌ Çalışanlar getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Tek Bir Çalışanı Getirme
export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("assignedApartments", "name address")
      .populate("tasks", "description status");

    if (!employee) {
      logger.warn(`⚠️ Çalışan bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Çalışan bulunamadı." });
    }

    logger.info(`👷 Çalışan getirildi: ${employee.name} (${employee._id})`);
    res.json(employee);
  } catch (error) {
    logger.error(`❌ Çalışan getirilirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Çalışanı Güncelleme
export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      logger.warn(`⚠️ Güncellenmek istenen çalışan bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Çalışan bulunamadı." });
    }

    const { name, phone, assignedApartments, tasks } = req.body;

    employee.name = name || employee.name;
    employee.phone = phone || employee.phone;
    employee.assignedApartments = assignedApartments || employee.assignedApartments;
    employee.tasks = tasks || employee.tasks;

    await employee.save();
    logger.info(`✏️ Çalışan güncellendi: ${employee.name} (${employee._id})`);
    res.json(employee);
  } catch (error) {
    logger.error(`❌ Çalışan güncellenirken hata oluştu: ${error.message}`);
    next(error);
  }
};

// ✅ Çalışanı Silme
export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      logger.warn(`⚠️ Silinmek istenen çalışan bulunamadı: ${req.params.id}`);
      return res.status(404).json({ message: "Çalışan bulunamadı." });
    }

    await employee.deleteOne();
    logger.info(`🗑️ Çalışan silindi: ${employee.name} (${employee._id})`);
    res.json({ message: "Çalışan başarıyla silindi." });
  } catch (error) {
    logger.error(`❌ Çalışan silinirken hata oluştu: ${error.message}`);
    next(error);
  }
};
