import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const RoleRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (allowedRoles.includes(role)) {
    return children;
  }

  return <Navigate to="/" state={{ from: location.pathname }} replace />;
};

export default RoleRoute;
