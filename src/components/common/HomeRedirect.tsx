import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { getDefaultRouteByRole } from '../../utils/auth';

export function HomeRedirect() {
  const role = useAuthStore((state) => state.user?.role);

  return <Navigate replace to={getDefaultRouteByRole(role)} />;
}
