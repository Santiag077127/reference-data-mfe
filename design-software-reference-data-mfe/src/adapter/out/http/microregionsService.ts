import type {
  GeographyPageDto,
  MicroregionCreateDto,
  MicroregionDto,
  MicroregionListQuery,
  MicroregionUpdateDto,
} from '../../../domain/geography.js';
import { jsonBody, requestReferenceData } from './referenceDataHttp.js';
import type { ReferenceDataApi } from './referenceDataHttp.js';

export const microregionsService = {
  list(baseUrl: ReferenceDataApi, query: MicroregionListQuery, signal?: AbortSignal) {
    const params = new URLSearchParams({
      macroregion_id: query.macroregionId,
      page: String(query.page),
      page_size: String(query.pageSize),
    });
    return requestReferenceData<GeographyPageDto<MicroregionDto>>(
      baseUrl,
      `microregions?${params.toString()}`,
      { signal },
    );
  },
  get(baseUrl: ReferenceDataApi, id: string, signal?: AbortSignal) {
    return requestReferenceData<MicroregionDto>(baseUrl, `microregions/${encodeURIComponent(id)}`, { signal });
  },
  create(baseUrl: ReferenceDataApi, body: MicroregionCreateDto) {
    return requestReferenceData<MicroregionDto>(baseUrl, 'microregions', { method: 'POST', body: jsonBody(body) });
  },
  update(baseUrl: ReferenceDataApi, id: string, body: MicroregionUpdateDto) {
    return requestReferenceData<MicroregionDto>(baseUrl, `microregions/${encodeURIComponent(id)}`, { method: 'PUT', body: jsonBody(body) });
  },
  deactivate(baseUrl: ReferenceDataApi, id: string) {
    return requestReferenceData<void>(baseUrl, `microregions/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};
