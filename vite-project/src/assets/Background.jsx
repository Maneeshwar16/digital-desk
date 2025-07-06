import React from 'react';

const Background = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     text-[clamp(3rem,12vw,12rem)] whitespace-nowrap 
                     tracking-tight leading-none font-semibold text-zinc-900">
        Digital-Desk
      </h1>
    </div>
  );
};

export default Background;
