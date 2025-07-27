import React from "react";
import { Tooltip } from "react-tooltip";
import {
    BookedSlot,
    BlockedSlot,
    SessionEvent,
} from "../../lib/types";
import { VideoIcon, MapPinIcon, CalendarIcon } from "lucide-react";

interface SlotCellProps {
    time: string;
    online: boolean;
    offline: boolean;
    both: boolean;
    blocked?: BlockedSlot;
    bookedOnline?: BookedSlot;
    bookedOffline?: BookedSlot;
    event?: SessionEvent;
}

const SlotCell: React.FC<SlotCellProps> = ({
    time,
    online,
    offline,
    both,
    blocked,
    bookedOnline,
    bookedOffline,
    event,
}) => {
    const getSlotDisplay = () => {
        // Priority: blocked > booked > available
        if (blocked) {
            return {
                bgClass: "bg-red-100 border-red-200 text-red-800",
                content: (
                    <div className="p-2 text-center">
                        <div className="text-xs font-medium truncate">
                            {blocked.reason}
                        </div>
                    </div>
                ),
                tooltip: `Blocked: ${blocked.reason}${
                    blocked.description ? ` - ${blocked.description}` : ""
                }`,
            };
        }

        const bookedSlot = bookedOnline || bookedOffline;
        const isOnlineBooked = Boolean(bookedOnline);

        if (bookedSlot || event) {
            const sessionId = event?.id || bookedSlot?.session_id || "";
            const patientName =
                event?.patient_name || bookedSlot?.patient_name || "";
            const eventTitle = event?.title || bookedSlot?.type || "Session";
            const locationType =
                event?.location_type || (isOnlineBooked ? "online" : "offline");

            const bgClass =
                isOnlineBooked || locationType === "online"
                    ? "bg-blue-600 text-white border-blue-700"
                    : locationType === "offline"
                    ? "bg-orange-600 text-white border-orange-700"
                    : "bg-purple-600 text-white border-purple-700";

            return {
                bgClass,
                content: (
                    <div className="p-2 space-y-1 min-h-[50px]">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">
                                #{sessionId}
                            </span>
                            {locationType === "online" ? (
                                <VideoIcon size={12} />
                            ) : locationType === "offline" ? (
                                <MapPinIcon size={12} />
                            ) : (
                                <CalendarIcon size={12} />
                            )}
                        </div>
                        <div className="text-xs font-medium truncate">
                            {eventTitle}
                        </div>
                        {patientName && (
                            <div className="text-xs opacity-90 truncate">
                                {patientName}
                            </div>
                        )}
                    </div>
                ),
                tooltip: `${eventTitle} - ${
                    patientName || sessionId
                } (${locationType})`,
            };
        }

        // Available slots
        if (both) {
            return {
                bgClass:
                    "bg-blue-100 border-blue-200 text-blue-800 hover:bg-blue-200",
                content: (
                    <div className="p-2 text-center">
                        <div className="text-xs">{time}</div>
                    </div>
                ),
                tooltip: "Available for both online and offline",
            };
        }

        if (offline) {
            return {
                bgClass:
                    "bg-orange-100 border-orange-200 text-orange-800 hover:bg-orange-200",
                content: (
                    <div className="p-2 text-center">
                        <div className="text-xs">{time}</div>
                    </div>
                ),
                tooltip: "Available for offline consultation",
            };
        }

        if (online) {
            return {
                bgClass:
                    "bg-green-100 border-green-200 text-green-800 hover:bg-green-200",
                content: (
                    <div className="p-2 text-center">
                        <div className="text-xs">{time}</div>
                    </div>
                ),
                tooltip: "Available for online consultation",
            };
        }

        // Default available slot
        return {
            bgClass:
                "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100",
            content: (
                <div className="p-2 text-center">
                    <div className="text-xs">{time}</div>
                </div>
            ),
            tooltip: "Time slot",
        };
    };

    const { bgClass, content, tooltip } = getSlotDisplay();

    return (
        <>
            <div
                className={`${bgClass} border rounded cursor-pointer transition-all duration-200 transform hover:scale-105 w-full h-full min-h-[50px]`}
                data-tooltip-id={`slot-${time}`}
                data-tooltip-content={tooltip}
            >
                {content}
            </div>
            <Tooltip id={`slot-${time}`} place="top" className="z-50" />
        </>
    );
};

export default SlotCell;
