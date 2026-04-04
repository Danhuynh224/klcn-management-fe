import type { AxiosResponse } from 'axios';
import type { ApiResponse } from '../types/api';

export function unwrapResponse<T>(response: AxiosResponse<ApiResponse<T>>) {
  return response.data.data;
}
