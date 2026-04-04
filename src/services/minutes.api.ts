import type { MinuteRecord } from '../types/models';
import { unwrapResponse } from '../utils/response';
import { normalizeMinute } from '../utils/mappers';
import { api } from './api';

export function getMinutesByRegistration(registrationId: number | string) {
  return api
    .get(`/minutes/registration/${registrationId}`)
    .then(unwrapResponse<MinuteRecord>)
    .then(normalizeMinute);
}

export function generateMinutes(registrationId: number | string) {
  return api
    .post(`/minutes/registration/${registrationId}/generate`)
    .then(unwrapResponse<MinuteRecord>)
    .then(normalizeMinute);
}

export function updateMinutes(
  registrationId: number | string,
  payload: Record<string, unknown>,
) {
  return api
    .patch(`/minutes/${registrationId}`, {
      content: payload.content ?? payload.notes,
      fileUrl: payload.fileUrl,
    })
    .then(unwrapResponse<MinuteRecord>)
    .then(normalizeMinute);
}
