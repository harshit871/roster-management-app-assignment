import { Provider } from './types';
import { FilterState } from '../store/filterSlice';

// Returns providers filtered by all active filters
export function filterProviders(providers: Provider[], filters: FilterState): Provider[] {
  const { services, types, centers, searchText  = ''} = filters;

  return providers.filter((p) => {
    // Service filter: use provider_usertype e.g., 'therapist', 'psychiatrist'
    if (services.length && !services.includes(p.provider_usertype)) return false;

    // Type filter: convert boolean is_inhouse to 'inhouse' | 'external'
    const inhouseType = p.is_inhouse ? 'inhouse' : 'external';
    if (types.length && !types.includes(inhouseType)) return false;

    // Center filter – compare by clinic name
    const centerKey = p.clinic_details?.name;
    if (centers.length && !centers.includes(centerKey)) return false;

    // search text in provider name (case-insensitive)
    if (searchText.trim()) {
      const text = searchText.trim().toLowerCase();
      if (!p.name.toLowerCase().includes(text)) return false;
    }

    return true;
  });
}
