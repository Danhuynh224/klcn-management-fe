import type {
  HeadDashboard,
  LecturerDashboard,
  StudentDashboard,
} from '../types/models';
import { unwrapResponse } from '../utils/response';
import { normalizeStudentDashboard } from '../utils/mappers';
import { api } from './api';

export function getStudentDashboard() {
  return api.get('/dashboards/student').then(unwrapResponse<StudentDashboard>).then(normalizeStudentDashboard);
}

export function getLecturerDashboard() {
  return api.get('/dashboards/lecturer').then(unwrapResponse<LecturerDashboard>);
}

export function getHeadDashboard() {
  return api.get('/dashboards/head').then(unwrapResponse<HeadDashboard>);
}
