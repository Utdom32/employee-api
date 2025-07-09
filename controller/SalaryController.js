import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";


export const AddSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

    const netSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

    const salaryRecord = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary,
      payDate,
    });

    const savedSalary = await salaryRecord.save();
    return res.status(200).json({ success: true, salary: savedSalary });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Add Salary Server Error!" });
  }
};

export const getSalary = async (req, res) => {
  const { id, } = req.params
  try {
    const salary = await Salary.find({ employeeId: id }).populate("employeeId", { password: 0 })
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Get salary server error" });
  }
};

export const getSalaryById = async (req, res) => {
  try {
    const { id , role } = req.params;
    
    let salary;
    if (role === 'admin') {
      salary = await Salary.find({ employeeId: id }).populate("employeeId", 'employeeId');
    } else {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee._id }).populate("employeeId", 'employeeId');
    }
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Get salary server error' });
  }
};