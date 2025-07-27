export interface Provider {
    id: number;
    name: string;
    provider_usertype: string;
    is_inhouse: boolean;
    image: string;
    clinic_details: { id: number; name: string };
    availabilities: Availability[];
}

export interface Availability {
    date: string;
    online_slots: string[];
    offline_slots: string[];
    both_slots: string[];
    online_booked_slots: BookedSlot[];
    offline_booked_slots: BookedSlot[];
    blocked_slots: BlockedSlot[];
}

export interface BookedSlot {
    slot: string;
    session_id: string;
    patient_name?: string;
    status: "confirmed" | "pending" | "cancelled";
    type: "session" | "event" | "meeting";
}

export interface BlockedSlot {
    slot: string;
    reason: string;
    description?: string;
}

export interface SessionEvent {
    id: string;
    title: string;
    type: "session" | "meeting" | "event";
    provider_id: number;
    start_time: string;
    end_time: string;
    date: string;
    status: "active" | "completed" | "cancelled" | "pending";
    location_type: "online" | "offline" | "both";
    patient_name?: string;
    notes?: string;
}

export type SlotStatus =
    | "available"
    | "online"
    | "offline"
    | "both"
    | "booked_online"
    | "booked_offline"
    | "blocked";

export const TIME_SLOTS = [
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
];

// Updated color mapping to match the new design
export const SLOT_COLORS = {
    available: "bg-gray-100 text-gray-700",
    online: "bg-[#97CC55] text-white",
    offline: "bg-[#E76943] text-white",
    both: "bg-[#5AA9E8] text-white",
    booked_online: "bg-[#355E80] text-white",
    booked_offline: "bg-[#80490B] text-white",
    blocked: "bg-[#C73031] text-white",
};

// Legend configuration for reusability
export const LEGEND_ITEMS = [
    { key: "online", label: "Online", color: "#97CC55" },
    { key: "offline", label: "Offline", color: "#E76943" },
    { key: "both", label: "Online+Offline", color: "#5AA9E8" },
    { key: "booked_online", label: "Online Booked", color: "#355E80" },
    { key: "booked_offline", label: "Offline Booked", color: "#80490B" },
    { key: "blocked", label: "Blocked", color: "#C73031" },
];

export interface FilterOption {
    key: string;
    label: string;
}
