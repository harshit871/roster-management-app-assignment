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

export const SLOT_COLORS = {
    available: "bg-gray-100 text-gray-700",
    online: "bg-green-100 text-green-800",
    offline: "bg-orange-100 text-orange-800",
    both: "bg-blue-100 text-blue-800",
    booked_online: "bg-blue-600 text-white",
    booked_offline: "bg-orange-600 text-white",
    blocked: "bg-red-100 text-red-800",
};

export interface FilterOption {
    key: string;
    label: string;
}
