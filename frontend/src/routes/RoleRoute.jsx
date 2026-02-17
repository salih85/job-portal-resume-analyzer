import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RoleRoute = ({ role, children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }
  

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
