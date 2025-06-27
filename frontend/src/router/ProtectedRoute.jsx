// src/components/ProtectedRoute.jsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { loading,token } = useAuth();

if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/please_login" replace />;
  }

  return children;
}

export default ProtectedRoute;