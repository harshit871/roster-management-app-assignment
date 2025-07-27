import React, { useMemo, useState } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarIcon,
    ListIcon,
} from "lucide-react";
import SlotCell from "./SlotCell";
import {
    TIME_SLOTS,
    Availability,
    Provider,
} from "../../lib/types";
import { sessionEvents } from "../../lib/mockData";

interface CalendarGridProps {
    dates: string[];
    availabilities: Record<string, Availability>;
    providerId?: number;
    viewMode?: 'calendar' | 'slots';
    onViewModeChange?: (mode: 'calendar' | 'slots') => void;
    allProviders?: Provider[];
}

const SlotsView: React.FC<{
  dates: string[];
  selectedDate: Date;
  allProviders?: Provider[];
  onDateChange: (date: Date) => void;
}> = ({ dates, selectedDate, allProviders = [], onDateChange }) => {
    const [timeWindow, setTimeWindow] = useState<"8am-12pm" | "12pm-6pm">(
        "8am-12pm"
    );

    const timeSlots =
        timeWindow === "8am-12pm"
            ? TIME_SLOTS.slice(0, 16) // 8:00 to 12:00
            : TIME_SLOTS.slice(16, 40); // 12:00 to 18:00

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

    return (
        <div className="bg-white border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Provider Calendar</h2>
                    <div className="flex space-x-2">
                        <select
                            value={timeWindow}
                            onChange={(e) =>
                                setTimeWindow(
                                    e.target.value as "8am-12pm" | "12pm-6pm"
                                )
                            }
                            className="px-3 py-1 border rounded text-sm"
                        >
                            <option value="8am-12pm">8 AM - 12 PM</option>
                            <option value="12pm-6pm">12 PM - 6 PM</option>
                        </select>
                    </div>
                </div>

                {/* Date Navigation */}
                <div className="flex items-center space-x-2 overflow-x-auto">
                    {dates.slice(0, 7).map((dateStr) => {
                        const date = new Date(dateStr);
                        const isSelected =
                            date.toDateString() === selectedDate.toDateString();
                        const isToday =
                            date.toDateString() === new Date().toDateString();

                        return (
                            <button
                                key={dateStr}
                                onClick={() => onDateChange(date)}
                                className={`px-4 py-2 rounded-lg border text-sm whitespace-nowrap transition-colors ${
                                    isSelected
                                        ? "bg-green-600 text-white border-green-600"
                                        : isToday
                                        ? "bg-green-100 text-green-800 border-green-200"
                                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                <div className="text-xs">
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
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">
                        Showing full schedules for{" "}
                        {formatDateForTitle(selectedDate)}
                    </h3>
                    <p className="text-sm text-gray-600">
                        Showing slots in the{" "}
                        {timeWindow
                            .replace("am-", " am to ")
                            .replace("pm", " pm")}{" "}
                        window.
                    </p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center space-x-6 mb-6 text-sm">
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-green-100 rounded mr-2"></span>
                        Online
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-orange-100 rounded mr-2"></span>
                        Offline
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-blue-100 rounded mr-2"></span>
                        Online+Offline
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-blue-600 rounded mr-2"></span>
                        Online Booked
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-orange-600 rounded mr-2"></span>
                        Offline Booked
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 bg-red-100 rounded mr-2"></span>
                        Blocked
                    </div>
                </div>

                {/* Providers List */}
                <div className="space-y-6">
                    {allProviders.map((provider) => {
                        const availability = getProviderAvailabilityForDate(
                            provider,
                            selectedDate
                        );

                        return (
                            <div
                                key={provider.id}
                                className="border rounded-lg p-4"
                            >
                                {/* Provider Info */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={provider.image}
                                            alt={provider.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium text-lg">
                                                {provider.name}
                                            </h4>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <span>
                                                    {
                                                        provider.clinic_details
                                                            .name
                                                    }
                                                </span>
                                                <span>•</span>
                                                <span className="capitalize">
                                                    {provider.provider_usertype}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="text-orange-600 hover:text-orange-700 font-medium">
                                        View Calendar →
                                    </button>
                                </div>

                                {/* Time Slots Grid */}
                                {availability ? (
                                    <div className="grid grid-cols-[auto_1fr] gap-4">
                                        {/* Navigation arrows */}
                                        <div className="flex flex-col space-y-2 pt-8">
                                            <button className="p-2 hover:bg-gray-100 rounded">
                                                <ChevronLeftIcon size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded">
                                                <ChevronRightIcon size={16} />
                                            </button>
                                        </div>

                                        {/* Slots grid */}
                                        <div className="overflow-x-auto">
                                            <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-1 min-w-max">
                                                {timeSlots.map((slot) => {
                                                    const blockedSlot =
                                                        availability.blocked_slots.find(
                                                            (b) =>
                                                                b.slot === slot
                                                        );
                                                    const bookedOnline =
                                                        availability.online_booked_slots.find(
                                                            (b) =>
                                                                b.slot === slot
                                                        );
                                                    const bookedOffline =
                                                        availability.offline_booked_slots.find(
                                                            (b) =>
                                                                b.slot === slot
                                                        );

                                                    return (
                                                        <SlotCell
                                                            key={slot}
                                                            time={slot}
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
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No availability data for this date
                                    </div>
                                )}
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
    viewMode = 'calendar' as 'calendar' | 'slots',
    onViewModeChange,
    allProviders = [],
}) => {
    const [currentWeekStart, setCurrentWeekStart] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date(dates[0]));

    // Get events for the current provider
    const providerEvents = useMemo(() => {
        return sessionEvents.filter((event) =>
            providerId ? event.provider_id === providerId : true
        );
    }, [providerId]);

    // Current week dates (5 days)
    const currentWeek = useMemo(() => {
        return dates.slice(currentWeekStart, currentWeekStart + 5).map(dateStr => new Date(dateStr));
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

    if (viewMode === 'slots') {
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
        <div className="bg-white border rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onPrevWeek}
                        className="p-2 hover:bg-gray-200 rounded"
                    >
                        <ChevronLeftIcon size={16} />
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
                    >
                        <ChevronRightIcon size={16} />
                    </button>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onViewModeChange?.('slots')}
                        className={`p-2 rounded ${
                            viewMode?.includes('slot')
                                ? 'bg-blue-100 text-blue-600'
                                : 'hover:bg-gray-200'
                        }`}
                        title="Slots View"
                    >
                        <ListIcon size={16} />
                    </button>
                    <button
                        onClick={() => onViewModeChange?.('calendar')}
                        className={`p-2 rounded ${
                            viewMode?.includes('calendar')
                                ? 'bg-blue-100 text-blue-600'
                                : 'hover:bg-gray-200'
                        }`}
                        title="Calendar View"
                    >
                        <CalendarIcon size={16} />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto">
                {/* Day Headers */}
                <div className="grid grid-cols-[80px_repeat(5,minmax(120px,1fr))] border-b">
                    <div className="p-3 text-xs text-gray-500 font-medium">
                        Time
                    </div>
                    {currentWeek.map((date) => {
                        const { day, month, weekday } = formatDate(date);
                        const isToday =
                            date.toDateString() === new Date().toDateString();
                        return (
                            <div
                                key={date.toISOString()}
                                className={`p-3 text-center border-l ${
                                    isToday ? "bg-blue-50" : ""
                                }`}
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

                {/* Time Slots */}
                <div className="grid grid-cols-[80px_repeat(5,minmax(120px,1fr))]">
                    {TIME_SLOTS.map((slot) => (
                        <React.Fragment key={slot}>
                            {/* Time Label */}
                            <div className="p-3 text-xs text-gray-500 border-b border-l font-medium">
                                {slot}
                            </div>

                            {/* Slot Cells for each day */}
                            {currentWeek.map((date) => {
                                const dateKey = date
                                    .toISOString()
                                    .split("T")[0];
                                const dayAvail = availabilities[dateKey];
                                const event = getEventForSlot(date, slot);

                                return (
                                    <div
                                        key={`${dateKey}-${slot}`}
                                        className="border-b border-l p-1 min-h-[60px]"
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
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center space-x-6 p-4 border-t bg-gray-50 text-xs">
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-100 rounded mr-2"></span>
                    Online
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-orange-100 rounded mr-2"></span>
                    Offline
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-100 rounded mr-2"></span>
                    Online+Offline
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-600 rounded mr-2"></span>
                    Online Booked
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-orange-600 rounded mr-2"></span>
                    Offline Booked
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-100 rounded mr-2"></span>
                    Blocked
                </div>
            </div>
        </div>
    );
};

export default CalendarGrid;
