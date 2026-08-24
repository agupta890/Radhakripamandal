import React from 'react';

const Loader = ({ message = 'लोड हो रहा है... राधे-राधे' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-saffron-200 animate-ping opacity-30"></div>
        <div className="w-16 h-16 rounded-full border-4 border-t-saffron-600 border-r-gold-500 border-b-maroon-700 border-l-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-xl">
          🪷
        </div>
      </div>
      <p className="text-maroon-900 font-medium tracking-wide text-sm font-hindi animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
