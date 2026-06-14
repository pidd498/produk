import React from 'react';

interface CanSilhouetteProps {
  name: string;
  panelColor: string;
}

export const CanSilhouette: React.FC<CanSilhouetteProps> = ({ name, panelColor }) => {
  return (
    <div 
      className="w-full h-full rounded-2xl flex flex-col justify-between items-center p-4 relative overflow-hidden border border-white/20 shadow-2xl"
      style={{
        background: `linear-gradient(145deg, ${panelColor}D0 0%, #1c0022E0 100%)`,
      }}
    >
      {/* Metal top element mimicking can lip */}
      <div className="w-11/12 h-3 rounded-full border border-white/30 bg-neutral-300/40 opacity-70 flex items-center justify-center mt-1 z-10 shadow-inner" />

      {/* Gloss and reflections */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/15 to-transparent skew-x-6 transform origin-top-left pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/12 h-full bg-white/5 pointer-events-none" />

      {/* Vertical flavor name decoration */}
      <div className="font-display text-white text-2xl sm:text-3.5xl uppercase opacity-20 select-none tracking-widest writing-mode-vertical rotate-180 flex-1 flex items-center justify-center my-4 h-full">
        {name.replace('FANTA ', '')}
      </div>

      {/* Brand Badge in center of the silhouette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-20 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex flex-col items-center justify-center p-1 font-display transform -rotate-12 select-none shadow-lg">
        <span className="text-white text-xl tracking-wider drop-shadow-md">FANTA</span>
        <span className="text-[8px] font-sans font-black tracking-[0.2em] text-white/70">SPLASH</span>
      </div>

      {/* Bubbles particle layer inside the translucent can */}
      <div className="absolute inset-x-0 bottom-4 top-12 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-white/25 animate-ping" />
        <div className="absolute bottom-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-3 rounded-full bg-white/20" />
      </div>

      {/* Metal bottom element mimicking bottom can rim */}
      <div className="w-9/12 h-2.5 rounded-full bg-neutral-800/80 border border-white/15 z-10 shadow-md" />
    </div>
  );
};
