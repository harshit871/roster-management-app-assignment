import React, { useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import mockData from "../../lib/mockData";
import { Provider, Availability } from "../../lib/types";
import CalendarGrid from "../../components/calendar/CalendarGrid";
import Loader from "../../components/ui/Loader";
import NoData from "../../components/ui/NoData";

interface CalendarPageProps { 
  provider: Provider | null; 
  dates: string[]; 
  availMap: Record<string, Availability>; 
  allProviders: Provider[];
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = mockData.map((p) => ({
        params: { provider: p.id.toString() },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params?.provider;
    const provider = mockData.find((p) => p.id.toString() === id) || null;

    // Generate next 14 days for more comprehensive view
    const dates = Array.from({ length: 14 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString(); // Convert to string for serialization
    });

    // Map availabilities by date string
    const availMap: Record<string, Availability> = {};
    if (provider) {
        provider.availabilities.forEach((availability) => {
            availMap[availability.date] = availability;
        });
    }

    return {
        props: {
            provider,
            dates,
            availMap,
            allProviders: mockData,
        },
    };
};

const CalendarPage: NextPage<CalendarPageProps> = ({
    provider,
    dates,
    availMap,
    allProviders,
}) => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"calendar" | "slots">("calendar");
    const [selectedProvider, setSelectedProvider] = useState(provider);
    const [selectedProviderAvailMap, setSelectedProviderAvailMap] =
        useState(availMap);

    if (router.isFallback) return <Loader />;
    if (!provider) return <NoData message="Provider not found" />;

    const handleProviderChange = (newProvider: Provider) => {
        setSelectedProvider(newProvider);

        // Update availability map for the new provider
        const newAvailMap: Record<string, Availability> = {};
        newProvider.availabilities.forEach((availability) => {
            newAvailMap[availability.date] = availability;
        });
        setSelectedProviderAvailMap(newAvailMap);
    };

    const handleBackToRoster = () => {
        router.push("/");
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={handleBackToRoster}
                    className="mb-4 flex items-center text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                    ← Back to Roster
                </button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Provider Calendar
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {selectedProvider?.name} -{" "}
                            {selectedProvider?.clinic_details.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Provider Selection Sidebar + Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
                {/* Provider Selection Sidebar */}
                <div className="bg-white border rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                        Select Provider
                    </h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {allProviders.map((prov) => (
                            <button
                                key={prov.id}
                                onClick={() => handleProviderChange(prov)}
                                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                    selectedProvider?.id === prov.id
                                        ? "bg-blue-50 border-blue-200 text-blue-900"
                                        : "hover:bg-gray-50 border-gray-200"
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={prov.image}
                                        alt={prov.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm truncate">
                                            {prov.name}
                                        </div>
                                        <div className="text-xs text-gray-500 truncate">
                                            {prov.clinic_details.name}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {prov.provider_usertype} •{" "}
                                            {prov.is_inhouse
                                                ? "In-house"
                                                : "External"}
                                        </div>
                                    </div>
                                    {selectedProvider?.id === prov.id && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 pt-4 border-t">
                        <div className="text-xs text-gray-500 mb-2">
                            You can search up to 5 providers to view their
                            availability specifically.
                        </div>
                        <div className="flex space-x-4 text-xs">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-100 rounded mr-1"></div>
                                Online
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-orange-100 rounded mr-1"></div>
                                Offline
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-600 rounded mr-1"></div>
                                Booked
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white">
                    <CalendarGrid
                        dates={dates}
                        availabilities={selectedProviderAvailMap}
                        providerId={selectedProvider?.id}
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        allProviders={allProviders}
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
