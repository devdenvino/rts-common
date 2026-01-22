/**
 * Professional animation configurations for reusable motion components
 * Uses Motion (framer-motion) library for smooth, production-ready animations
 */

// ============================================================================
// EASING CURVES - Professional bezier curves for smooth motion
// ============================================================================

export const easings = {
  // Smooth entrance with slight overshoot - great for hero elements
  springy: [0.34, 1.56, 0.64, 1] as const,
  
  // Professional standard easing - works well for most transitions
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  
  // Subtle easing for background elements
  gentle: [0.45, 0, 0.55, 1] as const,
} as const;

// ============================================================================
// CONTAINER ANIMATIONS - For wrapping entire sections
// ============================================================================

export const containerAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easings.springy,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// ITEM ANIMATIONS - For individual content elements
// ============================================================================

export const itemAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
};

export const itemSlideAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
};

// ============================================================================
// ICON ANIMATIONS - For prominent icon elements
// ============================================================================

export const iconAnimation = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// ============================================================================
// BUTTON ANIMATIONS - Interactive button states
// ============================================================================

export const buttonAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
  },
  whileHover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const,
    },
  },
  whileTap: {
    scale: 0.98,
  },
};

// ============================================================================
// CARD/DETAILS ANIMATIONS - For content sections
// ============================================================================

export const detailsAnimation = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easings.smooth,
    },
  },
};

export const cardHoverAnimation = {
  whileHover: { 
    scale: 1.005,
    transition: { duration: 0.2 }
  },
};

// ============================================================================
// STAGGERED LIST ANIMATIONS - For lists with sequential reveals
// ============================================================================

export const createStaggeredListItem = (index: number, baseDelay = 0.5) => ({
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: baseDelay + index * 0.1 },
});

// ============================================================================
// NUMBER ANIMATIONS - For animated digits (like 404)
// ============================================================================

export const digitAnimation = {
  left: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  center: {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 200 }
    },
  },
  right: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
};

// ============================================================================
// BACKGROUND ANIMATIONS - For ambient background effects
// ============================================================================

export interface BackgroundBlobConfig {
  size: string;
  duration: number;
  delay: number;
}

export const defaultBlobConfigs: BackgroundBlobConfig[] = [
  { size: "h-[500px] w-[500px]", duration: 20, delay: 0 },
  { size: "h-[400px] w-[400px]", duration: 25, delay: 2 },
  { size: "h-[450px] w-[450px]", duration: 22, delay: 4 },
];

export const createBlobAnimation = (config: BackgroundBlobConfig, index: number) => ({
  animate: {
    x: [0, 50 + index * 20, -30, 0],
    y: [0, -40 + index * 15, 50, 0],
    scale: [1, 1.15, 0.95, 1],
    opacity: [0.4, 0.6, 0.4],
  },
  transition: {
    duration: config.duration,
    delay: config.delay,
    repeat: Infinity,
    ease: easings.gentle,
  },
});

export const backgroundContainerAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 0.6 },
  transition: { duration: 1.5, ease: easings.smooth },
};

// ============================================================================
// PARTICLE ANIMATIONS - For floating particles effect
// ============================================================================

export const createParticleAnimation = (index: number) => ({
  animate: {
    y: [-20, -40, -20],
    x: [0, Math.random() * 20 - 10, 0],
    opacity: [0, 0.5, 0],
    scale: [0.5, 1, 0.5],
  },
  transition: {
    duration: 4 + Math.random() * 3,
    delay: index * 0.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

// ============================================================================
// SPECIAL ANIMATIONS - For unique use cases
// ============================================================================

export const rotateAnimation = {
  animate: { rotate: 360 },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear" as const,
  },
};

export const expandAnimation = {
  initial: { opacity: 0, height: 0 },
  animate: { 
    opacity: 1, 
    height: "auto",
    transition: { duration: 0.3 }
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a delay transition object
 */
export const withDelay = (delay: number) => ({
  transition: { delay },
});

/**
 * Merges animation configs with custom overrides
 */
export const mergeAnimations = <T extends Record<string, any>>(
  base: T,
  override: Partial<T>
): T => ({
  ...base,
  ...override,
});
