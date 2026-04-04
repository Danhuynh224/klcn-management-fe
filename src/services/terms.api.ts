import type { QueryParams } from '../types/api';
import type { Term } from '../types/models';
import { unwrapResponse } from '../utils/response';
import { normalizeTerm } from '../utils/mappers';
import { api } from './api';

export function getTerms(params?: QueryParams) {
  return api
    .get('/terms', { params })
    .then(unwrapResponse<Term[]>)
    .then((items) => items.map(normalizeTerm));
}

export function createTerm(payload: Partial<Term> & Record<string, unknown>) {
  const body = {
    tenDot: payload.name ?? payload.code ?? payload.tenDot,
    loai: payload.loai ?? payload.type,
    ...payload,
  };

  return api.post('/terms', body).then(unwrapResponse<Term>).then(normalizeTerm);
}

export function updateTerm(id: number | string, payload: Partial<Term> & Record<string, unknown>) {
  const body = {
    tenDot: payload.name ?? payload.code ?? payload.tenDot,
    loai: payload.loai ?? payload.type,
    ...payload,
  };

  return api.patch(`/terms/${id}`, body).then(unwrapResponse<Term>).then(normalizeTerm);
}
