import useSWR from 'swr';
import { Provider } from '../lib/types';
import mockData from '../lib/mockData';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useRosterData = () => {
  // Replace '/api/roster' with real endpoint when available
  const { data, error } = useSWR<Provider[]>('/api/roster', fetcher, {
    fallbackData: mockData,
  });
  return {
    providers: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};