import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Send, Sparkles, RotateCcw, ArrowLeft,
  Copy, ThumbsUp, ThumbsDown, Paperclip, Mic, Plus
} from 'lucide-react'

const SUGGESTIONS = [
  { icon: '✨', text: 'Explain quantum computing' },
  { icon: '💻', text: 'Write a React hook' },
  { icon: '✍️', text: 'Draft a professional email' },
  { icon: '🧠', text: 'Help me brainstorm ideas' },
]

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{
        width: '30px', height: '30px', borderRadius: '50%',
        background: 'var(--gradient-brand)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Sparkles size={14} color="#fff" />
      </div>
      <div className="chat-bubble-ai" style={{ padding: '0.7rem 1rem' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ role, content, isNew }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (role === 'user') {
    return (
      <motion.div
        initial={isNew ? { opacity: 0, y: 16, scale: 0.97 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}
      >
        <div className="chat-bubble-user">{content}</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}
    >
      {/* AI avatar */}
      <div style={{
        width: '30px', height: '30px', borderRadius: '50%',
        background: 'var(--gradient-brand)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: '2px',
        boxShadow: '0 0 12px rgba(247,44,134,0.3)',
      }}>
        <Sparkles size={13} color="#fff" />
      </div>

      <div>
        <div className="chat-bubble-ai" style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
        {/* Action row */}
        <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.4rem', paddingLeft: '0.25rem' }}>
          {[
            { icon: Copy,      title: copied ? 'Copied!' : 'Copy', action: handleCopy },
            { icon: ThumbsUp,  title: 'Good response', action: () => {} },
            { icon: ThumbsDown, title: 'Bad response', action: () => {} },
          ].map(({ icon: Icon, title, action }) => (
            <button
              key={title}
              onClick={action}
              title={title}
              className="btn btn-glass btn-icon"
              style={{ padding: '0.3rem', borderRadius: '7px', opacity: 0.6 }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
            >
              <Icon size={12} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function EmptyState({ onSuggestionClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', flex: 1, padding: '2rem',
        textAlign: 'center',
      }}
    >
      {/* AI orb */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '88px', height: '88px',
          background: 'var(--gradient-brand)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 0 40px rgba(247,44,134,0.35), 0 0 80px rgba(139,92,246,0.15)',
        }}
      >
        <Sparkles size={36} color="#fff" />
      </motion.div>

      <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em',
        marginBottom: '0.5rem',
      }}>
        Welcome to <span className="gradient-text">QMee</span>
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '380px' }}>
        Ask me anything — I'm here to help you think, create, and explore.
      </p>

      {/* Suggestion grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.75rem', width: '100%', maxWidth: '520px',
      }}>
        {SUGGESTIONS.map(({ icon, text }) => (
          <motion.button
            key={text}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSuggestionClick(text)}
            style={{
              background: 'var(--color-surface-800)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.9rem 1rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'border-color 0.2s',
              fontFamily: 'inherit',
              color: 'var(--color-text-primary)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(247,44,134,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
          >
            <div style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>{icon}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>{text}</div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

const DEMO_RESPONSES = {
  default: `I'm QMee, your intelligent AI companion! I can help you with:\n\n• **Writing & editing** — emails, essays, code, stories\n• **Research & analysis** — summarizing, explaining, comparing\n• **Problem solving** — debugging, planning, brainstorming\n• **Creative work** — ideas, designs, strategies\n\nWhat would you like to explore today?`,
  'Explain quantum computing': `Quantum computing uses the principles of quantum mechanics to process information in fundamentally different ways than classical computers.\n\nKey concepts:\n\n1. **Qubits** — Unlike classical bits (0 or 1), qubits can exist in a superposition of both states simultaneously.\n\n2. **Superposition** — This allows quantum computers to explore many solutions at once, exponentially expanding processing power.\n\n3. **Entanglement** — Qubits can be "entangled," meaning the state of one instantly influences another, regardless of distance.\n\n4. **Applications** — Cryptography, drug discovery, optimization problems, and AI training that would take classical computers thousands of years.\n\nThink of it like this: a classical computer tries every door in a maze one at a time. A quantum computer tries all doors simultaneously. 🚀`,
  'Write a React hook': `Here's a versatile custom React hook for managing local state with persistence:\n\n\`\`\`javascript\nimport { useState, useEffect } from 'react'\n\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key)\n      return item ? JSON.parse(item) : initialValue\n    } catch (error) {\n      console.error(error)\n      return initialValue\n    }\n  })\n\n  const setValue = (value) => {\n    try {\n      const valueToStore = value instanceof Function\n        ? value(storedValue)\n        : value\n      setStoredValue(valueToStore)\n      window.localStorage.setItem(key, JSON.stringify(valueToStore))\n    } catch (error) {\n      console.error(error)\n    }\n  }\n\n  return [storedValue, setValue]\n}\n\nexport default useLocalStorage\n\`\`\`\n\nUsage: \`const [theme, setTheme] = useLocalStorage('theme', 'dark')\``,
}

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isNewMsg, setIsNewMsg] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleAutoGrow = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
  }

  const sendMessage = async (text) => {
    const userText = (text || input).trim()
    if (!userText) return

    setMessages(prev => [...prev, { role: 'user', content: userText }])
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setIsTyping(true)
    setIsNewMsg(true)

    await new Promise(r => setTimeout(r, 1400 + Math.random() * 800))

    const reply = DEMO_RESPONSES[userText] || DEMO_RESPONSES.default
    setIsTyping(false)
    setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    setTimeout(() => setIsNewMsg(false), 100)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => setMessages([])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100dvh', background: 'var(--color-surface-950)',
      position: 'relative', zIndex: 1,
    }}>
      {/* Chat Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.9rem 1.25rem',
          background: 'rgba(18,16,31,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--glass-border)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/" className="btn btn-glass btn-icon btn-sm" aria-label="Back to home">
            <ArrowLeft size={16} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--gradient-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--glow-sm)',
            }}>
              <Sparkles size={15} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <span className="gradient-text">Q</span>Mee
              </div>
              <div style={{ fontSize: '0.68rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                Online · Ready
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="btn btn-ghost btn-sm"
          style={{ gap: '0.35rem', fontSize: '0.78rem' }}
          title="New conversation"
        >
          <Plus size={14} /> New Chat
        </button>
      </motion.header>

      {/* Messages Area */}
      <div
        style={{
          flex: 1, overflowY: 'auto', padding: '1.25rem',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <AnimatePresence>
          {messages.length === 0 && !isTyping ? (
            <EmptyState onSuggestionClick={sendMessage} />
          ) : (
            <div style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}>
              {messages.map((msg, i) => (
                <MessageBubble
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  isNew={isNewMsg && i === messages.length - 1}
                />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Bar */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          padding: '0.9rem 1.25rem 1.1rem',
          background: 'rgba(18,16,31,0.8)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--glass-border)',
          flexShrink: 0,
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="chat-input-bar" style={{
            display: 'flex', alignItems: 'flex-end', gap: '0.5rem',
            padding: '0.6rem 0.6rem 0.6rem 1rem',
          }}>
            {/* Attachment */}
            <button className="btn btn-glass btn-icon" style={{ padding: '0.45rem', flexShrink: 0, opacity: 0.6 }} title="Attach file">
              <Paperclip size={15} /> 
              
            </button>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => { setInput(e.target.value); handleAutoGrow() }}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind?"
              rows={1}
              style={{
                flex: 1, background: 'transparent', border: 'none',
                outline: 'none', resize: 'none', color: 'var(--color-text-primary)',
                fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.6,
                padding: '0.25rem 0',
                maxHeight: '160px', overflowY: 'auto',
              }}
            />

            {/* Mic */}
            <button className="btn btn-glass btn-icon" style={{ padding: '0.45rem', flexShrink: 0, opacity: 0.6 }} title="Voice input">
              <Mic size={15} />
            </button>

            {/* Send */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="btn btn-primary btn-icon"
              style={{
                padding: '0.55rem', flexShrink: 0,
                borderRadius: 'var(--radius-md)',
                opacity: (!input.trim() || isTyping) ? 0.45 : 1,
                transition: 'all 0.2s',
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </motion.button>
          </div>

          <p style={{
            textAlign: 'center', color: 'var(--color-text-muted)',
            fontSize: '0.7rem', marginTop: '0.5rem',
          }}>
            QMee can make mistakes. Verify important information from trusted sources.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
