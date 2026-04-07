import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address.')
      return
    }
    setError('')
    setLoading(true)
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <PageWrapper>
      <div style={{
        minHeight: '100dvh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '6rem 1.5rem 2rem',
        position: 'relative', zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ width: '100%', maxWidth: '420px' }}
        >
          <div style={{
            background: 'var(--color-surface-900)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(1.75rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Brand/Header */}
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                      width: '52px', height: '52px',
                      background: 'var(--gradient-brand)',
                      borderRadius: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.25rem',
                      boxShadow: 'var(--glow-sm)',
                    }}>
                      <Sparkles size={24} color="#fff" />
                    </div>
                    <h1 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', marginBottom: '0.6rem',
                    }}>
                      Forgot password?
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.87rem', lineHeight: 1.6 }}>
                      No worries, we'll send you reset instructions.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                        Email address
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={15} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="email"
                          className="input-field"
                          placeholder="you@example.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          style={{ paddingLeft: '2.5rem' }}
                          autoComplete="email"
                        />
                      </div>
                      {error && (
                        <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: '0.4rem', marginLeft: '0.2rem' }}>
                          {error}
                        </p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-primary btn-lg"
                      style={{ width: '100%', gap: '0.6rem', justifyContent: 'center' }}
                      disabled={loading}
                    >
                      {loading ? (
                        <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                        </span>
                      ) : (
                        <><span>Reset Password</span> <ArrowRight size={16} /></>
                      )}
                    </motion.button>

                    <Link
                      to="/login"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.85rem',
                        fontWeight: 500, marginTop: '0.5rem', transition: 'color 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                    >
                      <ArrowLeft size={14} /> Back to log in
                    </Link>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ textAlign: 'center', padding: '1rem 0' }}
                >
                  <div style={{
                    width: '64px', height: '64px',
                    background: 'rgba(74, 222, 128, 0.1)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: '#4ade80'
                  }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.75rem'
                  }}>
                    Check your email
                  </h2>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                    We've sent a password reset link to <br />
                    <strong style={{ color: 'var(--color-text-primary)' }}>{email}</strong>
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn btn-primary btn-md"
                      style={{ width: '100%' }}
                    >
                      Resend email
                    </button>
                    <Link
                      to="/login"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        color: 'var(--color-brand-400)', textDecoration: 'none', fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      <ArrowLeft size={14} /> Back to log in
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
