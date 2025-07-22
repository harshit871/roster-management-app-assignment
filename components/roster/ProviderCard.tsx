import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from '../../lib/types';
import SlotRow from './SlotRow';

interface ProviderCardProps { provider: Provider; }

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const { id, name, image, clinic_details, availabilities } = provider;
  const router = useRouter();
  return (
    <div className="flex items-center p-4 border rounded space-x-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full" />
      
      <div className="flex-1 min-w-0">
        <div className="font-medium hover:underline cursor-pointer truncate" onClick={() => router.push(`/${id}/calendar`)}>
          {name}
        </div>
        <div className="text-sm text-gray-500 mb-2 truncate">{clinic_details.name}</div>
        {availabilities?.length ? <SlotRow availability={availabilities[0]} /> : null}
      </div>
      <button
        className="text-orange-500 hover:underline"
        onClick={() => router.push(`/${id}/calendar`)}
      >
        View Calendar &rarr;
      </button>
    </div>
  );
};
export default ProviderCard;