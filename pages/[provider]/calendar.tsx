import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import mockData from '../../lib/mockData';
import { Provider } from '../../lib/types';
import CalendarGrid from '../../components/calendar/CalendarGrid';
import Loader from '../../components/ui/Loader';
import NoData from '../../components/ui/NoData';

interface CalendarPageProps { provider: Provider | null; dates: Date[]; availMap: Record<string, any>; }

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = mockData.map((p) => ({ params: { provider: p.id.toString() } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.provider;
  const prov = mockData.find((p) => p.id.toString() === id) || null;
  // Generate next 7 days
  const dates = Array.from({ length: 7 }).map((_, i) => new Date(Date.now() + i * 86400000));
  // Map availabilities by date string
  const availMap: Record<string, any> = {};
  prov?.availabilities.forEach((a) => {
    const key = dates[0].toISOString().split('T')[0];
    availMap[key] = a;
  });
  return { props: { provider: prov, dates, availMap } };
};

const CalendarPage: NextPage<CalendarPageProps> = ({ provider, dates, availMap }) => {
  const router = useRouter();
  if (router.isFallback) return <Loader />;
  if (!provider) return <NoData message="Provider not found" />;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500 hover:underline">
        &larr; Back to Roster
      </button>
      <h1 className="text-2xl font-bold mb-2">{provider.name} - Calendar</h1>
      <p className="text-sm text-gray-600 mb-4">{provider.clinic_details.name}</p>
      <CalendarGrid dates={dates} availabilities={availMap} />
    </div>
  );
};

export default CalendarPage;