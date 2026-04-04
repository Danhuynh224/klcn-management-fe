import type { QueryParams } from '../types/api';
import type { NotificationItem } from '../types/models';
import { unwrapResponse } from '../utils/response';
import { normalizeNotification } from '../utils/mappers';
import { api } from './api';

export function getMyNotifications(params?: QueryParams) {
  return api
    .get('/notifications/me', { params })
    .then(unwrapResponse<NotificationItem[]>)
    .then((items) => items.map(normalizeNotification));
}

export function markNotificationRead(id: number | string) {
  return api
    .patch(`/notifications/${id}/read`)
    .then(unwrapResponse<NotificationItem>)
    .then(normalizeNotification);
}
