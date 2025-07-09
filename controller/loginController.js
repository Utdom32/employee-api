
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             res.status(404).json({ success: false, error: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id, role: user.role , name: user.name, phoneNumber: user.phoneNumber },
            process.env.JWT_KEY,
            { expiresIn: '10h' }
        )
        // Set the token in the response header
        res
        .status(200)
        .json({
            sucess: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                role: user.role,
                phoneNumber: user.phoneNumber,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
export const verify = async (req, res) => {
    return await res.status(200).json({
        success: true,
        user: req.user
    });
}