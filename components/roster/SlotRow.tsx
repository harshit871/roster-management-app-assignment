import React from 'react';
import { Availability, TIME_SLOTS } from '../../lib/types';

interface SlotRowProps {
  availability: Availability;
}

const slotBg = (slot: string, avail: Availability) => {
  if (avail.blocked_slots.find((b) => b.slot === slot)) return 'bg-red-100';
  if (avail.both_slots.includes(slot)) return 'bg-blue-100';
  if (avail.offline_slots.includes(slot)) return 'bg-orange-100';
  if (avail.online_slots.includes(slot)) return 'bg-emerald-100';
  return 'bg-gray-100';
};

const SlotRow: React.FC<SlotRowProps> = ({ availability }) => {
  return (
    <div className="flex space-x-1 overflow-x-auto py-1">
      {TIME_SLOTS.map((t) => (
        <div
          key={t}
          className={`${slotBg(t, availability)} text-[10px] rounded px-1 py-0.5 min-w-[40px] text-center whitespace-nowrap`}
        >
          {t}
        </div>
      ))}
    </div>
  );
};

export default SlotRow;
