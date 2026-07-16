import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../Pages/Admin/dashboard/AdminDashboard";
import LandingPage from "../Pages/home/LandingPage";
import AdminReg from "../Pages/Admin/reg/AdminReg";


function AppRoutes() {

    return (
        <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />}/>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/admin/adminReg" element={<AdminReg />}/>
        </Routes>
    )
}


export default AppRoutes;