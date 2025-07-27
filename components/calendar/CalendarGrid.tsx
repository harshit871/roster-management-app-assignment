import React, { useMemo, useState } from "react";
import SlotCell from "./SlotCell";
import {
    TIME_SLOTS,
    Availability,
    Provider,
    LEGEND_ITEMS,
} from "../../lib/types";
import { sessionEvents } from "../../lib/mockData";
import Image from "next/image";
import { useRouter } from "next/router";

interface CalendarGridProps {
    dates: string[];
    availabilities: Record<string, Availability>;
    providerId?: number;
    viewMode?: "calendar" | "slots";
    onViewModeChange?: (mode: "calendar" | "slots") => void;
    allProviders?: Provider[];
}

const LegendComponent: React.FC = () => (
    <div className="flex flex-wrap text-[#4c4c4c] items-center gap-y-2 gap-x-1 sm:gap-x-0 mb-6 text-sm">
        {LEGEND_ITEMS.map((item) => (
            <div key={item.key} className="flex items-center basis-1/3">
                <div
                    className="w-4 h-2 rounded-2xl mr-2"
                    style={{ backgroundColor: item.color }}
                />
                <span className="py-1 rounded-full text-xs">{item.label}</span>
            </div>
        ))}
    </div>
);

const SlotsView: React.FC<{
    dates: string[];
    selectedDate: Date;
    allProviders?: Provider[];
    onDateChange: (date: Date) => void;
}> = ({ dates, selectedDate, allProviders = [], onDateChange }) => {
    const router = useRouter();
    const [currentWeekStart, setCurrentWeekStart] = useState(0);
    const [providerSlotStarts, setProviderSlotStarts] = useState<
        Record<number, number>
    >({});
    const slotsPerPage = 16;

    const currentWeek = useMemo(() => {
        return dates
            .slice(currentWeekStart, currentWeekStart + 7)
            .map((dateStr) => new Date(dateStr));
    }, [dates, currentWeekStart]);

    const onPrevWeek = () =>
        setCurrentWeekStart((prev) => Math.max(0, prev - 7));
    const onNextWeek = () =>
        setCurrentWeekStart((prev) => Math.min(dates.length - 7, prev + 7));

    const getProviderSlotStart = (providerId: number) =>
        providerSlotStarts[providerId] || 0;

    const onPrevSlots = (providerId: number) => {
        setProviderSlotStarts((prev) => ({
            ...prev,
            [providerId]: Math.max(0, (prev[providerId] || 0) - slotsPerPage),
        }));
    };

    const onNextSlots = (providerId: number) => {
        setProviderSlotStarts((prev) => ({
            ...prev,
            [providerId]: Math.min(
                TIME_SLOTS.length - slotsPerPage,
                (prev[providerId] || 0) + slotsPerPage
            ),
        }));
    };

    const formatDateForTitle = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
    };

    const getProviderAvailabilityForDate = (provider: Provider, date: Date) => {
        const dateStr = date.toISOString().split("T")[0];
        return provider.availabilities.find((a) => a.date === dateStr);
    };

    const getProviderStats = (provider: Provider, date: Date) => {
        const availability = getProviderAvailabilityForDate(provider, date);
        if (!availability) return { online: 0, offline: 0 };

        return {
            online:
                availability.online_slots.length +
                availability.both_slots.length,
            offline:
                availability.offline_slots.length +
                availability.both_slots.length,
        };
    };

    const handleViewCalendar = (providerId: number) => {
        try {
            if (
                providerId &&
                typeof providerId === "number" &&
                providerId > 0
            ) {
                router.push(`/${providerId}/calendar`);
            } else {
                console.error(
                    "Invalid provider ID:",
                    providerId,
                    typeof providerId
                );
            }
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    return (
        <div className="bg-white rounded-lg overflow-visible">
            <div className="mb-4">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                    <button
                        onClick={onPrevWeek}
                        className="border border-[#e0e0e0] rounded-full flex items-center justify-center w-8 h-8 cursor-pointer flex-shrink-0 hover:bg-gray-50"
                        title="Previous week"
                    >
                        <Image
                            src="/prevIcon.svg"
                            alt="Previous Week"
                            width={6}
                            height={12}
                        />
                    </button>

                    <div className="flex space-x-2 overflow-x-auto flex-1">
                        {currentWeek.map((date) => {
                            const isSelected =
                                date.toDateString() ===
                                selectedDate.toDateString();
                            const isToday =
                                date.toDateString() ===
                                new Date().toDateString();

                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => onDateChange(date)}
                                    className={`w-full px-3 py-2 rounded-lg border-[#e0e0e0] text-sm whitespace-nowrap transition-colors cursor-pointer ${
                                        isSelected
                                            ? "bg-[#4e6137] text-white border-[#4e6137]"
                                            : isToday
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : "bg-white border-[#e0e0e0] hover:bg-gray-50"
                                    }`}
                                    title={`Select ${date.toLocaleDateString()}`}
                                >
                                    <div
                                        className={`text-xs ${
                                            isSelected
                                                ? "text-white"
                                                : "text-[#9e9e9e]"
                                        }`}
                                    >
                                        {date.toLocaleDateString("en-US", {
                                            weekday: "short",
                                        })}
                                    </div>
                                    <div className="font-medium">
                                        {date.getDate()}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={onNextWeek}
                        className="border border-[#e0e0e0] rounded-full flex items-center justify-center w-8 h-8 cursor-pointer flex-shrink-0 hover:bg-gray-50"
                        title="Next week"
                    >
                        <Image
                            src="/nextIcon.svg"
                            alt="Next Week"
                            width={6}
                            height={10}
                        />
                    </button>
                </div>
            </div>

            <div className="space-y-6 overflow-visible">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xs sm:text-lg font-medium mb-2">
                            Showing full schedules for{" "}
                            {formatDateForTitle(selectedDate)}
                        </h3>
                        <p className="text-sm text-gray-600">
                            Showing slots in the 8 am to 12 am window.
                        </p>
                    </div>

                    <LegendComponent />
                </div>

                <div className="space-y-6">
                    {allProviders.map((provider) => {
                        const availability = getProviderAvailabilityForDate(
                            provider,
                            selectedDate
                        );
                        const stats = getProviderStats(provider, selectedDate);
                        const currentSlotStart = getProviderSlotStart(
                            provider.id
                        );

                        return (
                            <div
                                key={provider.id}
                                className="border border-[#e0e0e0] rounded-lg p-4 overflow-visible"
                            >
                                <div className="flex flex-col sm:flex-row sm:space-x-4">
                                    <div className="w-full sm:w-[20%] mb-4 sm:mb-0">
                                        <div className="flex flex-col">
                                            <img
                                                src={provider.image}
                                                alt={provider.name}
                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0 mb-2"
                                            />
                                            <div className="min-w-0 mb-4">
                                                <h4 className="font-semibold text-[#607447] text-sm truncate underline mb-2">
                                                    {provider.name}
                                                </h4>

                                                <div className="flex items-center space-x-2 mt-1">
                                                    <div className="flex items-center space-x-1 bg-[#f7f7f7] rounded-full px-2 py-1">
                                                        <Image
                                                            src="/online.svg"
                                                            alt="Online"
                                                            width={16}
                                                            height={16}
                                                        />
                                                        <span className="text-xs text-gray-600">
                                                            {stats.online}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1 bg-[#f7f7f7] rounded-full px-2 py-1">
                                                        <Image
                                                            src="/offline.svg"
                                                            alt="Offline"
                                                            width={16}
                                                            height={16}
                                                        />
                                                        <span className="text-xs text-gray-600">
                                                            {stats.offline}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    handleViewCalendar(
                                                        provider.id
                                                    )
                                                }
                                                className="text-[#E76943] hover:text-orange-700 font-medium self-start text-sm underline cursor-pointer"
                                            >
                                               View Calendar →
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-[80%]">
                                        {availability ? (
                                            <div className="space-y-2 h-full overflow-visible">
                                                <div className="flex items-center h-full">
                                                    <div
                                                        onClick={() =>
                                                            onPrevSlots(
                                                                provider.id
                                                            )
                                                        }
                                                        className={`flex items-center justify-center cursor-pointer p-3 hover:bg-gray-100 rounded-l-xl border border-[#e0e0e0] flex-shrink-0 h-full ${
                                                            currentSlotStart ===
                                                            0
                                                                ? "cursor-not-allowed opacity-50"
                                                                : ""
                                                        }`}
                                                        title="Previous slots"
                                                    >
                                                        <Image
                                                            src="/prevIcon.svg"
                                                            alt="Previous"
                                                            width={8}
                                                            height={8}
                                                        />
                                                    </div>

                                                    <div className="flex-1 overflow-visible">
                                                        <div className="grid grid-cols-4 gap-2 h-full border-y border-[#e0e0e0] p-3 overflow-visible">
                                                            {TIME_SLOTS.slice(
                                                                currentSlotStart,
                                                                currentSlotStart +
                                                                    slotsPerPage
                                                            ).map(
                                                                (
                                                                    slot,
                                                                    index
                                                                ) => {
                                                                    const blockedSlot =
                                                                        availability.blocked_slots.find(
                                                                            (
                                                                                b
                                                                            ) =>
                                                                                b.slot ===
                                                                                slot
                                                                        );
                                                                    const bookedOnline =
                                                                        availability.online_booked_slots.find(
                                                                            (
                                                                                b
                                                                            ) =>
                                                                                b.slot ===
                                                                                slot
                                                                        );
                                                                    const bookedOffline =
                                                                        availability.offline_booked_slots.find(
                                                                            (
                                                                                b
                                                                            ) =>
                                                                                b.slot ===
                                                                                slot
                                                                        );
                                                                    const isTopRow =
                                                                        index <
                                                                        4;

                                                                    return (
                                                                        <SlotCell
                                                                            key={
                                                                                slot
                                                                            }
                                                                            time={
                                                                                slot
                                                                            }
                                                                            online={availability.online_slots.includes(
                                                                                slot
                                                                            )}
                                                                            offline={availability.offline_slots.includes(
                                                                                slot
                                                                            )}
                                                                            both={availability.both_slots.includes(
                                                                                slot
                                                                            )}
                                                                            blocked={
                                                                                blockedSlot
                                                                            }
                                                                            bookedOnline={
                                                                                bookedOnline
                                                                            }
                                                                            bookedOffline={
                                                                                bookedOffline
                                                                            }
                                                                            isTopRow={
                                                                                isTopRow
                                                                            }
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div
                                                        onClick={() =>
                                                            onNextSlots(
                                                                provider.id
                                                            )
                                                        }
                                                        className={`flex items-center justify-center cursor-pointer p-3 hover:bg-gray-100 rounded-r-xl border border-[#e0e0e0] h-full ${
                                                            currentSlotStart +
                                                                slotsPerPage >=
                                                            TIME_SLOTS.length
                                                                ? "cursor-not-allowed opacity-50"
                                                                : ""
                                                        }`}
                                                        title="Next slots"
                                                    >
                                                        <Image
                                                            src="/nextIcon.svg"
                                                            alt="Next"
                                                            width={8}
                                                            height={8}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                No availability data for this
                                                date
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CalendarGrid: React.FC<CalendarGridProps> = ({
    dates,
    availabilities,
    providerId,
    viewMode = "calendar" as "calendar" | "slots",
    allProviders = [],
}) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date(dates[0]));

    const providerEvents = useMemo(() => {
        return sessionEvents.filter((event) =>
            providerId ? event.provider_id === providerId : true
        );
    }, [providerId]);

    const currentWeek = useMemo(() => {
        return dates
            .slice(currentWeekStart, currentWeekStart + 5)
            .map((dateStr) => new Date(dateStr));
    }, [dates, currentWeekStart]);

    const onPrevWeek = () =>
        setCurrentWeekStart((prev) => Math.max(0, prev - 5));
    const onNextWeek = () =>
        setCurrentWeekStart((prev) => Math.min(dates.length - 5, prev + 5));

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        const weekday = date.toLocaleString("default", { weekday: "short" });
        return { day, month, weekday };
    };

    const getEventForSlot = (date: Date, slot: string) => {
        const dateStr = date.toISOString().split("T")[0];
        return providerEvents.find(
            (event) => event.date === dateStr && event.start_time === slot
        );
    };

    if (viewMode === "slots") {
        return (
            <SlotsView
                dates={dates}
                selectedDate={selectedDate}
                allProviders={allProviders}
                onDateChange={setSelectedDate}
            />
        );
    }

    return (
        <div className="bg-white border border-[#e0e0e0] rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#e0e0e0] bg-gray-50">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onPrevWeek}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Previous week"
                    >
                        <Image
                            src="/prevIcon.svg"
                            alt="Previous"
                            width={8}
                            height={8}
                        />
                    </button>
                    <div className="text-lg font-medium">
                        {currentWeek[0]?.toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </div>
                    <button
                        onClick={onNextWeek}
                        className="p-2 hover:bg-gray-200 rounded"
                        title="Next week"
                    >
                        <Image
                            src="/nextIcon.svg"
                            alt="Next"
                            width={8}
                            height={8}
                        />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="grid grid-cols-[80px_repeat(5,minmax(120px,1fr))] border-b border-[#e0e0e0]">
                    <div className="p-3 text-xs text-gray-500 font-medium border-r border-[#e0e0e0]">
                        Time
                    </div>
                    {currentWeek.map((date) => {
                        const { day, month, weekday } = formatDate(date);
                        const isToday =
                            date.toDateString() === new Date().toDateString();
                        return (
                            <div
                                key={date.toISOString()}
                                className={`p-3 text-center border-l border-[#e0e0e0] ${
                                    isToday ? "bg-blue-50" : ""
                                }`}
                                title={date.toLocaleDateString()}
                            >
                                <div className="text-xs text-gray-500">
                                    {weekday}
                                </div>
                                <div
                                    className={`text-lg font-medium ${
                                        isToday ? "text-blue-600" : ""
                                    }`}
                                >
                                    {day}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {month}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-[80px_repeat(5,minmax(120px,1fr))]">
                    {TIME_SLOTS.map((slot, slotIndex) => (
                        <React.Fragment key={slot}>
                            <div className="p-3 text-xs text-gray-500 border-b border-[#e0e0e0] border-l border-[#e0e0e0] font-medium">
                                {slot}
                            </div>

                            {currentWeek.map((date) => {
                                const dateKey = date
                                    .toISOString()
                                    .split("T")[0];
                                const dayAvail = availabilities[dateKey];
                                const event = getEventForSlot(date, slot);
                                const isTopRow = slotIndex < 8;

                                return (
                                    <div
                                        key={`${dateKey}-${slot}`}
                                        className="border-b border-[#e0e0e0] border-l border-[#e0e0e0] p-1 min-h-[60px]"
                                    >
                                        {dayAvail && (
                                            <SlotCell
                                                time={slot}
                                                online={dayAvail.online_slots.includes(
                                                    slot
                                                )}
                                                offline={dayAvail.offline_slots.includes(
                                                    slot
                                                )}
                                                both={dayAvail.both_slots.includes(
                                                    slot
                                                )}
                                                blocked={dayAvail.blocked_slots.find(
                                                    (b) => b.slot === slot
                                                )}
                                                bookedOnline={dayAvail.online_booked_slots.find(
                                                    (b) => b.slot === slot
                                                )}
                                                bookedOffline={dayAvail.offline_booked_slots.find(
                                                    (b) => b.slot === slot
                                                )}
                                                event={event}
                                                isTopRow={isTopRow}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-center space-x-6 p-4 border-t border-[#e0e0e0] bg-gray-50 text-xs">
                {LEGEND_ITEMS.map((item) => (
                    <div key={item.key} className="flex items-center">
                        <div
                            className="w-3 h-3 rounded mr-2"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarGrid;
