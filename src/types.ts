/**
 * Types representing a Fanta Flavor item in the Fantaverse Carousel.
 */
export interface FantaItem {
  src: string;
  bg: string;
  panel: string; // Used for glowing panels and highlight cards
  name: string;
  ghost: string; // Huge background name text
  tagline: string;
}

export type NavDirection = 'next' | 'prev';

export type CarouselRole = 'center' | 'left' | 'right' | 'back' | 'hidden';
