import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

export default Loader;