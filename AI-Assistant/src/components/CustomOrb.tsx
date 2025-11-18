import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion'
import { useEffect } from 'react'

type CustomOrbProps = {
  size?: number
  palette?: {
    primary: string
    secondary: string
    accent: string
  }
  className?: string
  enableParallax?: boolean
}

export function CustomOrb({ 
  size = 360, 
  palette = {
    primary: '#6366f1',
    secondary: '#a855f7',
    accent: '#3b82f6'
  },
  className = '',
  enableParallax = true
}: CustomOrbProps) {
  const hue = useMotionValue(0)
  const rotate = useTransform(hue, [0, 360], ['0deg', '360deg'])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const parallaxX = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), { stiffness: 100, damping: 20 })
  const parallaxY = useSpring(useTransform(mouseY, [-1, 1], [-15, 15]), { stiffness: 100, damping: 20 })

  useEffect(() => {
    const controls = animate(hue, 360, {
      duration: 10,
      repeat: Infinity,
      ease: 'linear'
    })
    return controls.stop
  }, [hue])

  useEffect(() => {
    if (!enableParallax) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, enableParallax])

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
        x: enableParallax ? parallaxX : 0,
        y: enableParallax ? parallaxY : 0,
      }}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Main orb glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${palette.primary}dd, ${palette.secondary}99, ${palette.accent}66)`,
          filter: 'blur(20px)',
          rotate
        }}
      />
      
      {/* Core orb */}
      <motion.div
        className="absolute inset-[10%] rounded-full"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${palette.primary}ee, ${palette.secondary}cc)`,
          boxShadow: `0 0 60px ${palette.primary}66, inset 0 0 40px ${palette.accent}33`,
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-[15%] rounded-full"
        style={{
          background: `radial-gradient(circle at 60% 30%, rgba(255,255,255,0.4), transparent 50%)`,
          opacity: 0.8,
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.div>
  )
}
