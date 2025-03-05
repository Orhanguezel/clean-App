import Employee from "../models/Employee.js";

// ✅ Yeni Çalışan Ekleme
export const createEmployee = async (req, res) => {
  try {
    const { name, phone, assignedApartments, tasks } = req.body;

    const employee = await Employee.create({
      name,
      phone,
      assignedApartments,
      tasks,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Tüm Çalışanları Getirme
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("assignedApartments", "name address")
      .populate("tasks", "description status");

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Tek Bir Çalışanı Getirme
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("assignedApartments", "name address")
      .populate("tasks", "description status");

    if (!employee) {
      return res.status(404).json({ message: "Çalışan bulunamadı." });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Çalışanı Güncelleme
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Çalışan bulunamadı." });
    }

    const { name, phone, assignedApartments, tasks } = req.body;

    employee.name = name || employee.name;
    employee.phone = phone || employee.phone;
    employee.assignedApartments = assignedApartments || employee.assignedApartments;
    employee.tasks = tasks || employee.tasks;

    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// ✅ Çalışanı Silme
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Çalışan bulunamadı." });
    }

    await employee.deleteOne();
    res.json({ message: "Çalışan başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
