import React, { useState, useMemo, useCallback } from "react";
import type { GetStaticProps, NextPage } from "next";
import { Provider, Availability } from "../lib/types";
import mockData from "../lib/mockData";
import { useRosterData } from "../hooks/useRosterData";
import FilterBar from "../components/filters/FilterBar";
import SearchBar from "../components/filters/SearchBar";
import { useAppSelector } from "../store/hooks";
import { filterProviders } from "../lib/filterUtils";
import ProviderList from "../components/roster/ProviderList";
import CalendarGrid from "../components/calendar/CalendarGrid";
import Loader from "../components/ui/Loader";
import NoData from "../components/ui/NoData";
import Image from "next/image";
import { useRouter } from "next/router";

const AMAHA_URL = "https://www.amahahealth.com/";

interface IndexProps {
    initialData: Provider[];
}

interface SelectedProvider {
    id: number;
    name: string;
    clinic: string;
    type: string;
}

export const getStaticProps: GetStaticProps = async () => {
    return { props: { initialData: mockData } };
};

type ViewMode = "list" | "calendar" | "slots";

const Home: NextPage<IndexProps> = ({ initialData }) => {
    const { push } = useRouter();
    const [viewMode, setViewMode] = useState<ViewMode>("slots");
    const [selectedCalendarProviders, setSelectedCalendarProviders] = useState<
        SelectedProvider[]
    >([]);

    const { providers, isLoading, isError } = useRosterData();
    const rawProviders = providers.length ? providers : initialData;
    const filters = useAppSelector((state) => state.filter);

    const dataToShow = useMemo(() => {
        if (viewMode === "calendar" && selectedCalendarProviders.length > 0) {
            const selectedIds = selectedCalendarProviders.map((p) => p.id);
            return rawProviders.filter((provider) =>
                selectedIds.includes(provider.id)
            );
        } else {
            return filterProviders(rawProviders, filters);
        }
    }, [rawProviders, filters, viewMode, selectedCalendarProviders]);

    const centerOptions = Array.from(
        new Set(rawProviders.map((p) => p.clinic_details.name))
    ).map((c) => ({ key: c, label: c }));

    const dates = useMemo(() => {
        return Array.from({ length: 14 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return date.toISOString();
        });
    }, []);

    const allAvailabilities = useMemo(() => {
        const availMap: Record<string, Availability> = {};
        dataToShow.forEach((provider) => {
            provider.availabilities.forEach((availability) => {
                if (!availMap[availability.date]) {
                    availMap[availability.date] = {
                        date: availability.date,
                        online_slots: [],
                        offline_slots: [],
                        both_slots: [],
                        online_booked_slots: [],
                        offline_booked_slots: [],
                        blocked_slots: [],
                    };
                }
                availMap[availability.date].online_slots.push(
                    ...availability.online_slots
                );
                availMap[availability.date].offline_slots.push(
                    ...availability.offline_slots
                );
                availMap[availability.date].both_slots.push(
                    ...availability.both_slots
                );
                availMap[availability.date].online_booked_slots.push(
                    ...availability.online_booked_slots
                );
                availMap[availability.date].offline_booked_slots.push(
                    ...availability.offline_booked_slots
                );
                availMap[availability.date].blocked_slots.push(
                    ...availability.blocked_slots
                );
            });
        });
        return availMap;
    }, [dataToShow]);

    const handleProvidersSelected = useCallback(
        (providers: SelectedProvider[]) => {
            setSelectedCalendarProviders(providers);
        },
        []
    );

    if (isLoading) return <Loader />;
    if (isError) return <NoData message="Error loading providers" />;

    const handleViewToggle = (mode: ViewMode) => {
        setViewMode(mode);
        if (mode !== "calendar") {
            setSelectedCalendarProviders([]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-[#e0e0e0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src="/goToAmaha.svg"
                                    alt="Go to Amaha"
                                    height={36}
                                    width={36}
                                    className="cursor-pointer"
                                    onClick={() => push(AMAHA_URL)}
                                />
                                <h1 className="text-2xl font-bold text-[#4C4C4C]">
                                    Provider Calendar
                                </h1>
                            </div>

                            <div className="flex border border-[#e0e0e0] rounded-lg cursor-pointer">
                                <div
                                    className={`border-r border-[#e0e0e0] p-2 ${
                                        viewMode === "slots"
                                            ? "bg-[#DBE7CC]"
                                            : "bg-white hover:bg-gray-50"
                                    }`}
                                    onClick={() => handleViewToggle("slots")}
                                >
                                    <Image
                                        src="/hamburgerMenu.svg"
                                        alt="Slots view"
                                        height={24}
                                        width={24}
                                    />
                                </div>
                                <div
                                    className={`p-2 ${
                                        viewMode === "calendar"
                                            ? "bg-[#DBE7CC]"
                                            : "bg-white hover:bg-gray-50"
                                    }`}
                                    onClick={() => handleViewToggle("calendar")}
                                >
                                    <Image
                                        src="/calendarViewIcon.svg"
                                        alt="Calendar view"
                                        height={24}
                                        width={24}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:grid lg:grid-cols-[320px_1fr] gap-6">
                    <aside className="order-2 lg:order-1 lg:sticky lg:top-6 lg:self-start">
                        {viewMode === "slots" ? (
                            <FilterBar centerOptions={centerOptions} />
                        ) : (
                            <SearchBar
                                allProviders={rawProviders}
                                onProvidersSelected={handleProvidersSelected}
                            />
                        )}
                    </aside>

                    <section className="order-1 lg:order-2 space-y-4">
                        {viewMode === "list" ? (
                            <ProviderList providers={dataToShow} />
                        ) : viewMode === "slots" ? (
                            <CalendarGrid
                                dates={dates}
                                availabilities={allAvailabilities}
                                viewMode="slots"
                                onViewModeChange={(mode) => setViewMode(mode)}
                                allProviders={dataToShow}
                            />
                        ) : (
                            <CalendarGrid
                                dates={dates}
                                availabilities={allAvailabilities}
                                viewMode="calendar"
                                onViewModeChange={(mode) => setViewMode(mode)}
                                allProviders={dataToShow}
                            />
                        )}

                        {dataToShow.length === 0 &&
                            viewMode === "calendar" &&
                            selectedCalendarProviders.length === 0 && (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Select providers to view calendar
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Use the search on the left to select up
                                        to 5 providers to see their
                                        availability.
                                    </p>
                                </div>
                            )}

                        {dataToShow.length === 0 && viewMode !== "calendar" && (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No providers found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Try adjusting your filters or search terms
                                    to find providers.
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
