import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";
import Leave from "../models/Leave.js";

export const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const totalDepartments = await Department.countDocuments();
        const totalSalaries = await Employee.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$salary" }
                }
            }                             
        ]);
        const employeeAppliedForLeave = await Leave.distinct('employeeId')
        const leaveStatus = await Leave.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])
        const LeaveSummary = {
            totalLeaves: leaveStatus.reduce((acc, curr) => acc + curr.count, 0),
            approvedLeaves: leaveStatus.find(item => item._id === 'Approved')?.count || 0,
            pendingLeaves: leaveStatus.find(item => item._id === 'Pending')?.count || 0,
            rejectedLeaves: leaveStatus.find(item => item._id === 'Rejected')?.count || 0
        }
        res.status(200).json({
            success: true,
            summary: {
                totalEmployees,
                totalDepartments,
                totalSalaries: totalSalaries.length > 0 ? totalSalaries[0].total : 0,
                employeeAppliedForLeave: employeeAppliedForLeave.length,
                leaveSummary: LeaveSummary
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Dashboard summary could not be fetched",
        });
    }
}