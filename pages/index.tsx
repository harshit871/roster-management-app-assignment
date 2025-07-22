import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { Provider } from '../lib/types';
import mockData from '../lib/mockData';
import { useRosterData } from '../hooks/useRosterData';
import FilterBar from '../components/filters/FilterBar';
import { useAppSelector } from '../store/hooks';
import { filterProviders } from '../lib/filterUtils';
import ProviderList from '../components/roster/ProviderList';
import Loader from '../components/ui/Loader';
import NoData from '../components/ui/NoData';

export const getStaticProps: GetStaticProps = async () => {
  // For static generation, provide mockData as props
  return { props: { initialData: mockData } };
};

interface IndexProps { initialData: Provider[]; }

const Home: NextPage<IndexProps> = ({ initialData }) => {
  const { providers, isLoading, isError } = useRosterData();
  const rawProviders = providers.length ? providers : initialData;
  const filters = useAppSelector((state) => state.filter);
  const dataToShow = filterProviders(rawProviders, filters);
  // Build centers list for dropdown options
  const centerOptions = Array.from(new Set(rawProviders.map((p) => p.clinic_details.name))).map((c) => ({ key: c, label: c }));

  if (isLoading) return <Loader />;
  if (isError) return <NoData message="Error loading providers" />;

  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Provider Roster</h1>
      <div className="md:grid md:grid-cols-[260px_1fr] md:gap-6">
        {/* Sidebar filters */}
        <aside className="mb-6 md:mb-0">
          <FilterBar centerOptions={centerOptions} />
        </aside>
        {/* Provider list */}
        <section>
          <ProviderList providers={dataToShow} />
        </section>
      </div>
    </div>
  );
};

export default Home;