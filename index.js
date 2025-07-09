import express from 'express';
import cors from 'cors';
import authRoute from './route/AuthRoute.js';
import connectDB from './db/db.js'
import DepartmentRoute from './route/DepartmentRoute.js'
import EmployeeRoute from './route/EmployeeRoute.js'
import SalaryRoute from './route/Salary.js'
import LeaveRoute from './route/LeaveRoute.js';
import SettingRoute from './route/SettingRoute.js';
import DashboardRoute from './route/DashboardRoute.js';

const app = express();
app.use(express.json());
// Load environment variables from .env file
app.use(cors());
app.use(express.static('public/uploads'))
// Define routes
app.use('/api/auth', authRoute);
app.use('/api/department', DepartmentRoute);
app.use('/api/employee', EmployeeRoute);
app.use('/api/salary', SalaryRoute);
app.use('/api/leave', LeaveRoute);
app.use('/api/setting', SettingRoute);
app.use('/api/dashboard', DashboardRoute);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
