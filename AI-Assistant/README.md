# AI Assistant - Next Generation AI Platform

A professional, cinematic desktop AI assistant powered by OpenAI's GPT-5 model. Features three core interaction modes (Chat, Voice Call, Vibe Coder), beautiful animated orbs, customizable themes, and fully customizable settings. Optimized for professional presentations with iOS-like design language.

![AI Assistant](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Key Features

### 🎬 Cinematic Intro Sequence
- Professional 4-stage animation: fade in → wordmark → orb transition → main app
- Smooth orb position transitions with no disappear/reappear
- Production-quality typography and gradient backgrounds

### 💬 Chat Interface
- Full conversational AI powered by GPT-5
- Markdown support with refined syntax highlighting
- Message history with smooth scrolling
- Bottom-docked iOS-like input bar
- Comprehensive error handling

### 📞 Voice Call Mode
- Interactive voice call interface with visual feedback
- Phone/Mic icons with CSS-only pulse animations
- Compact control buttons for mute and hang up
- **Note:** UI-only implementation (audio functionality not yet implemented)

### 💻 Vibe Coder
- Elite AI code generation with enhanced system prompt
- Split-screen interface (stacks vertically on mobile)
- Multiple file tabs for viewing generated files
- Compact syntax highlighting
- Toggle between preview and code views
- AI automatically adds polish and micro-interactions

### 🌈 Beautiful Animated Orbs
- Integration with [react-ai-orb](https://github.com/Steve0929/react-ai-orb) library
- 6 preset palettes: Theme, Cosmic, Ocean, Forest, Sunset, Fire
- Adjustable animation speed (0.1 - 1.0)
- Adjustable opacity (0.1 - 0.8)
- Enable/disable toggle
- Real-time visual updates

### ⚙️ Complete Theme Customization
- **Appearance Tab**: 6 beautiful light color themes
  - Purple Dream, Ocean Blue, Emerald Forest, Rose Gold, Violet Sunset, Amber Glow
- **Orbs Tab**: Complete orb customization with live previews
- **Advanced Tab**:
  - Glass intensity slider (affects ALL glass surfaces)
  - Animation speed slider (affects ALL animations)
  - Font family selector (Inter/System)
  - Font size selector (Comfortable/Compact)
- Settings persist via localStorage

### 🎨 Professional Desktop UI
- **Apple-style Vertical Dock**: Glassmorphism with magnification on hover
- **iOS-like Input Bars**: Bottom-docked with auto-resize
- **High Contrast Light Theme**: WCAG AA compliant
- **Smooth Animations**: Framer Motion throughout
- Fully responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd ai-assistant
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
VITE_API_URL=http://localhost:3001
```

4. **Start the application**

Run both frontend and backend concurrently:

```bash
# Terminal 1 - Backend API
npm run server

# Terminal 2 - Frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5000
- Backend API: http://localhost:3001

## 📦 Deployment

This application is **100% portable** and works on any platform. No Replit dependencies.

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Set environment variables** in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PORT`: 3001
   - `VITE_API_URL`: Your backend URL (e.g., https://your-api.vercel.app)

### Deploy to Netlify

1. **Build the application**
```bash
npm run build
```

2. **Deploy** via Netlify CLI or drag-and-drop the `dist` folder

3. **Set environment variables** in Netlify dashboard

### Deploy to Railway/Render/Fly.io

Works with any platform supporting Node.js:
1. Connect your repository
2. Set environment variables
3. Deploy with `npm run server` and `npm run dev`

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **react-ai-orb** for animated backgrounds
- **Framer Motion** for smooth animations
- **Radix UI** for accessible components
- **React Markdown** with syntax highlighting
- **Lucide React** for icons

### Backend
- **Express** server (Node.js)
- **OpenAI API** (GPT-5 model)
- **CORS** enabled for frontend communication

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── MainApp.tsx            # Main layout with vertical dock
│   │   ├── VerticalDock.tsx       # Apple-style navigation
│   │   ├── CinematicIntro.tsx     # Intro animation sequence
│   │   ├── ChatInterface.tsx      # AI chat with message history
│   │   ├── VoiceCallInterface.tsx # Voice call UI (stub)
│   │   ├── VibeCoderInterface.tsx # Code generation interface
│   │   ├── SettingsInterface.tsx  # Theme & settings panel
│   │   └── OrbCanvas.tsx          # Animated orb wrapper
│   ├── contexts/
│   │   └── OrbContext.tsx         # Global theme & orb settings
│   ├── lib/
│   │   ├── utils.ts               # Utility functions
│   │   ├── design-system.ts       # Design tokens
│   │   ├── themes.ts              # Theme color definitions
│   │   └── orb-presets.ts         # Orb palette presets
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── server.ts                  # Express backend API
│   ├── App.tsx                    # App root with providers
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── .env.example                   # Environment variables template
├── package.json
├── tsconfig.json
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js
└── postcss.config.js
```

## 🔌 API Endpoints

### POST `/api/chat`
Chat with GPT-5
- Request: `{ messages: Array<{ role, content }> }`
- Response: `{ message: string }`

### POST `/api/vibe-coder`
Generate code with enhanced AI prompt
- Request: `{ messages: Array<{ role, content }> }`
- Response: `{ message, code, fileName, language }`

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `PORT` | Backend server port | No (default: 3001) |
| `VITE_API_URL` | Backend API URL for frontend | No (default: http://localhost:3001) |

### Customization

All settings are accessible via the Settings panel:

1. **Appearance**: Choose from 6 light themes
2. **Orbs**: Customize animated background
   - Preset palettes
   - Animation speed
   - Opacity level
   - Enable/disable
3. **Advanced**: Fine-tune the experience
   - Glass intensity (affects glassmorphism throughout)
   - Animation speed (affects all transitions)
   - Font family
   - Font size

Settings persist across sessions via localStorage.

## 🎯 Development

### Run in Development Mode

```bash
# Terminal 1 - Backend with hot reload
npm run server

# Terminal 2 - Frontend with hot reload
npm run dev
```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` folder.

## 🐛 Troubleshooting

### OpenAI API Errors

If you see "OpenAI API Error":
1. Verify your API key is correct in `.env`
2. Check you have credits in your OpenAI account
3. Ensure the model name is correct (GPT-5)

### Port Already in Use

If port 3001 or 5000 is already in use:
```bash
# Kill the process using the port
npx kill-port 3001
npx kill-port 5000
```

Or change the ports in `.env`:
```env
PORT=3002
VITE_API_URL=http://localhost:3002
```

### Vite Build Issues

Clear cache and rebuild:
```bash
rm -rf node_modules/.vite
npm run dev
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [react-ai-orb](https://github.com/Steve0929/react-ai-orb) for beautiful animated orbs
- OpenAI for GPT-5 API
- Radix UI for accessible components
- Framer Motion for smooth animations

---

**Built with 💜 for the next generation of AI assistants**
