import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { OrbSettings, AppThemeSettings } from '../types'

type OrbContextType = {
  orbSettings: OrbSettings
  setOrbSettings: (settings: Partial<OrbSettings>) => void
  themeSettings: AppThemeSettings
  setThemeSettings: (settings: Partial<AppThemeSettings>) => void
  getThemeBackground: () => string
  getGlassStyle: (intensity?: number) => React.CSSProperties
}

const OrbContext = createContext<OrbContextType | undefined>(undefined)

const DEFAULT_ORB_SETTINGS: OrbSettings = {
  enabled: true,
  speed: 0.5,
  opacity: 0.4,
  preset: 'theme',
  orbType: 'custom'
}

const DEFAULT_THEME_SETTINGS: AppThemeSettings = {
  glassIntensity: 0.7,
  animationSpeed: 1.0,
  fontFamily: 'inter',
  fontSize: 'comfortable'
}

const loadSettings = (): OrbSettings => {
  if (typeof window === 'undefined') {
    return DEFAULT_ORB_SETTINGS
  }
  try {
    const saved = localStorage.getItem('orbSettings')
    if (saved) {
      const parsed = JSON.parse(saved)
      parsed.opacity = Math.max(0.2, parsed.opacity || DEFAULT_ORB_SETTINGS.opacity)
      return parsed
    }
    return DEFAULT_ORB_SETTINGS
  } catch {
    return DEFAULT_ORB_SETTINGS
  }
}

const loadThemeSettings = (): AppThemeSettings => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME_SETTINGS
  }
  try {
    const saved = localStorage.getItem('themeSettings')
    return saved ? JSON.parse(saved) : DEFAULT_THEME_SETTINGS
  } catch {
    return DEFAULT_THEME_SETTINGS
  }
}

export function OrbProvider({ children }: { children: ReactNode }) {
  const [orbSettings, setOrbSettingsState] = useState<OrbSettings>(() => loadSettings())
  const [themeSettings, setThemeSettingsState] = useState<AppThemeSettings>(() => loadThemeSettings())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('orbSettings', JSON.stringify(orbSettings))
    }
  }, [orbSettings])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeSettings', JSON.stringify(themeSettings))
    }
  }, [themeSettings])

  const setOrbSettings = (settings: Partial<OrbSettings>) => {
    const updated = { ...settings }
    if (updated.opacity !== undefined) {
      updated.opacity = Math.max(0.2, updated.opacity)
    }
    setOrbSettingsState(prev => ({ ...prev, ...updated }))
  }

  const setThemeSettings = (settings: Partial<AppThemeSettings>) => {
    setThemeSettingsState(prev => ({ ...prev, ...settings }))
  }

  const getThemeBackground = (): string => {
    return `linear-gradient(135deg, var(--tw-gradient-stops))`
  }

  const getGlassStyle = (intensity?: number): React.CSSProperties => {
    const actualIntensity = intensity ?? themeSettings.glassIntensity
    
    return {
      backgroundColor: `rgba(255, 255, 255, ${0.4 * actualIntensity})`,
      backdropFilter: `blur(${20 * actualIntensity}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${20 * actualIntensity}px) saturate(180%)`,
      border: `1px solid rgba(255, 255, 255, ${0.3 * actualIntensity})`,
      boxShadow: `0 8px 32px 0 rgba(0, 0, 0, ${0.08 * actualIntensity})`
    }
  }

  return (
    <OrbContext.Provider value={{ 
      orbSettings, 
      setOrbSettings, 
      themeSettings, 
      setThemeSettings,
      getThemeBackground,
      getGlassStyle
    }}>
      {children}
    </OrbContext.Provider>
  )
}

export function useOrb() {
  const context = useContext(OrbContext)
  if (!context) {
    throw new Error('useOrb must be used within OrbProvider')
  }
  return context
}

export function useAnimationDuration() {
  const { themeSettings } = useOrb()
  return (baseDuration: number) => baseDuration / themeSettings.animationSpeed
}
