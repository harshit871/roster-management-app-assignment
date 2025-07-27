import { Provider } from './types';
import { FilterState } from '../store/filterSlice';


export function filterProviders(providers: Provider[], filters: FilterState): Provider[] {
  const { services, types, centers, searchText  = ''} = filters;

  return providers.filter((p) => {

    if (services.length && !services.includes(p.provider_usertype)) return false;


    const inhouseType = p.is_inhouse ? 'inhouse' : 'external';
    if (types.length && !types.includes(inhouseType)) return false;


    const centerKey = p.clinic_details?.name;
    if (centers.length && !centers.includes(centerKey)) return false;


    if (searchText.trim()) {
      const text = searchText.trim().toLowerCase();
      if (!p.name.toLowerCase().includes(text)) return false;
    }

    return true;
  });
}
