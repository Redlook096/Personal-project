import { motion, useMotionValue, useSpring } from 'framer-motion'
import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react'
import { CustomOrb } from './CustomOrb'
import { Orb } from 'react-ai-orb'
import { useOrb } from '../contexts/OrbContext'
import { orbPresets } from '../lib/orb-presets'

type OrbState = 'intro' | 'handoff' | 'docked'

type OrbHostContextType = {
  orbState: OrbState
  setOrbState: (state: OrbState) => void
  completeIntro: () => void
}

const OrbHostContext = createContext<OrbHostContextType | undefined>(undefined)

export function useOrbHost() {
  const context = useContext(OrbHostContext)
  if (!context) throw new Error('useOrbHost must be used within OrbHostProvider')
  return context
}

export function OrbHost({ children }: { children: ReactNode }) {
  const { orbSettings } = useOrb()
  const [orbState, setOrbState] = useState<OrbState>('intro')
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)
  const opacity = useMotionValue(1)

  const springConfig = { stiffness: 100, damping: 20 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  const scaleSpring = useSpring(scale, springConfig)

  const completeIntro = useCallback(() => {
    setOrbState('handoff')
    
    // Position orb in top-center hero slot
    setTimeout(() => {
      x.set(0)
      y.set(-window.innerHeight * 0.35) // Higher up (was -0.25)
      scale.set(0.07) // Scale to 70px (1000px × 0.07)
    }, 100)
    
    // Transition to docked state
    setTimeout(() => {
      setOrbState('docked')
    }, 1200)
  }, [x, y, scale])

  // Auto-transition to docked if intro is skipped
  useEffect(() => {
    const timer = setTimeout(() => {
      if (orbState === 'intro') {
        completeIntro()
      }
    }, 4000) // Longer than intro duration to act as fallback only
    
    return () => clearTimeout(timer)
  }, [orbState, completeIntro])

  // Helper function to get orb palette based on current preset
  const getOrbPaletteForCurrentPreset = () => {
    return orbPresets[orbSettings.preset]?.palette || orbPresets.theme.palette
  }

  const palette = {
    primary: '#6366f1',
    secondary: '#a855f7',
    accent: '#3b82f6'
  }

  return (
    <OrbHostContext.Provider value={{ orbState, setOrbState, completeIntro }}>
      {children}
      
      {/* Orb stays mounted across all state transitions */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-30"
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <motion.div
          style={{
            x: xSpring,
            y: ySpring,
            scale: scaleSpring,
            opacity: opacity,
          }}
        >
          {orbSettings.orbType === 'custom' ? (
            <CustomOrb size={1000} palette={palette} enableParallax={orbState === 'docked'} />
          ) : (
            <div style={{width: 1000, height: 1000}}>
              <Orb palette={getOrbPaletteForCurrentPreset()} animationSpeedHue={orbSettings.speed} />
            </div>
          )}
        </motion.div>
      </motion.div>
    </OrbHostContext.Provider>
  )
}
