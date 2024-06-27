import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "flowbite-react";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="h-screen flex justify-center items-center"><Spinner aria-label="Large spinner example" size="xl" /></div>
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
}
