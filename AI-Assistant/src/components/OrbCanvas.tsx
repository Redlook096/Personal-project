import { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Orb } from 'react-ai-orb'
import type { OrbPalette, OrbSettings } from '../types'

type OrbCanvasProps = {
  palette: OrbPalette
  orbSettings: OrbSettings
}

export const OrbCanvas = memo(function OrbCanvas({ palette, orbSettings }: OrbCanvasProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Always render orbs - they're core to the design

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Left Orb */}
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2"
        style={{ 
          opacity: orbSettings.opacity * 0.8,
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="w-[600px] h-[600px] -ml-[200px]">
          <Orb
            palette={palette}
            animationSpeedHue={orbSettings.speed * 0.8}
          />
        </div>
      </motion.div>

      {/* Center Orb - Largest and most prominent */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ 
          opacity: orbSettings.opacity,
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="w-[1000px] h-[1000px]">
          <Orb
            palette={palette}
            animationSpeedHue={orbSettings.speed}
          />
        </div>
      </motion.div>

      {/* Right Orb */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2"
        style={{ 
          opacity: orbSettings.opacity * 0.8,
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="w-[600px] h-[600px] -mr-[200px]">
          <Orb
            palette={palette}
            animationSpeedHue={orbSettings.speed * 0.8}
          />
        </div>
      </motion.div>
    </div>
  )
})
