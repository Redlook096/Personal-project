export const designTokens = {
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    full: '9999px',
  },
  blur: {
    sm: 'blur(8px)',
    md: 'blur(16px)',
    lg: 'blur(24px)',
    xl: 'blur(32px)',
  },
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
    md: '0 4px 16px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 32px rgba(0, 0, 0, 0.2)',
    xl: '0 16px 48px rgba(0, 0, 0, 0.25)',
    glow: '0 0 40px rgba(255, 255, 255, 0.1)',
  },
  colors: {
    glass: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.15)',
      dark: 'rgba(0, 0, 0, 0.3)',
    },
    gradient: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      dark: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
  },
}

export const iosStyles = {
  card: `rounded-[${designTokens.borderRadius.xl}] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl`,
  button: `rounded-full px-6 py-3 font-medium transition-all duration-200 hover:scale-105 active:scale-95`,
  input: `rounded-3xl bg-black/5 dark:bg-white/5 border-none focus:ring-2 focus:ring-white/30`,
  container: 'max-w-5xl mx-auto px-6',
}
