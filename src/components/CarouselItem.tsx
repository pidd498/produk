import React from 'react';
import { FantaItem, CarouselRole } from '../types';
import { CanSilhouette } from './CanSilhouette';

interface CarouselItemProps {
  item: FantaItem;
  role: CarouselRole;
  isMobile: boolean;
  shouldBounce: boolean;
  hasError: boolean;
  onError: () => void;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  role,
  isMobile,
  shouldBounce,
  hasError,
  onError,
}) => {
  // Map styles per active/inactive role as described in requirements.
  const getStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      aspectRatio: '0.6 / 1',
      transition: 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms, opacity 650ms, left 650ms, height 650ms, bottom 650ms',
      willChange: 'transform, filter, opacity',
    };

    switch (role) {
      case 'center':
        return {
          ...base,
          left: '50%',
          transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.35})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          height: isMobile ? '55%' : '80%',
          bottom: isMobile ? '22%' : '-5%',
        };
      case 'left':
        return {
          ...base,
          left: isMobile ? '20%' : '30%',
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'right':
        return {
          ...base,
          left: isMobile ? '80%' : '70%',
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'back':
        return {
          ...base,
          left: '50%',
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 0.9,
          zIndex: 5,
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'hidden':
      default:
        return {
          ...base,
          left: '50%',
          transform: 'translateX(-50%) scale(0.6)',
          filter: 'blur(8px)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 1,
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
        };
    }
  };

  return (
    <div style={getStyle()} className="flex flex-col items-center justify-end">
      {/* Glow effect at the bottom of the active can */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-[80px] rounded-full pointer-events-none transition-all duration-[650ms]"
        style={{
          background: item.panel,
          filter: 'blur(40px)',
          opacity: role === 'center' ? 0.5 : 0,
        }}
      />

      {/* Render the can image or the custom premium silhouette fallback */}
      <div 
        className={`w-full h-full relative flex items-end justify-center transition-transform duration-300 ${
          role === 'center' && shouldBounce ? 'animate-can-bounce' : ''
        }`}
      >
        {hasError ? (
          <CanSilhouette name={item.name} panelColor={item.panel} />
        ) : (
          <img
            src={item.src}
            alt={item.name}
            onError={onError}
            referrerPolicy="no-referrer"
            draggable={false}
            className={`w-full h-full object-contain select-none cursor-default drop-shadow-[0_25px_30px_rgba(0,0,0,0.45)] ${
              role === 'center' ? '' : 'object-bottom'
            }`}
            style={{
              objectPosition: role === 'center' ? 'center center' : 'bottom center'
            }}
          />
        )}
      </div>
    </div>
  );
};
