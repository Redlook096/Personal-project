/**
 * Shared animation constants and motion tokens for consistent timing across the app
 * Following iOS/macOS animation principles: subtle, purposeful, smooth
 */

import type { SpringOptions } from 'framer-motion'

// ===== SPRING CONFIGURATIONS =====

/**
 * Default spring configuration for most UI elements
 * Creates smooth, natural motion without bounciness
 */
export const SPRING_DEFAULT: SpringOptions = {
  stiffness: 200,
  damping: 22,
  mass: 0.1,
}

/**
 * Gentle spring for large/heavy elements (modals, panels, sidebars)
 * Slower, more deliberate motion
 */
export const SPRING_GENTLE: SpringOptions = {
  stiffness: 160,
  damping: 24,
  mass: 0.8,
}

/**
 * Snappy spring for small UI elements (buttons, icons, tooltips)
 * Quick, responsive motion
 */
export const SPRING_SNAPPY: SpringOptions = {
  stiffness: 300,
  damping: 26,
  mass: 0.05,
}

/**
 * Bouncy spring for playful elements (success animations, orb effects)
 * Adds personality without being excessive
 */
export const SPRING_BOUNCY: SpringOptions = {
  stiffness: 400,
  damping: 30,
  mass: 0.1,
}

/**
 * Smooth spring for dock/magnification effects
 * Balanced between responsiveness and smoothness
 */
export const SPRING_DOCK: SpringOptions = {
  stiffness: 200,
  damping: 20,
  mass: 0.1,
}

/**
 * Sidebar spring for collapsible panels
 * Smooth, deliberate motion for major UI changes
 */
export const SPRING_SIDEBAR: SpringOptions = {
  stiffness: 220,
  damping: 26,
  mass: 0.8,
}

// ===== DURATION CONSTANTS =====

/**
 * Ultra-fast transitions (120ms)
 * Use for: micro-interactions, icon changes, color transitions
 */
export const DURATION_INSTANT = 0.12

/**
 * Fast transitions (180ms)
 * Use for: button presses, hover states, tooltips
 */
export const DURATION_FAST = 0.18

/**
 * Default transitions (220ms)
 * Use for: most UI transitions, tab switches, content reveals
 */
export const DURATION_DEFAULT = 0.22

/**
 * Moderate transitions (350ms)
 * Use for: panel slides, modal opens, page transitions
 */
export const DURATION_MODERATE = 0.35

/**
 * Slow transitions (500ms)
 * Use for: large animations, cinematic effects, orb transitions
 */
export const DURATION_SLOW = 0.5

// ===== EASING CURVES =====

/**
 * Standard ease for most transitions
 * Cubic bezier matching iOS system animations
 */
export const EASE_DEFAULT = [0.4, 0.0, 0.2, 1]

/**
 * Ease out for entering elements
 * Starts fast, ends slow
 */
export const EASE_OUT = [0.0, 0.0, 0.2, 1]

/**
 * Ease in for exiting elements
 * Starts slow, ends fast
 */
export const EASE_IN = [0.4, 0.0, 1, 1]

/**
 * Smooth ease for gentle transitions
 * More gradual acceleration/deceleration
 */
export const EASE_SMOOTH = [0.4, 0.0, 0.6, 1]

// ===== SCALE CONSTANTS =====

/**
 * Button press scale (97%)
 * Subtle feedback without being jarring
 */
export const SCALE_PRESS = 0.97

/**
 * Card hover lift scale (102%)
 * Gentle elevation on hover
 */
export const SCALE_HOVER = 1.02

/**
 * Icon hover scale (110%)
 * Slightly more pronounced for small elements
 */
export const SCALE_ICON_HOVER = 1.1

/**
 * Active state scale (95%)
 * Strong press feedback for important actions
 */
export const SCALE_ACTIVE = 0.95

// ===== DISTANCE CONSTANTS =====

/**
 * Small lift on hover (2px)
 * Use for: cards, buttons with subtle elevation
 */
export const LIFT_SMALL = -2

/**
 * Medium lift on hover (4px)
 * Use for: most interactive cards
 */
export const LIFT_MEDIUM = -4

/**
 * Large lift on hover (8px)
 * Use for: prominent cards, featured content
 */
export const LIFT_LARGE = -8

/**
 * Slide distance for tooltips/labels (10px)
 * Standard distance for slide-in animations
 */
export const SLIDE_DISTANCE = 10

// ===== STAGGER CONSTANTS =====

/**
 * Minimal stagger (50ms)
 * Use for: small lists, icon sequences
 */
export const STAGGER_MINIMAL = 0.05

/**
 * Default stagger (100ms)
 * Use for: most lists, tab children, message reveals
 */
export const STAGGER_DEFAULT = 0.1

/**
 * Dramatic stagger (150ms)
 * Use for: cinematic sequences, intro animations
 */
export const STAGGER_DRAMATIC = 0.15

// ===== COMMON VARIANTS =====

/**
 * Fade in/out variants
 */
export const FADE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Slide up variants (for entering content)
 */
export const SLIDE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

/**
 * Slide down variants (for dropdowns, tooltips)
 */
export const SLIDE_DOWN_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

/**
 * Scale variants (for modals, popups)
 */
export const SCALE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

/**
 * Button press variants
 */
export const BUTTON_VARIANTS = {
  rest: { scale: 1 },
  hover: { scale: SCALE_HOVER },
  press: { scale: SCALE_PRESS },
}

/**
 * Card hover variants
 */
export const CARD_VARIANTS = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: LIFT_MEDIUM, 
    scale: SCALE_HOVER,
    transition: { duration: DURATION_FAST, ease: EASE_DEFAULT }
  },
}

// ===== HELPER FUNCTIONS =====

/**
 * Get transition config with spring
 */
export function springTransition(spring: SpringOptions = SPRING_DEFAULT) {
  return {
    type: 'spring' as const,
    ...spring,
  }
}

/**
 * Get transition config with duration
 */
export function durationTransition(
  duration: number = DURATION_DEFAULT,
  ease: number[] = EASE_DEFAULT
) {
  return {
    duration,
    ease,
  }
}

/**
 * Get stagger transition config
 */
export function staggerTransition(
  staggerChildren: number = STAGGER_DEFAULT,
  delayChildren: number = 0
) {
  return {
    staggerChildren,
    delayChildren,
  }
}
