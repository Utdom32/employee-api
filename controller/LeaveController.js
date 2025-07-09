import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

export const AddLeaveRequest = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;
        // Check if the employee exists
        const employee = await Employee.findOne({userId});
       
        // Create a new leave request
        const newLeave = new Leave({
        employeeId: employee._id,
        leaveType,
        startDate,
        endDate,
        reason,
        });
    
        await newLeave.save();
       return res.status(200).json({ success: true, message: "Leave request created successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
}
export const GetLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name"
                }
            ]
        });
        return res.status(200).json({ success: true, leave: leaveRequests });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

export const GetLeaveRequestById = async (req, res) => {
    try {
        const { id,role } = req.params;
        let leaves;
        if( role === "admin") {
            leaves = await Leave.find({ employeeId: id})
        } else {
                const employee = await Employee.findOne({userId: id});
                leaves = await Leave.find({ employeeId: employee._id })
        }
        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        return res.status(500).json({ success: false, error: "fetch leave server error" });
    }
}


export const GetLeaveDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findById(id).populate({
            path: "employeeId",
            populate: [
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: {"name": 1, "profileImage":1}

                }
            ]
        });
        console.log(leave);
        return res.status(200).json({ success: true, leave });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
        
    }
}

export const UpdateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Find the leave request by ID
        const leaveRequest = await Leave.findById(id);
        if (!leaveRequest) {
            return res.status(404).json({ success: false, error: "Leave request not found" });
        }

        // Update the status of the leave request
        leaveRequest.status = status;
        await leaveRequest.save();

        return res.status(200).json({ success: true, message: "Leave request status updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

// export const UpdateLeaveStuss = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const leave = await Leave.findByIdAndUpdate({ _id: id}, {status: req.body.status})
//         if (!leave) {
//             return res.status(404).json({ success: false, error: "Leave request not found" });
//         }
//         return res.status(200).json({ success: true, message: "Leave request updated successfully" });
//     } catch (error) {
//         return res.status(500).json({ success: false, error: "Internal server error" });
        
//     }
// } // ! This function is not used in the current codebase, so it can be removed or commented out 