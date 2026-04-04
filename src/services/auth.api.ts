import type { LoginPayload, LoginResult } from '../types/auth';
import { unwrapResponse } from '../utils/response';
import { normalizeLoginResult, normalizeUser } from '../utils/mappers';
import { api } from './api';

export function login(payload: LoginPayload) {
  return api
    .post('/auth/login', payload)
    .then(unwrapResponse<LoginResult>)
    .then(normalizeLoginResult);
}

export function getMe() {
  return api
    .get('/auth/me')
    .then(unwrapResponse<LoginResult['user']>)
    .then(normalizeUser);
}
