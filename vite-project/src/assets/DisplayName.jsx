import React from 'react';

const DisplayName = ({ username }) => {
  return (
    <div className="max-w-md mx-auto bg-gray-900 p-4 rounded-t-lg">
      <h2 className="text-2xl font-bold text-white text-center">
        {username || 'Enter Your Name'}
      </h2>
    </div>
  );
};

export default DisplayName;
