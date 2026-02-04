import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Available themes
 */
export type Theme = 'dark' | 'light' | 'lighter' | 'darker' | 'dnd' | 'wow' | 'final-fantasy' | 'diablo'

/**
 * Font size options
 */
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge'

/**
 * Font family options
 */
export type FontFamily = 'default' | 'dyslexic'

/**
 * Settings state
 */
interface SettingsState {
  theme: Theme
  fontSize: FontSize
  fontFamily: FontFamily
  showQuickRefTooltips: boolean

  // Actions
  setTheme: (theme: Theme) => void
  setFontSize: (size: FontSize) => void
  setFontFamily: (family: FontFamily) => void
  toggleQuickRefTooltips: () => void
  resetAllCache: () => void
}

/**
 * Font size CSS values
 */
export const FONT_SIZE_VALUES: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
  xlarge: '20px',
}

/**
 * Font family display names
 */
export const FONT_FAMILY_NAMES: Record<FontFamily, string> = {
  default: 'Default',
  dyslexic: 'Dyslexia Friendly',
}

/**
 * Theme display names
 */
export const THEME_NAMES: Record<Theme, string> = {
  dark: 'Dark',
  light: 'Light',
  lighter: 'High Contrast Light',
  darker: 'OLED Dark',
  dnd: 'D&D Classic',
  wow: 'World of Warcraft',
  'final-fantasy': 'Final Fantasy',
  diablo: 'Diablo III',
}

/**
 * Settings store with persistence
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      fontSize: 'medium',
      fontFamily: 'default',
      showQuickRefTooltips: true,

      setTheme: (theme: Theme) => {
        set({ theme })
        applyTheme(theme)
      },

      setFontSize: (fontSize: FontSize) => {
        set({ fontSize })
        applyFontSize(fontSize)
      },

      setFontFamily: (fontFamily: FontFamily) => {
        set({ fontFamily })
        applyFontFamily(fontFamily)
      },

      toggleQuickRefTooltips: () => {
        set((state) => ({ showQuickRefTooltips: !state.showQuickRefTooltips }))
      },

      resetAllCache: () => {
        try {
          // Clear all localStorage
          try {
            localStorage.clear()
          } catch (err) {
            console.error('Failed to clear localStorage:', err)
          }

          // Clear all sessionStorage
          try {
            sessionStorage.clear()
          } catch (err) {
            console.error('Failed to clear sessionStorage:', err)
          }

          // Clear any service worker caches
          if ('caches' in window) {
            caches.keys()
              .then((names) => {
                return Promise.all(
                  names.map((name) =>
                    caches.delete(name).catch((err) => {
                      console.error(`Failed to delete cache ${name}:`, err)
                    })
                  )
                )
              })
              .catch((err) => {
                console.error('Failed to access caches:', err)
              })
          }

          // Force reload to apply changes
          window.location.reload()
        } catch (err) {
          console.error('Failed to reset cache:', err)
          alert('Failed to reset cache. Please try again or clear your browser cache manually.')
        }
      },
    }),
    {
      name: 'dungeons-settings',
      onRehydrateStorage: () => (state) => {
        // Apply settings on load
        if (state) {
          applyTheme(state.theme)
          applyFontSize(state.fontSize)
          applyFontFamily(state.fontFamily)
        }
      },
    }
  )
)

/**
 * Apply theme to document
 */
