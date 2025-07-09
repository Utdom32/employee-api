import Department from "../models/Department.js"

export const addDepartment = async (req,res) => {
try {
    const {dep_name, description} = req.body
    const newDep = new Department({
        dep_name,
        description
    })
await newDep.save()
return res.status(200).json({success: true, department: newDep})
} catch (error) {
    return res.status(500).json({success: false, error : "Add department server error"})
}
}

export const getDepartment = async (req,res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({sucess:true, departments})
    } catch (error) {
        return res.status(500).json({sucess:false , error: "Server Error!"})
    }
}

export const editDepartment = async (req,res) => {
    try {
        const {id} = req.params
        const department = await Department.findById({_id:id})
        console.log(department)
        return res.status(200).json({sucess:true, department})
    } catch (error) {
        return res.status(500).json({sucess: false, error: "Edit department server error."})
    }
}

export const UpdateDepartment = async (req,res) => {
    try {
        const {id} =req.params;
        const {dep_name, description} = req.body;
        const department = await Department.findByIdAndUpdate({_id:id},{
            dep_name,
            description
        })
        res.status(200).json({sucess: true, department})
    } catch (error) {
     return res.status(500).json({sucess: false, error:"Update department server error."})   
    }
}

export const RemoveDepartment = async (req,res) => {
    try {
        const {id} = req.params;
        const depId = await Department.findById({ _id:id })
        await depId.deleteOne()
        return res.status(200).json({sucess: true, depId , message: "Department deleted successfully."})
    } catch (error) {
        return res.status(500).json({sucess: false, error: "Delete department server error.."})
    }
}