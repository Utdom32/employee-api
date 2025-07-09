import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

export const AddEmployee = async (req, res) => {
  const {
    name,
    email,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary,
    password,
    role,
    phoneNumber,
  } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
      phoneNumber,
    });
    const savedUser = await newUser.save();
    // Create employee
    const employee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    const savedEmployee = await employee.save();
    console.log(savedEmployee);
    return res.status(200).json({
      success: true,
      message: "Employee created successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({
      success: true,
      employees
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: "Server error in fetching employees" });
  }
}

export const getEmployeeById = async (req, res) => {

  try {
    let employee;
    const { id } = req.params;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department")
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department")
    }
    return res.status(200).json({ success: true, employee })
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error in fetching employee" })
  }
}


export const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob, gender, maritalStatus, designation, department, salary, role, phoneNumber } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res.
        status(404)
        .json({ success: false, error: "Employee not found." });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "User not found." });
    }
    const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, {
      name,
      role,
      phoneNumber
    })
    const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, {
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary
    })
    if (!updateUser || !updateEmployee) {
      return res.status(404).json({ success: false, error: "Document not found." })
    }
    return res.status(200).json({ success: true, message: "Employee updated successfully", employee: updateEmployee });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Update employee server error." })
  }
}

export const fetchEmployeeByDepId = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({ department: id })
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server error in fetching employee by Department ID" });
  }
}