function applyTheme(theme: Theme) {
  const root = document.documentElement

  // Remove all theme classes
  root.classList.remove('theme-dark', 'theme-light', 'theme-lighter', 'theme-darker', 'theme-dnd', 'theme-wow', 'theme-final-fantasy', 'theme-diablo')

  // Add new theme class
  root.classList.add(`theme-${theme}`)

  // Update CSS variables based on theme
  switch (theme) {
    case 'light':
      root.style.setProperty('--bg-primary', '#f5f5f5')
      root.style.setProperty('--bg-secondary', '#ffffff')
      root.style.setProperty('--bg-tertiary', '#e5e5e5')
      root.style.setProperty('--text-primary', '#1a1a1a')
      root.style.setProperty('--text-secondary', '#4a4a4a')
      root.style.setProperty('--text-muted', '#6a6a6a')
      root.style.setProperty('--border-color', '#d1d1d1')
      break
    case 'lighter':
      // High contrast light mode
      root.style.setProperty('--bg-primary', '#ffffff')
      root.style.setProperty('--bg-secondary', '#fafafa')
      root.style.setProperty('--bg-tertiary', '#f0f0f0')
      root.style.setProperty('--text-primary', '#000000')
      root.style.setProperty('--text-secondary', '#1a1a1a')
      root.style.setProperty('--text-muted', '#4a4a4a')
      root.style.setProperty('--border-color', '#e0e0e0')
      break
    case 'darker':
      root.style.setProperty('--bg-primary', '#000000')
      root.style.setProperty('--bg-secondary', '#0a0a0a')
      root.style.setProperty('--bg-tertiary', '#141414')
      root.style.setProperty('--text-primary', '#ffffff')
      root.style.setProperty('--text-secondary', '#a0a0a0')
      root.style.setProperty('--text-muted', '#606060')
      root.style.setProperty('--border-color', '#2a2a2a')
      break
    case 'dnd':
      root.style.setProperty('--bg-primary', '#1a1512')
      root.style.setProperty('--bg-secondary', '#2a2219')
      root.style.setProperty('--bg-tertiary', '#3a3129')
      root.style.setProperty('--text-primary', '#f4e4c1')
      root.style.setProperty('--text-secondary', '#c4b491')
      root.style.setProperty('--text-muted', '#8a7a61')
      root.style.setProperty('--border-color', '#5a4a31')
      break
    case 'wow':
      // World of Warcraft theme - Azeroth-inspired with gold accents
      root.style.setProperty('--bg-primary', '#0d0d0d')
      root.style.setProperty('--bg-secondary', '#1a1410')
      root.style.setProperty('--bg-tertiary', '#2a2420')
      root.style.setProperty('--text-primary', '#f0d0a0')
      root.style.setProperty('--text-secondary', '#d4af37')
      root.style.setProperty('--text-muted', '#8b7355')
      root.style.setProperty('--border-color', '#4a3f2f')
      break
    case 'final-fantasy':
      // Final Fantasy theme - Crystal/menu aesthetics with blue tones
      root.style.setProperty('--bg-primary', '#0a0e1a')
      root.style.setProperty('--bg-secondary', '#141a2e')
      root.style.setProperty('--bg-tertiary', '#1e2a4a')
      root.style.setProperty('--text-primary', '#e0f0ff')
      root.style.setProperty('--text-secondary', '#a0c0ff')
      root.style.setProperty('--text-muted', '#6080c0')
      root.style.setProperty('--border-color', '#304a7a')
      break
    case 'diablo':
      // Diablo III theme - Gothic with dark red accents
      root.style.setProperty('--bg-primary', '#0f0a0a')
      root.style.setProperty('--bg-secondary', '#1a0f0f')
      root.style.setProperty('--bg-tertiary', '#2a1414')
      root.style.setProperty('--text-primary', '#ffd0d0')
      root.style.setProperty('--text-secondary', '#d08080')
      root.style.setProperty('--text-muted', '#8a5050')
      root.style.setProperty('--border-color', '#4a2020')
      break
    case 'dark':
    default:
      root.style.setProperty('--bg-primary', '#111827')
      root.style.setProperty('--bg-secondary', '#1f2937')
      root.style.setProperty('--bg-tertiary', '#374151')
      root.style.setProperty('--text-primary', '#ffffff')
      root.style.setProperty('--text-secondary', '#d1d5db')
      root.style.setProperty('--text-muted', '#9ca3af')
      root.style.setProperty('--border-color', '#4b5563')
      break
  }
}

/**
 * Apply font size to document
 */
function applyFontSize(size: FontSize) {
  document.documentElement.style.setProperty('--font-size-base', FONT_SIZE_VALUES[size])
}

/**
 * Apply font family to document
 */
function applyFontFamily(family: FontFamily) {
  const root = document.documentElement

  if (family === 'dyslexic') {
    // Use OpenDyslexic font with fallbacks
    root.style.setProperty('--font-family', '"OpenDyslexic", "Comic Sans MS", sans-serif')
    root.classList.add('font-dyslexic')
  } else {
    // Use default font
    root.style.setProperty('--font-family', '"Inter", system-ui, sans-serif')
    root.classList.remove('font-dyslexic')
  }
}
