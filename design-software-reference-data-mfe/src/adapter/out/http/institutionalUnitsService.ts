import type {
  InstitutionalUnitCreateDto,
  InstitutionalUnitDto,
  InstitutionalUnitListQuery,
  InstitutionalUnitPageDto,
  InstitutionalUnitUpdateDto,
} from '../../../domain/institutionalStructure.js';
import { jsonBody, requestReferenceData } from './referenceDataHttp.js';
import type { ReferenceDataApi } from './referenceDataHttp.js';

export const institutionalUnitsService = {
  list(baseUrl: ReferenceDataApi, query: InstitutionalUnitListQuery, signal?: AbortSignal) {
    const params = new URLSearchParams({
      page: String(query.page),
      page_size: String(query.pageSize),
    });
    if (query.isActive !== undefined) params.set('is_active', String(query.isActive));
    if (query.trainingCenterId) params.set('training_center_id', query.trainingCenterId);
    return requestReferenceData<InstitutionalUnitPageDto>(
      baseUrl,
      `institutional-units?${params.toString()}`,
      { signal },
    );
  },
  create(baseUrl: ReferenceDataApi, body: InstitutionalUnitCreateDto) {
    return requestReferenceData<InstitutionalUnitDto>(baseUrl, 'institutional-units', {
      method: 'POST',
      body: jsonBody(body),
    });
  },
  update(baseUrl: ReferenceDataApi, id: string, body: InstitutionalUnitUpdateDto) {
    return requestReferenceData<InstitutionalUnitDto>(
      baseUrl,
      `institutional-units/${encodeURIComponent(id)}`,
      { method: 'PUT', body: jsonBody(body) },
    );
  },
  deactivate(baseUrl: ReferenceDataApi, id: string) {
    return requestReferenceData<void>(
      baseUrl,
      `institutional-units/${encodeURIComponent(id)}`,
      { method: 'DELETE' },
    );
  },
};
