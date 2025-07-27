import React from "react";
import {
    Availability,
    TIME_SLOTS,
    SLOT_COLORS,
    SlotStatus,
} from "../../lib/types";

interface SlotRowProps {
    availability: Availability;
    showTimeLabels?: boolean;
    maxSlots?: number;
}

const getSlotStatus = (slot: string, avail: Availability): SlotStatus => {
    // Check if blocked first
    if (avail.blocked_slots.find((b) => b.slot === slot)) return "blocked";

    // Check if booked
    if (avail.online_booked_slots.find((b) => b.slot === slot))
        return "booked_online";
    if (avail.offline_booked_slots.find((b) => b.slot === slot))
        return "booked_offline";

    // Check availability types
    if (avail.both_slots.includes(slot)) return "both";
    if (avail.offline_slots.includes(slot)) return "offline";
    if (avail.online_slots.includes(slot)) return "online";

    return "available";
};

const SlotRow: React.FC<SlotRowProps> = ({
    availability,
    showTimeLabels = true,
    maxSlots,
}) => {
    const slotsToShow = maxSlots ? TIME_SLOTS.slice(0, maxSlots) : TIME_SLOTS;

    return (
        <div className="flex space-x-1 overflow-x-auto py-1">
            {slotsToShow.map((slot) => {
                const status = getSlotStatus(slot, availability);
                const colorClass = SLOT_COLORS[status];
                const blockedSlot = availability.blocked_slots.find(
                    (b) => b.slot === slot
                );
                const bookedSlot =
                    availability.online_booked_slots.find(
                        (b) => b.slot === slot
                    ) ||
                    availability.offline_booked_slots.find(
                        (b) => b.slot === slot
                    );

                return (
                    <div
                        key={slot}
                        className={`${colorClass} text-[10px] rounded px-1 py-0.5 min-w-[40px] text-center whitespace-nowrap relative cursor-pointer transition-all hover:scale-105`}
                        title={
                            blockedSlot
                                ? `Blocked: ${blockedSlot.reason}`
                                : bookedSlot
                                ? `Booked: ${
                                      bookedSlot.patient_name ||
                                      bookedSlot.session_id
                                  }`
                                : `Available for ${status.replace("_", " ")}`
                        }
                    >
                        {showTimeLabels ? slot : "•"}
                        {bookedSlot && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full border border-current opacity-75"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default SlotRow;
