import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <>Loading... Spinner</>;
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
}
