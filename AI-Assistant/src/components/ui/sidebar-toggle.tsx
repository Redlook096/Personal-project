import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type SidebarToggleProps = {
  collapsed: boolean
  onToggle: () => void
}

export function SidebarToggle({ collapsed, onToggle }: SidebarToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      className="relative flex items-center justify-center rounded-full glass-light border border-white/20 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      style={{
        width: '40px',
        height: '40px',
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!collapsed}
      tabIndex={0}
    >
      <motion.div
        animate={{ rotate: collapsed ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-700" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        )}
      </motion.div>
    </motion.button>
  )
}
