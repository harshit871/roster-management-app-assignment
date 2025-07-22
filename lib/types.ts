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
    online_slots: string[];
    offline_slots: string[];
    both_slots: string[];
    online_booked_slots: string[];
    offline_booked_slots: string[];
    blocked_slots: { slot: string; reason: string }[];
  }
  
  export const TIME_SLOTS = [
    '08:00','08:15','08:30','08:45', /* etc. */
  ];