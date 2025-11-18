import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MainApp } from './components/MainApp'
import { CinematicIntro } from './components/CinematicIntro'
import { OrbHost } from './components/OrbHost'
import { OrbProvider } from './contexts/OrbContext'
import { themes } from './lib/themes'
import type { ThemeColor } from './types'

function AppContent() {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(themes[0])
  const [showIntro, setShowIntro] = useState(false) // Temporarily disabled for testing

  return (
    <OrbHost>
      <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <CinematicIntro
              key="intro"
              onComplete={() => setShowIntro(false)}
            />
          ) : (
            <div className="absolute inset-0 z-10">
              <MainApp theme={currentTheme} onThemeChange={setCurrentTheme} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </OrbHost>
  )
}

function App() {
  return (
    <OrbProvider>
      <AppContent />
    </OrbProvider>
  )
}

export default App
