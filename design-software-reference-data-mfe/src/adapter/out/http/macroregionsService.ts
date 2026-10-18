import type {
  GeographyPageDto,
  MacroregionCreateDto,
  MacroregionDto,
  MacroregionListQuery,
  MacroregionUpdateDto,
} from '../../../domain/geography.js';
import { jsonBody, requestReferenceData } from './referenceDataHttp.js';
import type { ReferenceDataApi } from './referenceDataHttp.js';

export const macroregionsService = {
  list(baseUrl: ReferenceDataApi, query: MacroregionListQuery, signal?: AbortSignal) {
    const params = new URLSearchParams({ page: String(query.page), page_size: String(query.pageSize) });
    return requestReferenceData<GeographyPageDto<MacroregionDto>>(
      baseUrl,
      `macroregions?${params.toString()}`,
      { signal },
    );
  },
  get(baseUrl: ReferenceDataApi, id: string, signal?: AbortSignal) {
    return requestReferenceData<MacroregionDto>(baseUrl, `macroregions/${encodeURIComponent(id)}`, { signal });
  },
  create(baseUrl: ReferenceDataApi, body: MacroregionCreateDto) {
    return requestReferenceData<MacroregionDto>(baseUrl, 'macroregions', { method: 'POST', body: jsonBody(body) });
  },
  update(baseUrl: ReferenceDataApi, id: string, body: MacroregionUpdateDto) {
    return requestReferenceData<MacroregionDto>(baseUrl, `macroregions/${encodeURIComponent(id)}`, { method: 'PUT', body: jsonBody(body) });
  },
  deactivate(baseUrl: ReferenceDataApi, id: string) {
    return requestReferenceData<void>(baseUrl, `macroregions/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};
