import type { QueryParams } from '../types/api';
import type { Quota } from '../types/models';
import { unwrapResponse } from '../utils/response';
import { normalizeQuota } from '../utils/mappers';
import { api } from './api';

export function getQuotas(params?: QueryParams) {
  return api
    .get('/quotas', { params })
    .then(unwrapResponse<Quota[]>)
    .then((items) => items.map(normalizeQuota));
}

export function updateQuota(
  id: number | string,
  payload: Partial<Pick<Quota, 'quota'>>,
) {
  return api.patch(`/quotas/${id}`, payload).then(unwrapResponse<Quota>).then(normalizeQuota);
}

export function approveQuota(id: number | string) {
  return api.patch(`/quotas/${id}/approve`).then(unwrapResponse<Quota>).then(normalizeQuota);
}
