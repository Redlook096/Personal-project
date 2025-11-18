export type Message = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

export type VoiceCallEvent = {
  id: string
  startTime: Date
  endTime?: Date
  duration?: number
}

export type AppMode = 'chat' | 'voice' | 'vibe-coder' | 'settings'

export type CodeFile = {
  name: string
  content: string
  language: string
}

export type OrbPalette = {
  mainBgStart: string
  mainBgEnd: string
  shadowColor1: string
  shadowColor2: string
  shadowColor3: string
  shadowColor4: string
  shapeAStart: string
  shapeAEnd: string
  shapeBStart: string
  shapeBMiddle: string
  shapeBEnd: string
  shapeCStart: string
  shapeCMiddle: string
  shapeCEnd: string
  shapeDStart: string
  shapeDMiddle: string
  shapeDEnd: string
}

export type ThemeColor = {
  name: string
  primary: string
  secondary: string
  orbGradient: string
  bgGradient: string
  orbPalette: OrbPalette
}

export type AppTheme = {
  color: ThemeColor
  orbSize: number
}

export interface OrbSettings {
  enabled: boolean
  speed: number
  opacity: number
  preset: 'theme' | 'cosmic' | 'ocean' | 'forest' | 'sunset' | 'fire'
  orbType: 'custom' | 'react-ai'
}

export interface AppThemeSettings {
  glassIntensity: number
  animationSpeed: number
  fontFamily: 'inter' | 'system'
  fontSize: 'comfortable' | 'compact'
}
