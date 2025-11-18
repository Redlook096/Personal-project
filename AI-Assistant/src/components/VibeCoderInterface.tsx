import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Eye, Loader2, FileCode } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useOrb, useAnimationDuration } from '../contexts/OrbContext'
import type { Message, CodeFile, ThemeColor } from '../types'

type VibeCoderInterfaceProps = {
  theme: ThemeColor
  messages: Message[]
  isLoading: boolean
  codeFiles: CodeFile[]
}

export function VibeCoderInterface({ theme, messages, isLoading, codeFiles }: VibeCoderInterfaceProps) {
  const { themeSettings, getGlassStyle } = useOrb()
  const getDuration = useAnimationDuration()
  const [activeTab, setActiveTab] = useState<string>('preview')
  const [activeFileIndex, setActiveFileIndex] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 / themeSettings.animationSpeed }}
        className="flex h-full flex-col gap-3 p-4 pb-32 lg:flex-row lg:p-4 lg:pb-32"
      >
        <div style={getGlassStyle(themeSettings.glassIntensity)} className="flex w-full flex-col rounded-2xl overflow-hidden shadow-xl hover-lift lg:w-1/2">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h2 className="text-base font-light text-gray-900 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Vibe Coder
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                  <FileCode size={48} className="text-purple-500 mb-4" />
                  <h3 className="text-xl font-light text-gray-900">
                    What would you like to build?
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 max-w-md">
                    Describe your app, component, or feature
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3 / themeSettings.animationSpeed,
                    delay: (index * 0.05) / themeSettings.animationSpeed 
                  }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: getDuration(0.2) }}
                    style={message.role !== 'user' ? getGlassStyle(themeSettings.glassIntensity) : undefined}
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-xs hover-lift ${
                      message.role === 'user'
                        ? `bg-gradient-to-br ${theme.orbGradient} text-white`
                        : 'text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </motion.div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-purple-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-xs">Generating code...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

      <div style={getGlassStyle(themeSettings.glassIntensity)} className="flex w-full flex-col rounded-2xl overflow-hidden shadow-xl hover-lift lg:w-1/2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
            <TabsList style={getGlassStyle(themeSettings.glassIntensity)} className="border border-gray-200 p-0.5">
              <TabsTrigger value="preview" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-gray-700 data-[state=active]:bg-gray-100">
                <Eye className="h-3 w-3" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-gray-700 data-[state=active]:bg-gray-100">
                <Code className="h-3 w-3" />
                Code
              </TabsTrigger>
            </TabsList>

            {codeFiles.length > 0 && activeTab === 'code' && (
              <select
                value={activeFileIndex}
                onChange={(e) => setActiveFileIndex(Number(e.target.value))}
                className="rounded-xl bg-white border border-gray-200 px-3 py-1.5 text-xs text-gray-900 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                {codeFiles.map((file, idx) => (
                  <option key={idx} value={idx} className="bg-white">
                    {file.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <TabsContent value="preview" className="flex-1 overflow-auto m-0 p-0">
            <AnimatePresence mode="wait">
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 / themeSettings.animationSpeed }}
                className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-8"
              >
                {codeFiles.length > 0 ? (
                  <div style={getGlassStyle(themeSettings.glassIntensity)} className="rounded-2xl p-6 text-gray-900 hover-lift">
                    <h3 className="text-2xl font-light mb-3">Live Preview</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Preview functionality coming soon! Your code is being generated in the Code tab.
                    </p>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-gray-500">No preview yet. Start coding!</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="code" className="flex-1 overflow-auto m-0 p-0">
            {codeFiles.length > 0 ? (
              <SyntaxHighlighter
                language={codeFiles[activeFileIndex].language}
                style={oneDark}
                customStyle={{
                  margin: 0,
                  height: '100%',
                  fontSize: '12px',
                  borderRadius: 0,
                }}
                showLineNumbers
              >
                {codeFiles[activeFileIndex].content}
              </SyntaxHighlighter>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                <p className="text-sm">No code yet. Describe what you want to build!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      </motion.div>
    </>
  )
}
