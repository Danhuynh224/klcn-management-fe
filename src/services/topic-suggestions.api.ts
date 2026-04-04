import type { TopicSuggestion } from '../types/models';
import { unwrapResponse } from '../utils/response';
import { api } from './api';

export function getTopicSuggestions() {
  return api.get('/topic-suggestions').then(unwrapResponse<TopicSuggestion[]>);
}

export function createTopicSuggestion(payload: Record<string, unknown>) {
  return api.post('/topic-suggestions', payload).then(unwrapResponse<TopicSuggestion>);
}

export function updateTopicSuggestion(
  id: number | string,
  payload: Record<string, unknown>,
) {
  return api
    .patch(`/topic-suggestions/${id}`, payload)
    .then(unwrapResponse<TopicSuggestion>);
}
