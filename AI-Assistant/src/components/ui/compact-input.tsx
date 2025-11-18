import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { motion } from 'framer-motion'

type CompactInputProps = {
  placeholder?: string
  onSubmit: (value: string) => void
  disabled?: boolean
}

export function CompactInput({ 
  placeholder = 'Ask me anything...', 
  onSubmit, 
  disabled = false
}: CompactInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [value])

  const handleSubmit = () => {
    if (value.trim() && !disabled) {
      onSubmit(value)
      setValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-end gap-3 px-6 py-4">
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          aria-label={placeholder}
          className="w-full resize-none rounded-2xl border-2 border-gray-300 bg-white px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
          style={{ maxHeight: '120px' }}
        />
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={!value.trim() || disabled}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={value.trim() && !disabled ? { scale: 1.05 } : {}}
        whileTap={value.trim() && !disabled ? { scale: 0.95 } : {}}
      >
        <Send className="h-5 w-5" />
      </motion.button>
    </div>
  )
}
