import React from 'react';
import { useRouter } from 'next/router';
import { Provider } from '../../lib/types';

interface ProviderCardProps { provider: Provider; }

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const { id, name, image, clinic_details } = provider;
  const router = useRouter();
  return (
    <div className="flex items-center p-4 border rounded space-x-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full" />
      
      <div className="flex-1">
        <div className="font-medium hover:underline cursor-pointer" onClick={() => router.push(`/${id}/calendar`)}>
          {name}
        </div>
        <div className="text-sm text-gray-500">{clinic_details.name}</div>
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