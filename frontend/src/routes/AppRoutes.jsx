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
import Managejobs from "../Pages/Employer/Managejobs";
import JobSeekerDashboard from "../Pages/JobSeeker/JobSeekerDashboard";
import JobSearch from "../Pages/JobSeeker/JobSearch";
import MyApplications from "../Pages/JobSeeker/MyApplications";
import ProtectedRoute from "../components/ProtectedRoutes"
import UnAuth from "../components/UnAuth";
import EmployerApplications from "../Pages/Employer/Applications";
import UpdateProfile from "../Pages/Profile/UpdateProfile";






function AppRoutes() {

    return (
        <Routes>

            {/*------------Admin------------------------------------*/}
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["Admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/adminReg"
                element={
                    <ProtectedRoute allowedRoles={["Admin"]}>
                        <AdminReg />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/employerReg"
                element={
                    <ProtectedRoute allowedRoles={["Admin"]}>
                        <EmployerReg />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/manage_employers"
                element={
                    <ProtectedRoute allowedRoles={["Admin"]}>
                        <ManageEmployer />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/manage_jobseekers"
                element={
                    <ProtectedRoute allowedRoles={["Admin"]}>
                        <ManageJobSeeker />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/editEmployer/:id"
                element={
                    <ProtectedRoute allowedRoles={["Admin"]}>
                        <EmployerEdit />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/updatePassword/:id"
                element={
                    <ProtectedRoute
                        allowedRoles={["Admin", "Employer", "JobSeeker"]}
                    >
                        <UpdatePassword />
                    </ProtectedRoute>
                }

            />

            <Route
                path="/updateProfile"
                element={
                    <ProtectedRoute
                        allowedRoles={["Admin", "Employer", "JobSeeker"]}
                    >
                        <UpdateProfile />
                    </ProtectedRoute>
                }
            />



            {/*------------Home------------------------------------*/}
            <Route path="/home/login" element={<LoginPage />} />
            <Route path="/home/get_started" element={<JobSeekerReg />} />

            <Route path="/" element={<LandingPage />} />
            <Route path="/unauthorized" element={<UnAuth />} />






            {/*------------Employer------------------------------------*/}

            <Route
                path="/employer/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["Employer"]}>
                        <EmployerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employer/jobreg"
                element={
                    <ProtectedRoute allowedRoles={["Employer"]}>
                        <JobReg />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employer/managejobs"
                element={
                    <ProtectedRoute allowedRoles={["Employer"]}>
                        <Managejobs />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/employer/applications"
                element={
                    <ProtectedRoute
                        allowedRoles={["Employer"]}
                    >
                        <EmployerApplications />
                    </ProtectedRoute>
                }
            />


            {/*------------JobSeeker------------------------------------*/}

            <Route
                path="/jobseeker/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["JobSeeker"]}>
                        <JobSeekerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/jobseeker/jobsearch"
                element={
                    <ProtectedRoute allowedRoles={["JobSeeker"]}>
                        <JobSearch />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/jobseeker/applications"
                element={
                    <ProtectedRoute allowedRoles={["JobSeeker"]}>
                        <MyApplications />
                    </ProtectedRoute>
                }
            />



        </Routes>
    )
}


export default AppRoutes;