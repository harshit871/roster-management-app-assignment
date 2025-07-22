import React from 'react';

const NoData: React.FC<{ message?: string }> = ({ message = 'No data available.' }) => (
  <div className="p-8 text-center text-gray-500">{message}</div>
);

export default NoData;