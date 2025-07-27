import { Provider, SessionEvent } from "./types";

const generateDatesForWeek = (startDate: Date = new Date()) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
};

const currentWeekDates = generateDatesForWeek();

export const sessionEvents: SessionEvent[] = [
    {
        id: "24217",
        title: "Therapy Session",
        type: "session",
        provider_id: 101,
        start_time: "10:00",
        end_time: "10:45",
        date: currentWeekDates[1],
        status: "active",
        location_type: "online",
        patient_name: "John Doe",
        notes: "Follow-up session",
    },
    {
        id: "24218",
        title: "MDT Meeting",
        type: "meeting",
        provider_id: 101,
        start_time: "14:00",
        end_time: "15:00",
        date: currentWeekDates[2],
        status: "active",
        location_type: "offline",
    },
    {
        id: "24219",
        title: "Google Calendar Event",
        type: "event",
        provider_id: 101,
        start_time: "11:00",
        end_time: "12:00",
        date: currentWeekDates[3],
        status: "active",
        location_type: "online",
    },
];

const mockData: Provider[] = [
    {
        name: "Dr. Aarushi Sharma",
        provider_usertype: "therapist",
        is_inhouse: true,
        id: 101,
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        clinic_details: {
            id: 1,
            name: "Bandra Clinic",
        },
        availabilities: [
            {
                date: currentWeekDates[0],
                online_slots: ["08:00", "08:15", "08:30", "09:00", "09:15"],
                offline_slots: ["13:00", "13:15", "13:30", "14:00"],
                both_slots: ["10:00", "10:15", "11:00", "12:00"],
                online_booked_slots: [
                    {
                        slot: "08:30",
                        session_id: "24217",
                        patient_name: "Alice Johnson",
                        status: "confirmed",
                        type: "session",
                    },
                ],
                offline_booked_slots: [
                    {
                        slot: "13:15",
                        session_id: "24218",
                        patient_name: "Bob Smith",
                        status: "confirmed",
                        type: "session",
                    },
                ],
                blocked_slots: [
                    {
                        slot: "15:00",
                        reason: "Unwell",
                        description: "Doctor unavailable due to illness",
                    },
                ],
            },
            {
                date: currentWeekDates[1],
                online_slots: ["08:00", "08:15", "09:00", "09:15", "16:00"],
                offline_slots: ["13:00", "13:15", "14:00", "14:15"],
                both_slots: ["10:00", "10:15", "11:00", "12:00"],
                online_booked_slots: [
                    {
                        slot: "10:00",
                        session_id: "24217",
                        patient_name: "John Doe",
                        status: "confirmed",
                        type: "session",
                    },
                ],
                offline_booked_slots: [],
                blocked_slots: [],
            },
            {
                date: currentWeekDates[2],
                online_slots: ["08:00", "08:15", "09:00", "15:00"],
                offline_slots: ["13:00", "13:15", "16:00", "16:15"],
                both_slots: ["10:00", "11:00", "12:00"],
                online_booked_slots: [],
                offline_booked_slots: [
                    {
                        slot: "14:00",
                        session_id: "24218",
                        type: "meeting",
                        status: "confirmed",
                    },
                ],
                blocked_slots: [],
            },
        ],
    },
    {
        name: "Pratishtha Trivedi Mirza",
        provider_usertype: "psychiatrist",
        is_inhouse: false,
        id: 102,
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        clinic_details: {
            id: 2,
            name: "Andheri Clinic",
        },
        availabilities: [
            {
                date: currentWeekDates[0],
                online_slots: ["08:00", "08:15", "08:30", "08:45"],
                offline_slots: ["09:00", "09:15", "09:30", "09:45"],
                both_slots: [
                    "10:00",
                    "10:15",
                    "10:30",
                    "10:45",
                    "11:00",
                    "11:15",
                    "11:30",
                    "11:45",
                ],
                online_booked_slots: [
                    {
                        slot: "08:30",
                        session_id: "24217",
                        patient_name: "Charlie Brown",
                        status: "confirmed",
                        type: "session",
                    },
                ],
                offline_booked_slots: [
                    {
                        slot: "09:15",
                        session_id: "24220",
                        patient_name: "Diana Prince",
                        status: "confirmed",
                        type: "session",
                    },
                ],
                blocked_slots: [
                    {
                        slot: "12:00",
                        reason: "Booking in progress...",
                        description: "Slot temporarily blocked for booking",
                    },
                ],
            },
            {
                date: currentWeekDates[1],
                online_slots: ["08:00", "08:15", "08:30", "08:45"],
                offline_slots: ["09:00", "09:15", "09:30", "09:45"],
                both_slots: [
                    "10:00",
                    "10:15",
                    "10:30",
                    "10:45",
                    "11:00",
                    "11:15",
                    "11:30",
                    "11:45",
                ],
                online_booked_slots: [],
                offline_booked_slots: [],
                blocked_slots: [
                    {
                        slot: "06:00",
                        reason: "Unwell",
                    },
                ],
            },
        ],
    },
    {
        name: "Dr. Amiya Banerjee",
        provider_usertype: "psychiatrist",
        is_inhouse: true,
        id: 103,
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        clinic_details: {
            id: 3,
            name: "Juhu Clinic",
        },
        availabilities: [
            {
                date: currentWeekDates[0],
                online_slots: ["14:00", "14:15", "14:30", "15:00"],
                offline_slots: ["15:00", "15:15", "16:00", "16:15"],
                both_slots: ["16:00", "17:00"],
                online_booked_slots: [
                    {
                        slot: "14:30",
                        session_id: "24221",
                        patient_name: "Eve Wilson",
                        status: "confirmed",
                        type: "session",
                    },
                ],
                offline_booked_slots: [
                    {
                        slot: "15:15",
                        session_id: "24222",
                        patient_name: "Frank Miller",
                        status: "pending",
                        type: "session",
                    },
                ],
                blocked_slots: [
                    {
                        slot: "17:00",
                        reason: "Other",
                        description: "Personal appointment",
                    },
                ],
            },
        ],
    },
];

export default mockData;
