# AI Assistant - Next Generation AI Platform

## Overview
This project is a professional, cinematic desktop AI assistant application leveraging OpenAI's GPT-5. It offers three core interaction modes (Chat, Voice Call, Vibe Coder), features customizable animated orbs, a comprehensive theme system, and robust settings. The application is designed with a "million-dollar AI startup" aesthetic, incorporating an iOS-like design, smooth animations, and high-contrast accessibility. It is 100% portable, designed to run on any hosting platform without Replit-specific dependencies, and aims to provide an engaging, memorable user experience.

## User Preferences
- Professional, presentable aesthetic (million-dollar AI startup quality)
- Cinematic intro sequence with smooth orb transitions
- Fully customizable animated orbs with live previews
- Multiple interaction modes for different use cases (Chat, Voice, Code)
- High contrast, accessible design (WCAG AA compliant)
- iOS-like design language with smooth animations
- Real-time customization with immediate visual feedback
- Settings persistence across sessions
- Desktop application feel (not website)
- Portable to any hosting platform
- 100% functional features

## System Architecture
The application utilizes a React 18 frontend with TypeScript, Vite for bundling, and Tailwind CSS for styling. Animations are handled by Framer Motion, complemented by `react-ai-orb` for background effects and Radix UI for accessible components. The UI features a vertical dock navigation inspired by Apple's design, iOS-like bottom-docked input bars, and a high-contrast light theme with pervasive glassmorphism. All UI elements respond dynamically to theme and animation speed settings, providing a consistent and customizable user experience. A separate Express.js backend handles secure OpenAI API interactions. Architectural decisions prioritize modularity, performance, and portability, ensuring the application is production-ready and easily deployable.

### UI/UX Decisions
- **Horizontal 3-Orb Layout:** Cinematic orb display with center orb (1000px) and side orbs (600px) arranged horizontally across the screen with enhanced parallax effects (varying intensities: 1x center, 0.5x sides) for visual depth. Orbs always render with minimum 20% opacity to prevent invisible states.
- **Cinematic Intro:** 5-stage animation sequence - center orb grows from scale 0.3 to 1.0, side orbs slide horizontally from center outward (±200px initial offset) into final positions, creating smooth horizontal "going" motion. All 3 orbs remain visible as intro fades, ensuring seamless transition to main app without orb disappearance or position snap.
- **Navigation:** Apple-style vertical dock with magnification (80px panel width to accommodate scaled icons), glassmorphism, and icon-based navigation.
- **Input Design:** Bottom-docked, iOS-like input bars with auto-resize textareas and glassmorphic styling.
- **Theming:** Centralized `OrbContext` providing 6 light themes, comprehensive orb customization, and advanced settings (glass intensity, animation speed, font) with opacity clamping (min 0.2) to prevent invisible orbs from localStorage persistence.
- **Aesthetics:** High contrast, WCAG AA compliant light theme with `gray-900` text, dynamically styled glassmorphic elements (`.glass-light` for light backgrounds, `.glass-dark` for dark overlays), and theme-aware gradients.
- **Animations:** Extensive use of Framer Motion for transitions, micro-interactions, message reveals, and tab switches, all scalable via a global animation speed setting. Enhanced parallax orb effects with mouse tracking add interactive depth.

### Technical Implementations
- **Frontend:** React 18 with TypeScript, Vite, Tailwind CSS, Framer Motion, Radix UI, React Markdown, Lucide React, Inter Font.
- **Backend:** Express.js (Node.js) for secure API handling, `dotenv` for environment variables.
- **State Management:** `OrbContext` with lazy initialization, partial updates, and SSR-safe localStorage for settings persistence.
- **Styling:** Tailwind CSS with dynamic `getGlassStyle()` function for real-time glassmorphism adjustments.
- **API Integration:** Dedicated Express endpoints for chat and code generation, leveraging OpenAI's GPT-5 model.

