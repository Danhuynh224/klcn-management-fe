import type { Role } from '../types/auth';

export function getDefaultRouteByRole(role?: Role) {
  switch (role) {
    case 'STUDENT':
      return '/student/dashboard';
    case 'LECTURER':
      return '/lecturer/dashboard';
    case 'HEAD_OF_DEPARTMENT':
      return '/head/dashboard';
    default:
      return '/login';
  }
}
