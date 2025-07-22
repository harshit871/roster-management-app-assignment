import React from 'react';
import ProviderCard from './ProviderCard';
import { Provider } from '../../lib/types';

interface ProviderListProps { providers: Provider[]; }

const ProviderList: React.FC<ProviderListProps> = ({ providers }) => {
  if (!providers.length) return <div className="p-4">No providers found.</div>;
  return (
    <div className="space-y-4">
      {providers.map((p) => (
        <ProviderCard key={p.id} provider={p} />
      ))}
    </div>
  );
};
export default ProviderList;