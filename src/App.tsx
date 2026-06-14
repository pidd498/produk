import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CarouselItem } from './components/CarouselItem';
import { FantaItem } from './types';

const IMAGES: FantaItem[] = [
  {
    src: 'https://raw.githubusercontent.com/pidd498/produk/main/Fanta_Grape_-_355mL___Candy_Funhouse_US-removebg-preview.png',
    bg: '#6A1FA0',
    panel: '#8B3DC0',
    name: 'FANTA GRAPE',
    ghost: 'GRAPE',
    tagline: 'Bold, sweet grape flavor. Deep purple. Caffeine free.',
  },
  {
    src: 'https://raw.githubusercontent.com/pidd498/produk/main/Fanta_orange_blikje-removebg-preview.png',
    bg: '#F47920',
    panel: '#F9953A',
    name: 'FANTA ORANGE',
    ghost: 'ORANGE',
    tagline: 'Bright citrus taste with a sweet, tangy finish.',
  },
  {
    src: 'https://raw.githubusercontent.com/pidd498/produk/main/download__4_-removebg-preview.png',
    bg: '#C2185B',
    panel: '#E91E8C',
    name: 'FANTA WILD CHERRY',
    ghost: 'CHERRY',
    tagline: 'Sweet cherry-forward with a slightly tart finish.',
  },
  {
    src: 'https://raw.githubusercontent.com/pidd498/produk/main/download__5_-removebg-preview.png',
    bg: '#D32F2F',
    panel: '#EF5350',
    name: 'FANTA STRAWBERRY',
    ghost: 'STRAWBERRY',
    tagline: 'Ripe strawberry flavor — sweet, fruity, caffeine free.',
  },
  {
    src: 'https://raw.githubusercontent.com/pidd498/produk/main/download__6_-removebg-preview.png',
    bg: '#5A9E2F',
    panel: '#76BB45',
    name: 'FANTA GREEN APPLE',
    ghost: 'APPLE',
    tagline: 'Crisp and tart — the boldest, most refreshing bite.',
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [shouldBounce, setShouldBounce] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<boolean[]>([false, false, false, false, false]);

  // States for the giant ghost word text transition
  const [displayedGhostWord, setDisplayedGhostWord] = useState<string>(IMAGES[0].ghost);
  const [ghostOpacity, setGhostOpacity] = useState<number>(0.15);

  // Auto detect viewport width to match layout boundaries
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload all 5 soda can images on mount
  useEffect(() => {
    IMAGES.forEach((item, index) => {
      const img = new Image();
      img.src = item.src;
      img.onerror = () => {
        setImageErrors((prev) => {
          const copy = [...prev];
          copy[index] = true;
          return copy;
        });
      };
    });
  }, []);

  // Handle giant ghost word transition on active index shift
  useEffect(() => {
    // Phase 1: Fade out
    setGhostOpacity(0);

    const fadeOutTimer = setTimeout(() => {
      // Phase 2: Swap the text word and fade in
      setDisplayedGhostWord(IMAGES[activeIndex].ghost);
      setGhostOpacity(0.15);
    }, 200);

    return () => {
      clearTimeout(fadeOutTimer);
    };
  }, [activeIndex]);

  // Core navigation function
  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % 5);
    } else {
      setActiveIndex((prev) => (prev + 4) % 5);
    }

    // Release animation lock after transition and initiate the subtle can bounce
    setTimeout(() => {
      setIsAnimating(false);
      setShouldBounce(true);

      setTimeout(() => {
        setShouldBounce(false);
      }, 300);
    }, 650);
  };

  // Skip directly to a dot index
  const goToIndex = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsAnimating(false);
      setShouldBounce(true);

      setTimeout(() => {
        setShouldBounce(false);
      }, 300);
    }, 650);
  };

  // Helper mapping to establish carousel roles
  const getRole = (idx: number) => {
    if (idx === activeIndex) return 'center';
    if (idx === (activeIndex + 4) % 5) return 'left';
    if (idx === (activeIndex + 1) % 5) return 'right';
    if (idx === (activeIndex + 2) % 5) return 'back';
    return 'hidden';
  };

  return (
    <div
      id="fantaverse-hero"
      className="w-screen h-screen overflow-hidden relative select-none font-sans transition-colors duration-[650ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
      }}
    >
      {/* 1. Grain overlay */}
      <div
        id="grain-overlay"
        className="absolute inset-0 pointer-events-none select-none z-50 opacity-[0.4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* 2. Giant ghost word */}
      <div
        id="giant-ghost-word"
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-2 text-white font-display uppercase tracking-[-0.02em] whitespace-nowrap leading-none transition-opacity duration-200"
        style={{
          top: '18%',
          fontSize: 'clamp(90px, 28vw, 380px)',
          opacity: ghostOpacity,
        }}
      >
        {displayedGhostWord}
      </div>

      {/* 3. Top-left brand label "FANTAVERSE" */}
      <div id="brand-header" className="absolute top-6 left-4 sm:left-8 z-60 flex flex-col pointer-events-auto">
        <span className="text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em]">
          FANTAVERSE
        </span>
        <span className="text-[10px] text-white opacity-50 tracking-widest mt-0.5 font-medium uppercase">
          FANTA COLLECTION
        </span>
      </div>

      {/* 4. Top-right dot nav */}
      <div id="dot-navigation" className="absolute top-1/2 right-6 -translate-y-1/2 z-60 flex flex-col gap-4 items-center">
        {IMAGES.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => goToIndex(idx)}
              aria-label={`Show slide Flavor ${idx + 1}`}
              className="group relative flex items-center justify-center w-5 h-5 focus:outline-none pointer-events-auto cursor-pointer"
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? '10px' : '6px',
                  height: isActive ? '10px' : '6px',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: isActive ? '0px' : '1px',
                }}
              />
              {/* Tooltip on hover */}
              <span className="absolute right-8 scale-0 origin-right duration-150 transition-all font-display text-[10px] tracking-wider text-white bg-black/40 backdrop-blur-md py-1 px-2.5 rounded-md uppercase group-hover:scale-100 whitespace-nowrap border border-white/10">
                {IMAGES[idx].ghost}
              </span>
            </button>
          );
        })}
      </div>

      {/* 5. Carousel container */}
      <div id="carousel-viewport" className="absolute inset-0 z-3 pointer-events-none">
        {IMAGES.map((item, idx) => {
          const role = getRole(idx);
          return (
            <CarouselItem
              key={idx}
              item={item}
              role={role}
              isMobile={isMobile}
              shouldBounce={shouldBounce && idx === activeIndex}
              hasError={imageErrors[idx]}
              onError={() => {
                setImageErrors((prev) => {
                  const copy = [...prev];
                  copy[idx] = true;
                  return copy;
                });
              }}
            />
          );
        })}
      </div>

      {/* 6. Bottom-left block */}
      <div
        id="edition-details"
        className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 z-60 flex flex-col items-start text-white pointer-events-auto"
        style={{ maxWidth: '320px' }}
      >
        <span className="text-[10px] uppercase font-sans font-semibold tracking-widest text-white/75 mb-3 select-none">
          EDITION 0{activeIndex + 1} • {IMAGES[activeIndex].name}
        </span>
        <h1 className="font-display text-white leading-none mb-2 select-none uppercase tracking-wide" style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
          FANTAVERSE
        </h1>
        <p className="hidden sm:block text-sm text-white/85 font-sans leading-relaxed my-3 mb-6 font-medium">
          {IMAGES[activeIndex].tagline}
        </p>

        {/* Circular Navigation Buttons */}
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate('prev')}
            disabled={isAnimating}
            aria-label="Previous flavor"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center transition-all duration-150 bg-transparent hover:scale-108 hover:bg-white/12 active:scale-95 disabled:opacity-40 cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="text-white w-6 h-6 sm:w-7 sm:h-7 stroke-[2.25]" />
          </button>
          <button
            onClick={() => navigate('next')}
            disabled={isAnimating}
            aria-label="Next flavor"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center transition-all duration-150 bg-transparent hover:scale-108 hover:bg-white/12 active:scale-95 disabled:opacity-40 cursor-pointer focus:outline-none"
          >
            <ArrowRight className="text-white w-6 h-6 sm:w-7 sm:h-7 stroke-[2.25]" />
          </button>
        </div>
      </div>

      {/* 7. Bottom-right CTA "ORDER NOW" */}
      <button
        id="order-now-cta"
        className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 z-60 flex items-center gap-3 group text-white pointer-events-auto cursor-pointer focus:outline-none select-none"
        aria-label="Order current flavor now"
      >
        <span
          className="font-display text-white opacity-95 group-hover:opacity-100 transition-opacity duration-200 uppercase tracking-[-0.02em] leading-none"
          style={{ fontSize: 'clamp(20px, 4vw, 56px)' }}
        >
          ORDER NOW
        </span>
        <ArrowRight className="text-white w-6 h-6 sm:w-8 sm:h-8 stroke-[2.25] transform group-hover:translate-x-2 transition-transform duration-200 ease-out" />
      </button>
    </div>
  );
}
