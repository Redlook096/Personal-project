import { motion } from 'framer-motion'
import { Palette, Zap, Sparkles, Power, Gauge, Eye, Layers } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { themes } from '../lib/themes'
import { orbPresets } from '../lib/orb-presets'
import { useOrb, useAnimationDuration } from '../contexts/OrbContext'
import { Orb } from 'react-ai-orb'
import type { ThemeColor } from '../types'

type SettingsInterfaceProps = {
  currentTheme: ThemeColor
  onThemeChange: (theme: ThemeColor) => void
}

export function SettingsInterface({ currentTheme, onThemeChange }: SettingsInterfaceProps) {
  const { orbSettings, setOrbSettings, themeSettings, setThemeSettings, getGlassStyle } = useOrb()
  const getDuration = useAnimationDuration()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 / themeSettings.animationSpeed }}
      className="flex h-full flex-col p-10 pb-32"
    >
      <div className="mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 / themeSettings.animationSpeed }}
          className="flex items-center gap-4"
        >
          <div className="rounded-2xl bg-gradient-to-br from-indigo-400/10 to-purple-400/10 p-3 backdrop-blur-sm">
            <Palette className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-light text-gray-800">Settings</h2>
            <p className="text-sm text-gray-500">Customize your experience</p>
          </div>
        </motion.div>
      </div>

      <Tabs defaultValue="appearance" className="flex-1 flex flex-col">
        <TabsList style={getGlassStyle(themeSettings.glassIntensity)} className="mb-8 border border-white/40 p-1.5 shadow-sm">
          <TabsTrigger 
            value="appearance" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-600 data-[state=active]:shadow-md transition-all"
          >
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger 
            value="orbs" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-600 data-[state=active]:shadow-md transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Orbs
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="appearance" className="m-0">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 / themeSettings.animationSpeed }}
            >
              <h3 className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                <Zap className="h-4 w-4" />
                Theme Colors
              </h3>

              <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                {themes.map((theme, index) => {
                  const isActive = theme.name === currentTheme.name

                  return (
                    <motion.button
                      key={theme.name}
                      onClick={() => onThemeChange(theme)}
                      className={`group relative overflow-hidden rounded-2xl border transition-all ${
                        isActive
                          ? 'border-indigo-400/50 shadow-lg shadow-indigo-400/10'
                          : 'border-white/30 hover:border-indigo-300/40'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: (0.3 + index * 0.05) / themeSettings.animationSpeed,
                        duration: getDuration(0.2)
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`h-32 bg-gradient-to-br ${theme.bgGradient} p-4`}>
                        <div className="flex h-full flex-col items-center justify-center">
                          <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${theme.orbGradient} shadow-md`} />
                          <p className="mt-3 text-xs font-medium text-gray-800">{theme.name}</p>
                        </div>
                      </div>

                      {isActive && (
                        <div className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1 shadow-md">
                          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div style={getGlassStyle(themeSettings.glassIntensity)} className="mt-6 rounded-2xl border border-white/30 p-6 shadow-sm">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Current Theme</h4>
                <p className="text-xs text-gray-500">
                  {currentTheme.name} - This theme affects the AI orb appearance and background gradients.
                </p>
              </div>

              <div style={getGlassStyle(themeSettings.glassIntensity)} className="mt-6 rounded-2xl border border-white/30 p-7 space-y-7 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700">Advanced Customization</h3>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Glassmorphism Intensity</label>
                    <span className="text-xs text-gray-500">{themeSettings.glassIntensity.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={themeSettings.glassIntensity}
                    onChange={(e) => setThemeSettings({ glassIntensity: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-700">Animation Speed</label>
                    <span className="text-xs text-gray-500">{themeSettings.animationSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.25"
                    value={themeSettings.animationSpeed}
                    onChange={(e) => setThemeSettings({ animationSpeed: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-3">Font Family</label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      onClick={() => setThemeSettings({ fontFamily: 'inter' })}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                        themeSettings.fontFamily === 'inter'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                          : 'bg-white/50 text-gray-600 hover:bg-white/70'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: getDuration(0.15) }}
                    >
                      Inter
                    </motion.button>
                    <motion.button
                      onClick={() => setThemeSettings({ fontFamily: 'system' })}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                        themeSettings.fontFamily === 'system'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                          : 'bg-white/50 text-gray-600 hover:bg-white/70'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: getDuration(0.15) }}
                    >
                      System
                    </motion.button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-3">Font Size</label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      onClick={() => setThemeSettings({ fontSize: 'comfortable' })}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                        themeSettings.fontSize === 'comfortable'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                          : 'bg-white/50 text-gray-600 hover:bg-white/70'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: getDuration(0.15) }}
                    >
                      Comfortable
                    </motion.button>
                    <motion.button
                      onClick={() => setThemeSettings({ fontSize: 'compact' })}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                        themeSettings.fontSize === 'compact'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                          : 'bg-white/50 text-gray-600 hover:bg-white/70'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: getDuration(0.15) }}
                    >
                      Compact
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="orbs" className="m-0">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 / themeSettings.animationSpeed }}
              className="space-y-6"
            >
              <div style={getGlassStyle(themeSettings.glassIntensity)} className="rounded-2xl border border-white/30 p-7 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <Layers className="h-5 w-5 text-indigo-500" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Orb Type</h4>
                    <p className="text-xs text-gray-500">Choose your orb rendering method</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    onClick={() => setOrbSettings({ orbType: 'custom' })}
                    className={`px-4 py-3 rounded-xl text-sm transition-all ${
                      orbSettings.orbType === 'custom'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : 'bg-white/50 text-gray-600 hover:bg-white/70'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: getDuration(0.15) }}
                  >
                    Custom CSS Orb
                  </motion.button>
                  <motion.button
                    onClick={() => setOrbSettings({ orbType: 'react-ai' })}
                    className={`px-4 py-3 rounded-xl text-sm transition-all ${
                      orbSettings.orbType === 'react-ai'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                        : 'bg-white/50 text-gray-600 hover:bg-white/70'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: getDuration(0.15) }}
                  >
                    React AI Orb
                  </motion.button>
                </div>
              </div>

              <div style={getGlassStyle(themeSettings.glassIntensity)} className="rounded-2xl border border-white/30 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Power className="h-5 w-5 text-indigo-500" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Enable Animated Orbs</h4>
                      <p className="text-xs text-gray-500">Toggle background orb animations</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOrbSettings({ enabled: !orbSettings.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shadow-sm ${
                      orbSettings.enabled ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-300/50'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                        orbSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                  <Sparkles className="h-4 w-4" />
                  Orb Presets
                </h3>
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                  {Object.entries(orbPresets).map(([key, preset], index) => {
                    const isActive = orbSettings.preset === key

                    return (
                      <motion.button
                        key={key}
                        onClick={() => setOrbSettings({ preset: key as any })}
                        className={`group relative overflow-hidden rounded-2xl border transition-all ${
                          isActive
                            ? 'border-indigo-400/50 shadow-lg shadow-indigo-400/10'
                            : 'border-white/30 hover:border-indigo-300/40'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: (0.3 + index * 0.05) / themeSettings.animationSpeed,
                          duration: getDuration(0.2)
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!orbSettings.enabled}
                      >
                        <div className={`relative h-40 overflow-hidden bg-black ${!orbSettings.enabled ? 'opacity-50' : ''}`}>
                          {orbSettings.enabled ? (
                            <div className="absolute inset-0" style={{ opacity: 0.7 }}>
                              <Orb 
                                palette={preset.palette} 
                                animationSpeedHue={0.5}
                              />
                            </div>
                          ) : (
                            <div className={`absolute inset-0 bg-gradient-to-br ${preset.gradient}`} />
                          )}
                          <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none z-10">
                            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md">
                              <p className="text-xs font-medium text-white">{preset.name}</p>
                            </div>
                          </div>
                        </div>

                        {isActive && orbSettings.enabled && (
                          <div className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1 z-10 shadow-md">
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              <div style={getGlassStyle(themeSettings.glassIntensity)} className="rounded-2xl border border-white/30 p-6 space-y-6 shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-indigo-500" />
                      <label className="text-sm font-medium text-gray-700">Animation Speed</label>
                    </div>
                    <span className="text-xs text-gray-500">{orbSettings.speed.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={orbSettings.speed}
                    onChange={(e) => setOrbSettings({ speed: parseFloat(e.target.value) })}
                    disabled={!orbSettings.enabled}
                    className="w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer disabled:opacity-50 accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-indigo-500" />
                      <label className="text-sm font-medium text-gray-700">Orb Opacity</label>
                    </div>
                    <span className="text-xs text-gray-500">{orbSettings.opacity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.8"
                    step="0.1"
                    value={orbSettings.opacity}
                    onChange={(e) => setOrbSettings({ opacity: parseFloat(e.target.value) })}
                    disabled={!orbSettings.enabled}
                    className="w-full h-2 bg-white/40 rounded-lg appearance-none cursor-pointer disabled:opacity-50 accent-indigo-500"
                  />
                </div>
              </div>

              <div style={getGlassStyle(themeSettings.glassIntensity)} className="rounded-2xl border border-white/30 p-6 shadow-sm">
                <h4 className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Live Preview
                </h4>
                <p className="text-xs text-gray-500 mb-4">
                  Orbs are {orbSettings.enabled ? 'enabled' : 'disabled'} with {orbSettings.preset} preset
                </p>
                <div className="relative h-32 rounded-xl overflow-hidden border border-white/30 shadow-sm">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${orbPresets[orbSettings.preset].gradient}`}
                    style={{ opacity: orbSettings.enabled ? orbSettings.opacity : 0.2 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white/80 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  )
}
