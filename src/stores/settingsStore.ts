import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Available themes
 */
export type Theme = 'dark' | 'light' | 'darker' | 'dnd'

/**
 * Font size options
 */
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge'

/**
 * Settings state
 */
interface SettingsState {
  theme: Theme
  fontSize: FontSize
  showQuickRefTooltips: boolean

  // Actions
  setTheme: (theme: Theme) => void
  setFontSize: (size: FontSize) => void
  toggleQuickRefTooltips: () => void
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
 * Theme display names
 */
export const THEME_NAMES: Record<Theme, string> = {
  dark: 'Dark',
  light: 'Light',
  darker: 'OLED Dark',
  dnd: 'D&D Classic',
}

/**
 * Settings store with persistence
 */
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      fontSize: 'medium',
      showQuickRefTooltips: true,

      setTheme: (theme: Theme) => {
        set({ theme })
        applyTheme(theme)
      },

      setFontSize: (fontSize: FontSize) => {
        set({ fontSize })
        applyFontSize(fontSize)
      },

      toggleQuickRefTooltips: () => {
        set((state) => ({ showQuickRefTooltips: !state.showQuickRefTooltips }))
      },
    }),
    {
      name: 'dungeons-settings',
      onRehydrateStorage: () => (state) => {
        // Apply settings on load
        if (state) {
          applyTheme(state.theme)
          applyFontSize(state.fontSize)
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
  root.classList.remove('theme-dark', 'theme-light', 'theme-darker', 'theme-dnd')

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
