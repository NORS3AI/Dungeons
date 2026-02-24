/**
 * Trait references organized by race and class
 * Enables lazy loading of specific trait subsets
 */

// Re-export all traits (for backward compatibility)
export { TRAITS } from '../traits'

// Race-specific traits
export * from './races'

// Class-specific traits
export * from './classes'
