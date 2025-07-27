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
import { CalendarIcon, UsersIcon, ClockIcon } from "lucide-react";

interface IndexProps {
    initialData: Provider[];
}

export const getStaticProps: GetStaticProps = async () => {
    // For static generation, provide mockData as props
    return { props: { initialData: mockData } };
};

const Home: NextPage<IndexProps> = ({ initialData }) => {
    const { providers, isLoading, isError } = useRosterData();
    const rawProviders = providers.length ? providers : initialData;
    const filters = useAppSelector((state) => state.filter);
    const dataToShow = filterProviders(rawProviders, filters);

    // Build centers list for dropdown options
    const centerOptions = Array.from(
        new Set(rawProviders.map((p) => p.clinic_details.name))
    ).map((c) => ({ key: c, label: c }));

    // Calculate stats
    const totalProviders = rawProviders.length;
    const totalAvailableSlots = rawProviders.reduce((acc, provider) => {
        return (
            acc +
            provider.availabilities.reduce((slotAcc, avail) => {
                return (
                    slotAcc +
                    avail.online_slots.length +
                    avail.offline_slots.length +
                    avail.both_slots.length
                );
            }, 0)
        );
    }, 0);
    const totalBookedSlots = rawProviders.reduce((acc, provider) => {
        return (
            acc +
            provider.availabilities.reduce((slotAcc, avail) => {
                return (
                    slotAcc +
                    avail.online_booked_slots.length +
                    avail.offline_booked_slots.length
                );
            }, 0)
        );
    }, 0);

    if (isLoading) return <Loader />;
    if (isError) return <NoData message="Error loading providers" />;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Provider Roster Management
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Manage and view healthcare provider
                                    schedules
                                </p>
                            </div>
                            <div className="hidden md:flex items-center space-x-6 text-sm">
                                <div className="flex items-center space-x-2">
                                    <UsersIcon
                                        size={16}
                                        className="text-gray-400"
                                    />
                                    <span className="text-gray-600">
                                        {totalProviders} Providers
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <ClockIcon
                                        size={16}
                                        className="text-gray-400"
                                    />
                                    <span className="text-gray-600">
                                        {totalAvailableSlots} Available
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon
                                        size={16}
                                        className="text-gray-400"
                                    />
                                    <span className="text-gray-600">
                                        {totalBookedSlots} Booked
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile stats */}
                        <div className="md:hidden mt-4 grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-900">
                                    {totalProviders}
                                </div>
                                <div className="text-gray-600">Providers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-900">
                                    {totalAvailableSlots}
                                </div>
                                <div className="text-gray-600">Available</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-900">
                                    {totalBookedSlots}
                                </div>
                                <div className="text-gray-600">Booked</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                    {/* Sidebar filters */}
                    <aside className="lg:sticky lg:top-6 lg:self-start">
                        <FilterBar centerOptions={centerOptions} />
                    </aside>

                    {/* Provider list */}
                    <section className="space-y-4">
                        {/* Results header */}
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

                            {/* Sort options */}
                            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                                <option>Sort by Name</option>
                                <option>Sort by Availability</option>
                                <option>Sort by Center</option>
                            </select>
                        </div>

                        {/* Provider list */}
                        <ProviderList providers={dataToShow} />

                        {/* Empty state */}
                        {dataToShow.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <UsersIcon size={48} className="mx-auto" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No providers found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Try adjusting your filters or search terms
                                    to find providers.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
