import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { Provider } from '../lib/types';
import mockData from '../lib/mockData';
import { useRosterData } from '../hooks/useRosterData';
import FilterBar from '../components/filters/FilterBar';
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
  const dataToShow = providers.length ? providers : initialData;

  if (isLoading) return <Loader />;
  if (isError) return <NoData message="Error loading providers" />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Provider Roster</h1>
      <FilterBar />
      <ProviderList providers={dataToShow} />
    </div>
  );
};

export default Home;