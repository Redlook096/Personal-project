import { MessageSquareText, PhoneCall, Sparkles, Sliders } from 'lucide-react'
import { motion } from 'framer-motion'
import { Dock, DockIcon, DockItem, DockLabel } from './ui/dock'
import { SidebarToggle } from './ui/sidebar-toggle'
import { useOrb } from '../contexts/OrbContext'
import type { AppMode } from '../types'

type VerticalDockProps = {
  currentMode: AppMode
  onModeChange: (mode: AppMode) => void
  collapsed: boolean
  onToggleCollapsed: () => void
}

export function VerticalDock({ currentMode, onModeChange, collapsed, onToggleCollapsed }: VerticalDockProps) {
  const { themeSettings } = useOrb()
  
  const dockItems = [
    {
      id: 'chat' as AppMode,
      title: 'Chat',
      icon: MessageSquareText,
    },
    {
      id: 'voice' as AppMode,
      title: 'Voice',
      icon: PhoneCall,
    },
    {
      id: 'vibe-coder' as AppMode,
      title: 'Coder',
      icon: Sparkles,
    },
    {
      id: 'settings' as AppMode,
      title: 'Settings',
      icon: Sliders,
    },
  ]

  return (
    <div className='fixed left-4 top-1/2 -translate-y-1/2 z-50 overflow-visible flex flex-col items-center gap-4'>
      <Dock 
        direction='vertical'
        magnification={collapsed ? 44 : 56}
        distance={60}
        panelWidth={collapsed ? 20 : 80}
        spring={{ stiffness: 200, damping: 20, mass: 0.1 }}
        className="overflow-visible"
        collapsed={collapsed}
      >
        {dockItems.map((item) => {
          const Icon = item.icon
          const isActive = currentMode === item.id

          return (
            <DockItem
              key={item.id}
              className={`aspect-square rounded-2xl smooth-transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50'
                  : 'hover-lift text-gray-700 hover:text-gray-900'
              }`}
              onClick={() => onModeChange(item.id)}
            >
              <DockLabel>
                {item.title}
              </DockLabel>
              <DockIcon>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 / themeSettings.animationSpeed }}
                >
                  <Icon className="h-full w-full transition-colors" />
                </motion.div>
              </DockIcon>
            </DockItem>
          )
        })}
      </Dock>
      
      <SidebarToggle collapsed={collapsed} onToggle={onToggleCollapsed} />
    </div>
  )
}
