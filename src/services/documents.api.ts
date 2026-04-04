import type { DocumentRecord } from '../types/models';
import { unwrapResponse } from '../utils/response';
import { flattenDocuments, normalizeDocument } from '../utils/mappers';
import { api } from './api';

export function uploadDocument(formData: FormData) {
  return api
    .post('/documents/upload', formData)
    .then(unwrapResponse<DocumentRecord>)
    .then(normalizeDocument);
}

export function getDocumentsByRegistration(registrationId: number | string) {
  return api
    .get(`/documents/registration/${registrationId}`)
    .then(unwrapResponse<Record<string, unknown>>)
    .then(flattenDocuments);
}