### Feature Specifications
- **Chat Interface:** Full conversational AI with GPT-5, Markdown support, message history, and error handling.
- **Voice Call Mode:** UI-only implementation with interactive visuals and status indicators.
- **Vibe Coder:** Elite AI code generation with enhanced system prompts, split-screen interface, multiple file tabs, and syntax highlighting.
- **Customizable Orbs:** `react-ai-orb` integration (v1.0.13) with 6 presets, adjustable speed and opacity (minimum 20%), horizontal 3-orb layout, and live previews. Orbs use flat OrbPalette structure matching library API expectations.
- **Theme Customization:** Comprehensive settings for appearance, orb characteristics, and advanced UI elements (glass intensity, animation speed, font family/size). Includes opacity safeguards to maintain orb visibility.

## Recent Changes (November 18, 2025)
### Major UI Overhaul & iOS/AI Polish
- **Removed Intro Text:** Intro animation now shows only animated orb (no "AI Assistant" text) per user feedback
- **Orb Sizing Fix:** Reduced docked orb scale from 0.15 to 0.07 (70px instead of 150px) for more appropriate size
- **New AI Chat Input:** Integrated modern iOS-style expandable input with animated placeholders, Think/Deep Search toggles
- **Settings Redesign:** Complete visual overhaul with lighter iOS liquid glass aesthetic - increased transparency, softer colors, gradient active states
- **Orb Type Selector:** Added UI toggle between Custom CSS Orb and React AI Orb (react-ai-orb library) in settings
- **Dock Improvements:** Reduced hover magnification (40→32) and distance (96→80) for subtler, more responsive interactions
- **Package Updates:** Installed `motion` package for advanced input animations

### Technical Fixes
- Fixed OrbHost auto-transition logic for when intro is skipped
- Improved spring physics configuration for smoother animations
- Updated getGlassStyle() for lighter, more iOS-like frosted glass effects
- Fixed TypeScript errors in new components (motion package type assertions)

### Known Issues (In Progress)
- Orb scaling animation from intro→docked state needs tuning
- Intro completion timing occasionally inconsistent during HMR (hot module replacement)
- Need to verify full orb transition flow works correctly

## Recent Changes (November 17, 2025)
### Horizontal Orb Implementation
- **OrbCanvas.tsx:** Refactored to horizontal 3-orb layout - center orb (1000px) flanked by side orbs (600px) with edge overflow for dramatic effect. Enhanced parallax with differentiated intensities and mouse tracking (30px range). Removed enabled check to ensure orbs always render.
- **CinematicIntro.tsx:** Updated to 5-stage animation - center orb grows (800ms), text appears (2200ms), side orbs slide in horizontally from center (3500ms with ±200px offset), text fades (4800ms), intro completes (5500ms). Side orbs use horizontal slide animation creating "going horizontal" visual effect.
- **OrbContext.tsx:** Added opacity clamping (minimum 0.2) in both loadSettings() and setOrbSettings() to prevent invisible orbs from localStorage persistence. This fixes blank screen issues caused by zero-opacity states.
- **CSS Utilities:** Created separate `.glass-light` (light bg, dark text) and `.glass-dark` (dark bg, light text) utilities to prevent regressions.
- **Dock Panel:** Increased width to 80px to properly contain magnified icons without clipping.

### Technical Debugging
- Verified react-ai-orb API: Uses `palette` prop (not `colorPalette`) with flat property structure matching our OrbPalette type.
- Confirmed correct palette format: mainBgStart/End, shadowColor1-4, shapeAStart/End, shapeBStart/Middle/End, etc.
- Architect identified root cause of invisible orbs: opacity: 0 from localStorage making WebGL canvases invisible while leaving UI intact.

## External Dependencies
- **OpenAI API:** Used for powering the GPT-5 conversational AI (Chat interface) and elite code generation (Vibe Coder).
- **react-ai-orb:** A third-party library for rendering and customizing the animated background orbs.
- **Radix UI:** A library providing accessible and unstyled components (Tabs, Switch, Slider) for building the UI.
- **Lucide React:** A collection of open-source icons used throughout the application.
- **React Markdown:** Used for rendering Markdown content within the chat interface.