import React, { useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'; // Todo: need to remove this
import SlotCell from './SlotCell';
import { TIME_SLOTS } from '../../lib/types'

interface CalendarGridProps {
  dates: Date[];
  availabilities: Record<string, {
    online_slots: string[];
    offline_slots: string[];
    both_slots: string[];
    blocked_slots: { slot: string; reason: string }[];
  }>;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ dates, availabilities }) => {
  const [activeDateIndex, setActiveDateIndex] = useState(0);

  // Current viewport dates
  const visibleDates = useMemo(() => dates.slice(activeDateIndex, activeDateIndex + 5), [dates, activeDateIndex]);

  const onPrev = () => setActiveDateIndex((i) => Math.max(0, i - 1));
  const onNext = () => setActiveDateIndex((i) => Math.min(dates.length - 5, i + 1));

  return (
    <div className="overflow-auto border rounded-lg">
      {/* Header nav */}
      <div className="flex items-center px-4 py-2">
        <button onClick={onPrev} className="p-2 hover:bg-gray-100">
          <ChevronLeftIcon size={16} />
        </button>
        {visibleDates.map((date) => (
          <div
            key={date.toDateString()}
            className={`mx-1 p-2 rounded-lg ${date === visibleDates[0] ? 'bg-emerald-600 text-white' : 'bg-white border'}`}
          >
            <div className="text-xs">{date.toLocaleString('default', { weekday: 'short' })}</div>
            <div className="text-sm font-medium">{date.getDate()}</div>
          </div>
        ))}
        <button onClick={onNext} className="p-2 hover:bg-gray-100">
          <ChevronRightIcon size={16} />
        </button>
      </div>

      {/* Legend */}
      <div className="flex justify-end items-center space-x-4 px-4 py-2 text-xs">
        <div className="flex items-center"><span className="w-3 h-3 bg-emerald-100 rounded mr-1"></span>Online</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-orange-100 rounded mr-1"></span>Offline</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-blue-100 rounded mr-1"></span>Online+Offline</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-gray-100 rounded mr-1"></span>Available</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-red-100 rounded mr-1"></span>Blocked</div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[80px_repeat(5,minmax(100px,1fr))]">
        {/* Time labels */}
        {TIME_SLOTS.map((slot) => (
          <div key={slot} className="p-2 text-xs text-gray-500">
            {slot}
          </div>
        ))}

        {/* Slot columns */}
        {visibleDates.map((date) => {
          const key = date.toISOString().split('T')[0];
          const dayAvail = availabilities[key] || { online_slots: [], offline_slots: [], both_slots: [], blocked_slots: [] };
          return TIME_SLOTS.map((slot) => (
            <div key={key + slot} className="p-1">
              <SlotCell
                time={slot}
                online={dayAvail.online_slots.includes(slot)}
                offline={dayAvail.offline_slots.includes(slot)}
                both={dayAvail.both_slots.includes(slot)}
                blocked={dayAvail.blocked_slots.find((b) => b.slot === slot)}
              />
            </div>
          ));
        })}
      </div>
    </div>
);
};

export default CalendarGrid;