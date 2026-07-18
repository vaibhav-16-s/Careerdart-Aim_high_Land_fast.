import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../Pages/Admin/dashboard/AdminDashboard";
import LandingPage from "../Pages/home/LandingPage";
import AdminReg from "../Pages/Admin/reg/AdminReg";
import EmployerReg from "../Pages/Admin/reg/EmployerReg";
import LoginPage from "../Pages/home/LoginPage";
import JobSeekerReg from "../Pages/home/JobSeekerReg";
import ManageEmployer from "../Pages/Admin/manage/ManageEmployer";
import ManageJobSeeker from "../Pages/Admin/manage/ManageJobSeeker";
import EmployerEdit from "../Pages/Admin/edit/EditEmployer";
import UpdatePassword from "../Pages/Admin/manage/UpdatePassword";
import JobReg from "../Pages/Employer/JobReg";
import EmployerDashboard from "../Pages/Employer/EmployerDashboard";




function AppRoutes() {

    return (
        <Routes>

            {/*------------Admin------------------------------------*/}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/adminReg" element={<AdminReg />} />
            <Route path="/admin/employerReg" element={<EmployerReg />} />
            <Route path="/admin/manage_employers" element={<ManageEmployer />} />
            <Route path="/admin/manage_jobseekers" element={<ManageJobSeeker />} />
            <Route path="/admin/editEmployer/:id" element={<EmployerEdit />} />

            <Route path="/admin/updatePassword/:id" element={<UpdatePassword />} />



            {/*------------Home------------------------------------*/}
            <Route path="/home/login" element={<LoginPage />} />
            <Route path="/home/get_started" element={<JobSeekerReg />} />





            {/*------------Employer------------------------------------*/}

            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/jobreg" element={<JobReg />} />


        </Routes>
    )
}


export default AppRoutes;