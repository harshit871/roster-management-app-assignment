import React from 'react';
import { Tooltip } from 'react-tooltip';

interface SlotCellProps {
  time: string;
  online: boolean;
  offline: boolean;
  both: boolean;
  blocked?: { slot: string; reason: string };
}

const SlotCell: React.FC<SlotCellProps> = ({ time, online, offline, both, blocked }) => {
  let bgClass = 'bg-gray-100';
  if (blocked) bgClass = 'bg-red-100';
  else if (both) bgClass = 'bg-blue-100';
  else if (offline) bgClass = 'bg-orange-100';
  else if (online) bgClass = 'bg-emerald-100';

  return (
    <div
      className={`${bgClass} text-xs rounded-lg py-1 px-2 cursor-pointer relative`}
      data-tooltip-id={blocked ? `tooltip-${time}` : undefined}
    >
      {time}
      {blocked && (
        <Tooltip id={`tooltip-${time}`} place="top">
          {blocked.reason}
        </Tooltip>
      )}
    </div>
  );
};

export default SlotCell;