import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import Loading from "./Loading";

const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
     <Loading />;
  }
  
 if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
export default ProtectedRoute;