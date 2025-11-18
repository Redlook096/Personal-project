import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useOrb } from '../contexts/OrbContext'
import { useOrbHost } from './OrbHost'

type CinematicIntroProps = {
  onComplete: () => void
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const { themeSettings } = useOrb()
  const { completeIntro } = useOrbHost()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      completeIntro()
      onComplete()
    }, 2000) // Simplified 2 second intro for testing
    return () => clearTimeout(timer)
  }, [completeIntro, onComplete])
  
  return (
    <motion.div 
      className="fixed inset-0 z-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 / themeSettings.animationSpeed }}
    >
      {/* No text, just background - orb renders from OrbHost at z-30 (above this) */}
    </motion.div>
  )
}
