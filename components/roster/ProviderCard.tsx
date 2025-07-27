import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from '../../lib/types';
import SlotRow from './SlotRow';
import { MapPinIcon, UserIcon, ClockIcon } from 'lucide-react';

interface ProviderCardProps { 
  provider: Provider;
  showFullSlots?: boolean;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, showFullSlots = false }) => {
  const { id, name, image, clinic_details, availabilities, provider_usertype, is_inhouse } = provider;
  const router = useRouter();
  
  // Get today's availability or the first available date
  const todayStr = new Date().toISOString().split('T')[0];
  const currentAvailability = availabilities.find(a => a.date === todayStr) || availabilities[0];
  
  // Calculate total available and booked slots
  const totalAvailable = currentAvailability ? 
    currentAvailability.online_slots.length + 
    currentAvailability.offline_slots.length + 
    currentAvailability.both_slots.length : 0;
    
  const totalBooked = currentAvailability ?
    currentAvailability.online_booked_slots.length +
    currentAvailability.offline_booked_slots.length : 0;

  const handleProviderClick = () => {
    router.push(`/${id}/calendar`);
  };

  const handleViewCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/${id}/calendar`);
  };

  return (
    <div className="flex items-start p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
      {/* Provider Image */}
      <div className="flex-shrink-0 mr-4">
        <img 
          src={image} 
          alt={name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" 
        />
      </div>
      
      {/* Provider Details */}
      <div className="flex-1 min-w-0">
        {/* Name and basic info */}
        <div className="mb-2">
          <h3 
            className="font-semibold text-lg hover:underline cursor-pointer text-gray-900 truncate"
            onClick={handleProviderClick}
          >
            {name}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
            <div className="flex items-center">
              <MapPinIcon size={14} className="mr-1" />
              <span className="truncate">{clinic_details.name}</span>
            </div>
            <div className="flex items-center">
              <UserIcon size={14} className="mr-1" />
              <span className="capitalize">{provider_usertype}</span>
              <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                {is_inhouse ? 'In-house' : 'External'}
              </span>
            </div>
          </div>
        </div>

        {/* Availability Stats */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <ClockIcon size={14} className="mr-1" />
            <span>{totalAvailable} slots available</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>
            <span>{totalBooked} booked</span>
          </div>
        </div>
        
        {/* Slots Display */}
        {currentAvailability && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">
              {currentAvailability.date === todayStr ? 'Today\'s Schedule' : `Schedule for ${currentAvailability.date}`}
            </div>
            <SlotRow 
              availability={currentAvailability} 
              maxSlots={showFullSlots ? undefined : 12}
              showTimeLabels={!showFullSlots}
            />
            {!showFullSlots && totalAvailable > 12 && (
              <div className="text-xs text-gray-500 mt-1">
                +{totalAvailable - 12} more slots available
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* View Calendar Button */}
      <div className="flex-shrink-0 ml-4">
        <button
          className="px-4 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md transition-colors border border-orange-200 hover:border-orange-300 font-medium"
          onClick={handleViewCalendar}
        >
          View Calendar →
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;