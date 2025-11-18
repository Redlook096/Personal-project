import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useOrb, useAnimationDuration } from '../contexts/OrbContext'
import type { Message, ThemeColor } from '../types'

type ChatInterfaceProps = {
  theme: ThemeColor
  messages: Message[]
  isLoading: boolean
}

export function ChatInterface({ theme, messages, isLoading }: ChatInterfaceProps) {
  const { themeSettings } = useOrb()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 / themeSettings.animationSpeed }}
      className="flex h-full flex-col"
    >
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 && (
            <motion.div
              className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`rounded-full bg-gradient-to-br ${theme.orbGradient} p-6 shadow-lg`}>
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <h2 className="mt-6 text-2xl font-light text-gray-900">
                How can I help you today?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ask me anything, and I'll do my best to assist you.
              </p>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <MessageBubble key={message.id} message={message} index={index} theme={theme} />
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-gray-600"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </motion.div>
  )
}

function MessageBubble({ message, index, theme }: { message: Message; index: number; theme: ThemeColor }) {
  const { themeSettings, getGlassStyle } = useOrb()
  const getDuration = useAnimationDuration()
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3 / themeSettings.animationSpeed,
        delay: (index * 0.05) / themeSettings.animationSpeed 
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: getDuration(0.2) }}
        style={!isUser ? getGlassStyle(themeSettings.glassIntensity) : undefined}
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-lg hover-lift ${
          isUser
            ? `bg-gradient-to-br ${theme.orbGradient} text-white`
            : 'text-gray-800'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : (
          <ReactMarkdown
            className="prose prose-sm prose-gray max-w-none"
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-xl my-2 text-xs"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-800" {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </motion.div>
    </motion.div>
  )
}
