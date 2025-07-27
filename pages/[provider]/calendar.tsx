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


    const dates = Array.from({ length: 14 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString();
    });


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
        },
    };
};

const CalendarPage: NextPage<CalendarPageProps> = ({
    provider,
    dates,
    availMap,
}) => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<"calendar" | "slots">("calendar");

    if (router.isFallback) return <Loader />;
    if (!provider) return <NoData message="Provider not found" />;

    const handleBackToRoster = () => {
        window.location.href = "/";
    };

    return (
        <div className="max-w-7xl mx-auto p-4">

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
                            {provider.name} - {provider.clinic_details.name}
                        </p>
                    </div>
                </div>
            </div>


            <div className="bg-white">
                <CalendarGrid
                    dates={dates}
                    availabilities={availMap}
                    providerId={provider.id}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    allProviders={[provider]}
                />
            </div>
        </div>
    );
};

export default CalendarPage;
