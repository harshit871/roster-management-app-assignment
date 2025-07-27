import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { Provider } from "../lib/types";
import mockData from "../lib/mockData";
import { useRosterData } from "../hooks/useRosterData";
import FilterBar from "../components/filters/FilterBar";
import { useAppSelector } from "../store/hooks";
import { filterProviders } from "../lib/filterUtils";
import ProviderList from "../components/roster/ProviderList";
import Loader from "../components/ui/Loader";
import NoData from "../components/ui/NoData";
import Image from "next/image";
import { useRouter } from "next/router";

const AMAHA_URL = 'https://www.amahahealth.com/';

interface IndexProps {
    initialData: Provider[];
}

export const getStaticProps: GetStaticProps = async () => {
    // For static generation, provide mockData as props
    return { props: { initialData: mockData } };
};

const Home: NextPage<IndexProps> = ({ initialData }) => {
  const {push} = useRouter();

    const { providers, isLoading, isError } = useRosterData();
    const rawProviders = providers.length ? providers : initialData;
    const filters = useAppSelector((state) => state.filter);
    const dataToShow = filterProviders(rawProviders, filters);

    // Build centers list for dropdown options
    const centerOptions = Array.from(
        new Set(rawProviders.map((p) => p.clinic_details.name))
    ).map((c) => ({ key: c, label: c }));

    if (isLoading) return <Loader />;
    if (isError) return <NoData message="Error loading providers" />;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-[#e0e0e0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Image src="/goToAmaha.svg" alt="hamburger menu" height={36} width={36} onClick={() => push(AMAHA_URL)}/>

                                <h1 className="text-2xl font-bold text-[#4C4C4C]">
                                    Provider Calendar
                                </h1>
                            </div>

                            <div className="flex border border-[#e0e0e0] rounded-lg cursor-pointer">
                              <div className="border-r border-[#e0e0e0] p-2 bg-[#DBE7CC]" >
                                <Image src="/hamburgerMenu.svg" alt="hamburger menu" height={24} width={24} />
                              </div>
                              <div className="p-2">
                                <Image src="/calendarViewIcon.svg" alt="calendar view" height={24} width={24} />
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                    <aside className="lg:sticky lg:top-6 lg:self-start">
                        <FilterBar centerOptions={centerOptions} />
                    </aside>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {dataToShow.length === rawProviders.length
                                        ? "All Providers"
                                        : "Filtered Results"}
                                </h2>
                                <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                                    {dataToShow.length} of {rawProviders.length}
                                </span>
                            </div>
                        </div>

                        {/* Provider list */}
                        <ProviderList providers={dataToShow} />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
