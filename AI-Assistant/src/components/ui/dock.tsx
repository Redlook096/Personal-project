'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'framer-motion';
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import { useAnimationDuration } from '@/contexts/OrbContext';

const DOCK_WIDTH = 128;
const DEFAULT_MAGNIFICATION = 24;
const DEFAULT_DISTANCE = 60;
const DEFAULT_PANEL_WIDTH = 64;

type DockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelWidth?: number;
  magnification?: number;
  spring?: SpringOptions;
  direction?: 'horizontal' | 'vertical';
  collapsed?: boolean;
};
type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};
type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};
type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

type DocContextType = {
  mouseY: MotionValue;
  spring: SpringOptions;
  magnification: number;
  distance: number;
  direction: 'horizontal' | 'vertical';
  collapsed: boolean;
};
type DockProviderProps = {
  children: React.ReactNode;
  value: DocContextType;
};

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within an DockProvider');
  }
  return context;
}

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 200, damping: 20 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelWidth = DEFAULT_PANEL_WIDTH,
  direction = 'vertical',
  collapsed = false,
}: DockProps) {
  const mouseY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxWidth = useMemo(() => {
    return Math.max(DOCK_WIDTH, magnification + magnification / 2 + 4);
  }, [magnification]);

  const widthRow = useTransform(isHovered, [0, 1], [panelWidth, maxWidth]);
  const width = useSpring(widthRow, spring);

  return (
    <motion.div
      style={{
        width: direction === 'vertical' ? width : 'auto',
        height: direction === 'vertical' ? 'auto' : width,
        scrollbarWidth: 'none',
      }}
      className={cn(
        'flex items-center overflow-visible',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        'mx-2'
      )}
    >
      <motion.div
        onMouseMove={({ pageY }) => {
          if (direction === 'vertical') {
            isHovered.set(1);
            mouseY.set(pageY);
          }
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseY.set(Infinity);
        }}
        className={cn(
          'flex gap-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl',
          direction === 'vertical' ? 'flex-col px-4 py-6' : 'flex-row py-4 px-6',
          className
        )}
        style={{ 
          width: direction === 'vertical' ? panelWidth : 'auto',
          height: direction === 'vertical' ? 'auto' : panelWidth,
        }}
        role='toolbar'
        aria-label='Application dock'
      >
        <DockProvider value={{ mouseY, spring, distance, magnification, direction, collapsed }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, className, onClick }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { distance, magnification, mouseY, spring, direction } = useDock();

  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseY, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - domRect.y - domRect.height / 2;
  });

  const sizeTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const size = useSpring(sizeTransform, spring);

  return (
    <motion.div
      ref={ref}
      style={{ 
        width: direction === 'vertical' ? size : 'auto',
        height: direction === 'vertical' ? size : 'auto',
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center cursor-pointer',
        className
      )}
      tabIndex={0}
      role='button'
      aria-haspopup='true'
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, { size, isHovered })
      )}
    </motion.div>
  );
}

function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const restProps = rest as Record<string, unknown>;
  const isHovered = restProps['isHovered'] as MotionValue<number>;
  const getDuration = useAnimationDuration();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });

    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 10 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: getDuration(0.2) }}
          className={cn(
            'absolute left-full ml-2 top-1/2 -translate-y-1/2 w-fit whitespace-pre rounded-md glass-light px-2 py-0.5 text-xs text-gray-900 z-[9999]',
            className
          )}
          role='tooltip'
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className, ...rest }: DockIconProps) {
  const restProps = rest as Record<string, unknown>;
  const size = restProps['size'] as MotionValue<number>;

  const sizeTransform = useTransform(size, (val) => val / 2);

  return (
    <motion.div
      style={{ width: sizeTransform, height: sizeTransform }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  );
}

export { Dock, DockIcon, DockItem, DockLabel };
