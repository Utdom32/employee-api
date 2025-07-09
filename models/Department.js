import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";

const DepartmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
DepartmentSchema.pre("deleteOne", {document: true, query : false},  async function(next) {
  try {
    const employees = await Employee.find({ department: this._id})
    const emplIds = employees.map(emp => emp._id);

     await Employee.deleteMany({ department: this._id });
     await Leave.deleteMany({ employeeId: { $in: emplIds } });
     await Salary.deleteMany({ employeeId: { $in: emplIds } });
     

    // await Promise.all([
    //   Employee.deleteMany({ department: this._id }),
    //   Leave.deleteMany({ employeeId: { $in: emplIds } }),
    //   Salary.deleteMany({ employeeId: { $in: emplIds } }),
    //   Employee.deleteMany({ userId: { $in: emplIds } }),
    // ]);

    next();
  } catch (error) {
    next(error);
  }
});
const Department = mongoose.model("Department", DepartmentSchema);

export default Department;
