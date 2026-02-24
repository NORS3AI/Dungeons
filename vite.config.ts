/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Last updated: 2026-02-24
export default defineConfig({
  plugins: [react()],
  base: '/Dungeons/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split reference system into optimized chunks
          if (id.includes('src/data/references/')) {
            // Core references - loaded by all characters
            if (id.includes('/skills.ts') ||
                id.includes('/abilities.ts') ||
                id.includes('/weapons.ts') ||
                id.includes('/armor.ts') ||
                id.includes('/conditions.ts') ||
                id.includes('/rules.ts')) {
              return 'references-core'
            }

            // Main spell database - lazy loaded when needed
            if (id.includes('/spells.ts') && !id.includes('/spells/')) {
              return 'references-spells-main'
            }

            // Class-specific spell filters - lazy loaded per class
            if (id.includes('/spells/warlock.ts')) return 'spells-warlock'
            if (id.includes('/spells/wizard.ts')) return 'spells-wizard'
            if (id.includes('/spells/cleric.ts')) return 'spells-cleric'
            if (id.includes('/spells/sorcerer.ts')) return 'spells-sorcerer'
            if (id.includes('/spells/druid.ts')) return 'spells-druid'
            if (id.includes('/spells/bard.ts')) return 'spells-bard'
            if (id.includes('/spells/index.ts')) return 'spells-index'

            // Main trait database - lazy loaded when needed
            if (id.includes('/traits.ts') && !id.includes('/traits/')) {
              return 'references-traits-main'
            }

            // Race-specific trait filters - lazy loaded per race
            if (id.includes('/traits/races/drow.ts')) return 'traits-drow'
            if (id.includes('/traits/races/tiefling.ts')) return 'traits-tiefling'
            if (id.includes('/traits/races/elf.ts')) return 'traits-elf'
            if (id.includes('/traits/races/human.ts')) return 'traits-human'
            if (id.includes('/traits/races/dwarf.ts')) return 'traits-dwarf'
            if (id.includes('/traits/races/index.ts')) return 'traits-races-index'

            // Class-specific trait filters - lazy loaded per class
            if (id.includes('/traits/classes/fighter.ts')) return 'traits-fighter'
            if (id.includes('/traits/classes/warlock.ts')) return 'traits-warlock'
            if (id.includes('/traits/classes/wizard.ts')) return 'traits-wizard'
            if (id.includes('/traits/classes/cleric.ts')) return 'traits-cleric'
            if (id.includes('/traits/classes/index.ts')) return 'traits-classes-index'

            // Reference utilities and types
            if (id.includes('/loader.ts') || id.includes('/types.ts') || id.includes('/index.ts')) {
              return 'references-utils'
            }
          }

          // Vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('zustand')) {
              return 'vendor-zustand'
            }
            if (id.includes('react-router')) {
              return 'vendor-router'
            }
            return 'vendor-other'
          }
        },
      },
    },
    // Increase chunk size warning limit since we're intentionally splitting
    chunkSizeWarningLimit: 1000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
