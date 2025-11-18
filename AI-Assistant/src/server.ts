import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) {
  console.error('⚠️  OPENAI_API_KEY environment variable is not set')
  console.error('Please set your OpenAI API key in the environment variables')
}

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey })

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-5',
      messages: messages,
      max_completion_tokens: 8192,
    })

    res.json({
      message: completion.choices[0].message.content,
    })
  } catch (error: any) {
    console.error('Chat error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.post('/api/vibe-coder', async (req, res) => {
  try {
    const { messages } = req.body

    const systemPrompt = `You are an elite software engineer and UI/UX designer creating production-grade applications. 

MANDATORY REQUIREMENTS:
1. Always go BEYOND what the user asks for - add delightful details, micro-interactions, and polish
2. Create COMPLETE, PROFESSIONAL applications with:
   - Stunning, modern UI with consistent design language
   - Smooth animations and transitions
   - Responsive design that works on all devices
   - Professional color schemes and typography
   - Proper spacing, shadows, and depth
   - Accessibility features

3. DESIGN STANDARDS:
   - Use rounded corners (rounded-2xl, rounded-3xl) for iOS-like feel
   - Implement glassmorphism effects (backdrop-blur, bg-white/10)
   - Add smooth transitions and hover states
   - Use consistent spacing (px-6, py-4, gap-4)
   - Apply professional gradients and shadows
   - Include loading states and error handling

4. CODE QUALITY:
   - Write clean, well-organized TypeScript/React code
   - Use proper type safety
   - Include helpful comments
   - Follow best practices and patterns
   - Make code reusable and maintainable

5. FORMAT:
   - Provide brief explanation of what you built
   - Include complete, production-ready code
   - Use markdown code blocks: \`\`\`typescript:filename.tsx
   - Generate multiple files if needed for a complete solution

TAKE INITIATIVE: If user asks for a "button", create an entire component library. If they ask for a "form", build a complete multi-step form with validation and animations. Always deliver MORE than requested with professional quality.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-5',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_completion_tokens: 8192,
    })

    const response = completion.choices[0].message.content || ''
    
    const codeBlockRegex = /```(\w+)(?::(.+?))?\n([\s\S]+?)```/g
    const matches = [...response.matchAll(codeBlockRegex)]
    
    let code = null
    let fileName = null
    let language = null
    
    if (matches.length > 0) {
      const match = matches[0]
      language = match[1]
      fileName = match[2] || `component.${language}`
      code = match[3]
    }

    res.json({
      message: response,
      code,
      fileName,
      language,
    })
  } catch (error: any) {
    console.error('Vibe coder error:', error)
    res.status(500).json({ error: error.message })
  }
})

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 API server running on port ${PORT}`)
})
