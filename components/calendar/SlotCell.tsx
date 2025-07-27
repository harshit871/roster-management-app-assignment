import React from "react";
import {
    BookedSlot,
    BlockedSlot,
    SessionEvent,
    SlotStatus,
    SLOT_COLORS,
} from "../../lib/types";
import { VideoIcon, MapPinIcon } from "lucide-react";
import Tooltip from "../ui/Tooltip";

interface SlotCellProps {
    time: string;
    online?: boolean;
    offline?: boolean;
    both?: boolean;
    blocked?: BlockedSlot;
    bookedOnline?: BookedSlot;
    bookedOffline?: BookedSlot;
    event?: SessionEvent;
    isTopRow?: boolean;
}

const SlotCell: React.FC<SlotCellProps> = ({
    time,
    online = false,
    offline = false,
    both = false,
    blocked,
    bookedOnline,
    bookedOffline,
    event,
    isTopRow = false,
}) => {
    const getSlotDisplay = () => {
        let status: SlotStatus = "available";
        let content: React.ReactNode = time;
        let tooltip = `${time} - Available`;

        if (blocked) {
            status = "blocked";
            content = time;
            tooltip = `${time} - Blocked: ${blocked.reason}`;
        } else if (bookedOnline) {
            status = "booked_online";
            content = (
                <div className="text-center w-full ">
                    <div className="text-xs font-bold leading-tight">
                        #{bookedOnline.session_id}
                    </div>
                    {event && (
                        <>
                            <div className="text-xs truncate leading-tight mt-0.5">
                                {event.title}
                            </div>
                            {event.patient_name && (
                                <div className="text-xs truncate leading-tight opacity-90">
                                    {event.patient_name}
                                </div>
                            )}
                        </>
                    )}
                    <VideoIcon size={8} className="mx-auto mt-0.5" />
                </div>
            );
            tooltip = `${time} - Online Session #${bookedOnline.session_id}${
                event ? ` - ${event.title}` : ""
            }${event?.patient_name ? ` with ${event.patient_name}` : ""}`;
        } else if (bookedOffline) {
            status = "booked_offline";
            content = (
                <div className="text-center w-full">
                    <div className="text-xs font-bold leading-tight">
                        #{bookedOffline.session_id}
                    </div>
                    {event && (
                        <>
                            <div className="text-xs truncate leading-tight mt-0.5">
                                {event.title}
                            </div>
                            {event.patient_name && (
                                <div className="text-xs truncate leading-tight opacity-90">
                                    {event.patient_name}
                                </div>
                            )}
                        </>
                    )}
                    <MapPinIcon size={8} className="mx-auto mt-0.5" />
                </div>
            );
            tooltip = `${time} - Offline Session #${bookedOffline.session_id}${
                event ? ` - ${event.title}` : ""
            }${event?.patient_name ? ` with ${event.patient_name}` : ""}`;
        } else if (both) {
            status = "both";
            content = <div className="text-xs font-medium">{time}</div>;
            tooltip = `${time} - Available for both online and offline`;
        } else if (online) {
            status = "online";
            content = <div className="text-xs font-medium">{time}</div>;
            tooltip = `${time} - Available online only`;
        } else if (offline) {
            status = "offline";
            content = <div className="text-xs font-medium">{time}</div>;
            tooltip = `${time} - Available offline only`;
        }

        return { status, content, tooltip };
    };

    const { status, content, tooltip } = getSlotDisplay();
    const colorClass = SLOT_COLORS[status];

    const tooltipPosition = isTopRow ? "bottom" : "top";

    return (
        <Tooltip content={tooltip} position={tooltipPosition}>
            <div
                className={`
                    relative min-h-8 max-h-fit rounded-lg px-0.5 py-0.5 text-xs font-medium cursor-pointer
                    transition-all duration-200 hover:shadow-sm hover:scale-105
                    flex flex-col items-center justify-center
                    border border-white/20
                    ${colorClass}
                    ${
                        bookedOnline || bookedOffline
                            ? "ring-1 ring-white/30"
                            : ""
                    }
                `}
            >
                {content}

                {(bookedOnline || bookedOffline) && (
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/70 rounded-full"></div>
                )}
            </div>
        </Tooltip>
    );
};

export default SlotCell;
