import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import type { Role } from '../../types/auth';
import { getDefaultRouteByRole } from '../../utils/auth';

interface ProtectedRouteProps {
  allowedRoles?: Role[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.user?.role);

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  if (allowedRoles?.length && role && !allowedRoles.includes(role)) {
    return <Navigate replace to={getDefaultRouteByRole(role)} />;
  }

  return <Outlet />;
}
