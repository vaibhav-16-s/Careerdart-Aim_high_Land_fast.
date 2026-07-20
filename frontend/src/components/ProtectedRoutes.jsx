import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Not logged in
    if (!token) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Logged in but wrong role
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;