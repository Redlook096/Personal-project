import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { VerticalDock } from './VerticalDock'
import { ChatInterface } from './ChatInterface'
import { VoiceCallInterface } from './VoiceCallInterface'
import { VibeCoderInterface } from './VibeCoderInterface'
import { SettingsInterface } from './SettingsInterface'
import { AIChatInput } from './ui/ai-chat-input'
import { useOrb } from '../contexts/OrbContext'
import type { AppMode, ThemeColor, Message, CodeFile } from '../types'

type MainAppProps = {
  theme: ThemeColor
  onThemeChange: (theme: ThemeColor) => void
}

export function MainApp({ theme, onThemeChange }: MainAppProps) {
  const { themeSettings } = useOrb()
  const [mode, setMode] = useState<AppMode>('chat')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved ? JSON.parse(saved) : false
  })

  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [chatIsLoading, setChatIsLoading] = useState(false)
  
  const [vibeCoderMessages, setVibeCoderMessages] = useState<Message[]>([])
  const [vibeCoderIsLoading, setVibeCoderIsLoading] = useState(false)
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([])

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed))
  }, [sidebarCollapsed])

  useEffect(() => {
    const root = document.documentElement
    root.style.fontFamily = themeSettings.fontFamily === 'inter' 
      ? "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      : "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    
    root.style.fontSize = themeSettings.fontSize === 'comfortable' ? '16px' : '14px'
  }, [themeSettings.fontFamily, themeSettings.fontSize])

  const handleChatMessage = async (input: string) => {
    if (!input.trim() || chatIsLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      let errorContent = '⚠️ Unable to connect to the AI service. '
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorContent += 'Please check that the backend server is running.'
        } else if (error.message.includes('401') || error.message.includes('API key')) {
          errorContent += 'Please configure your OpenAI API key in the integration settings.'
        } else {
          errorContent += error.message
        }
      } else {
        errorContent += 'An unexpected error occurred. Please try again.'
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setChatIsLoading(false)
    }
  }

  const handleVibeCoderMessage = async (input: string) => {
    if (!input.trim() || vibeCoderIsLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setVibeCoderMessages((prev) => [...prev, userMessage])
    setVibeCoderIsLoading(true)

    try {
      const response = await fetch('/api/vibe-coder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...vibeCoderMessages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }

      setVibeCoderMessages((prev) => [...prev, assistantMessage])

      if (data.code) {
        const newFile: CodeFile = {
          name: data.fileName || `file-${codeFiles.length + 1}.tsx`,
          content: data.code,
          language: data.language || 'tsx',
        }
        setCodeFiles((prev) => [...prev, newFile])
      }
    } catch (error) {
      let errorContent = '⚠️ Unable to connect to the code generation service. '
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorContent += 'Please check that the backend server is running.'
        } else if (error.message.includes('401') || error.message.includes('API key')) {
          errorContent += 'Please configure your OpenAI API key in the integration settings.'
        } else {
          errorContent += error.message
        }
      } else {
        errorContent += 'An unexpected error occurred. Please try again.'
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorContent,
        timestamp: new Date(),
      }
      setVibeCoderMessages((prev) => [...prev, errorMessage])
    } finally {
      setVibeCoderIsLoading(false)
    }
  }

  const handleUniversalInput = async (input: string) => {
    switch (mode) {
      case 'chat':
        await handleChatMessage(input)
        break
      case 'voice':
        console.log('Voice initiated:', input)
        break
      case 'vibe-coder':
        await handleVibeCoderMessage(input)
        break
      case 'settings':
        break
    }
  }

  const getPlaceholder = () => {
    switch (mode) {
      case 'chat':
        return 'Ask anything...'
      case 'voice':
        return 'Describe what you\'d like to discuss...'
      case 'vibe-coder':
        return 'Describe the code you want to generate...'
      case 'settings':
        return 'Search settings...'
      default:
        return 'Ask anything...'
    }
  }

  return (
    <div 
      className={`relative flex h-full w-full overflow-hidden bg-gradient-to-br ${theme.bgGradient} smooth-transition`}
    >
      <VerticalDock 
        currentMode={mode} 
        onModeChange={setMode}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className="relative w-full h-full overflow-auto">
        <AnimatePresence mode="wait">
          {mode === 'chat' && (
            <ChatInterface 
              key="chat" 
              theme={theme} 
              messages={chatMessages}
              isLoading={chatIsLoading}
            />
          )}
          {mode === 'voice' && <VoiceCallInterface key="voice" theme={theme} />}
          {mode === 'vibe-coder' && (
            <VibeCoderInterface 
              key="vibe-coder" 
              theme={theme}
              messages={vibeCoderMessages}
              isLoading={vibeCoderIsLoading}
              codeFiles={codeFiles}
            />
          )}
          {mode === 'settings' && (
            <SettingsInterface
              key="settings"
              currentTheme={theme}
              onThemeChange={onThemeChange}
            />
          )}
        </AnimatePresence>
      </main>

      <div className="fixed bottom-6 left-0 right-0 z-40 px-6">
        <div className="max-w-[800px] mx-auto" style={{ marginLeft: sidebarCollapsed ? '80px' : '80px' }}>
          <AIChatInput 
            onSend={handleUniversalInput}
            placeholder={getPlaceholder()}
            disabled={mode === 'settings'}
          />
        </div>
      </div>
    </div>
  )
}
