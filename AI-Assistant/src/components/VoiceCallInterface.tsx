import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react'
import { useOrb } from '../contexts/OrbContext'
import type { ThemeColor } from '../types'

type VoiceCallInterfaceProps = {
  theme: ThemeColor
}

export function VoiceCallInterface({ theme }: VoiceCallInterfaceProps) {
  const { themeSettings, getGlassStyle } = useOrb()
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 / themeSettings.animationSpeed }}
      className="relative flex h-full flex-col items-center justify-center pb-32"
    >
      {!isInCall ? (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={`mx-auto w-fit rounded-full bg-gradient-to-br ${theme.orbGradient} p-8 shadow-lg`}>
            <Phone className="h-16 w-16 text-white" />
          </div>
          
          <h2 className="mt-8 text-3xl font-light text-gray-900">Voice Assistant</h2>
          <p className="mt-3 text-sm text-gray-600">
            Start a voice conversation with AI
          </p>
          
          <motion.button
            onClick={() => setIsInCall(true)}
            aria-label="Start voice call"
            className={`mt-8 rounded-full bg-gradient-to-br ${theme.orbGradient} px-8 py-4 text-white shadow-lg smooth-transition hover-lift focus:outline-none focus:ring-4 focus:ring-purple-500/50`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 / themeSettings.animationSpeed }}
          >
            <span className="text-sm font-medium">Start Call</span>
          </motion.button>

          <p className="mt-6 text-xs text-gray-500">
            Voice call UI preview - Full audio streaming coming soon
          </p>
        </motion.div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <div className="simple-pulse-container">
              <div className={`rounded-full bg-gradient-to-br ${theme.orbGradient} p-12 shadow-xl`}>
                <Mic className="h-20 w-20 text-white" />
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 / themeSettings.animationSpeed }}
              style={getGlassStyle(themeSettings.glassIntensity)}
              className="mt-8 rounded-2xl px-6 py-4 text-center"
            >
              <h3 className="text-lg font-light text-gray-900">
                🎤 AI Assistant Active
              </h3>
              <p className="mt-2 text-xs text-gray-600">
                {isMuted ? '🔇 Microphone muted' : '✓ Microphone active'}
              </p>
              
              <div className="mt-4 flex items-center justify-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="voice-indicator"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      willChange: 'transform, opacity',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-8 flex gap-4">
            <motion.button
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              style={getGlassStyle(themeSettings.glassIntensity)}
              className="flex h-14 w-14 items-center justify-center rounded-full text-gray-700 hover-lift focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 / themeSettings.animationSpeed }}
            >
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </motion.button>

            <motion.button
              onClick={() => setIsInCall(false)}
              aria-label="End call"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg smooth-transition hover-lift focus:outline-none focus:ring-2 focus:ring-red-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 / themeSettings.animationSpeed }}
            >
              <PhoneOff className="h-5 w-5" />
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  )
}
