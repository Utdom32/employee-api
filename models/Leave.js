import mongoose , { Schema } from "mongoose";

const leaveSchema = new Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    leaveType: {
        type: String,
        enum: ["sick", "casual", "annual", "maternity", "paternity"],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true });

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;