import Finance from "../models/Finance.js";
import Task from "../models/Task.js";
import Employee from "../models/Employee.js";

// ✅ Gelir-Gider Raporu Oluşturma
export const generateFinanceReport = async (req, res) => {
  try {
    const income = await Finance.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    const expense = await Finance.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);

    res.json({
      totalIncome: income[0]?.totalIncome || 0,
      totalExpense: expense[0]?.totalExpense || 0,
      netProfit: (income[0]?.totalIncome || 0) - (expense[0]?.totalExpense || 0),
    });
  } catch (error) {
    res.status(500).json({ message: "Finans raporu oluşturulamadı.", error: error.message });
  }
};

// ✅ Görev Durumu Raporu Oluşturma
export const generateTaskReport = async (req, res) => {
  try {
    const completedTasks = await Task.countDocuments({ status: "completed" });
    const pendingTasks = await Task.countDocuments({ status: "pending" });
    const inProgressTasks = await Task.countDocuments({ status: "in-progress" });

    res.json({
      completedTasks,
      pendingTasks,
      inProgressTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Görev raporu oluşturulamadı.", error: error.message });
  }
};

// ✅ Çalışan Performans Raporu
export const generateEmployeeReport = async (req, res) => {
  try {
    const employees = await Employee.find().populate("tasks");

    const employeeStats = employees.map((emp) => ({
      name: emp.name,
      totalTasks: emp.tasks.length,
      completedTasks: emp.tasks.filter((task) => task.status === "completed").length,
    }));

    res.json(employeeStats);
  } catch (error) {
    res.status(500).json({ message: "Çalışan raporu oluşturulamadı.", error: error.message });
  }
};

// ✅ Aylık Bazlı Finansal Rapor
export const generateMonthlyFinanceReport = async (req, res) => {
    try {
      const { year, month } = req.query;
  
      if (!year || !month) {
        return res.status(400).json({ message: "Yıl ve ay parametreleri gereklidir." });
      }
  
      const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
      const endDate = new Date(`${year}-${month}-31T23:59:59.999Z`);
  
      const income = await Finance.aggregate([
        { $match: { type: "income", date: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
      ]);
  
      const expense = await Finance.aggregate([
        { $match: { type: "expense", date: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
      ]);
  
      res.json({
        year,
        month,
        totalIncome: income[0]?.totalIncome || 0,
        totalExpense: expense[0]?.totalExpense || 0,
        netProfit: (income[0]?.totalIncome || 0) - (expense[0]?.totalExpense || 0),
      });
    } catch (error) {
      res.status(500).json({ message: "Aylık finans raporu oluşturulamadı.", error: error.message });
    }
  };

  // ✅ Görev Analiz Raporu
export const generateTaskAnalysisReport = async (req, res) => {
    try {
      const totalTasks = await Task.countDocuments();
      const completedTasks = await Task.countDocuments({ status: "completed" });
      const pendingTasks = await Task.countDocuments({ status: "pending" });
      const inProgressTasks = await Task.countDocuments({ status: "in-progress" });
  
      const mostFrequentTasks = await Task.aggregate([
        { $group: { _id: "$description", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]);
  
      res.json({
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        completionRate: totalTasks ? (completedTasks / totalTasks) * 100 : 0,
        mostFrequentTasks,
      });
    } catch (error) {
      res.status(500).json({ message: "Görev analiz raporu oluşturulamadı.", error: error.message });
    }
  };
  
  
