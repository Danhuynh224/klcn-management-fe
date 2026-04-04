import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { getDefaultRouteByRole } from '../../utils/auth';

export function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.user?.role);

  if (isAuthenticated) {
    return <Navigate replace to={getDefaultRouteByRole(role)} />;
  }

  return <Outlet />;
}
