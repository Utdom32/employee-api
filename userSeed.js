import User from "./models/User.js";
import bcrypt from "bcrypt";
import { connectDB } from "./db/db.js";

const userRegister = async () => {
await connectDB();
    try {
        const existingUser = await User.findOne({ email: "" });
        if (existingUser) {
            console.log("User already exists");
            return;
        }
        const hashedPassword = await bcrypt.hash("admin", 10);
        const newUser = new User({
            name: "choeun utdom",
            email: "choeunutdom.ntti@gmail.com",
            password: hashedPassword,
            role: "admin",
            // profileImage: "https://res.cloudinary.com/dz1qj3x8j/image/upload/v1707261234/avatars/avatar-1.png",
            phoneNumber: "093910392",
        });
        await newUser.save();
        console.log("User registered successfully:", newUser);
    } catch (error) {
        console.error("Error in user registration:", error);
        
    }
}
userRegister()
    .then(() => console.log("User seed completed"))
    .catch((error) => console.error("Error in user seed:", error));