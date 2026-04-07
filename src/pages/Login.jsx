import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Sparkles, Mail, Lock } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setError(''); setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    
    if (login(form.email, form.password)) {
      setLoading(false)
      navigate('/chat')
    } else {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div style={{
        minHeight: '100dvh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '5rem 1.5rem 2rem',
        position: 'relative', zIndex: 1,
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ width: '100%', maxWidth: '420px' }}
        >
          {/* Card */}
          <div style={{
            background: 'var(--color-surface-900)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(1.75rem, 5vw, 2.5rem)',
          }}>
            {/* Brand */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '52px', height: '52px',
                background: 'var(--gradient-brand)',
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: 'var(--glow-sm)',
              }}>
                <Sparkles size={24} color="#fff" />
              </div>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.025em', marginBottom: '0.35rem',
              }}>
                Welcome back
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.87rem' }}>
                Sign in to continue to <span className="gradient-text" style={{ fontWeight: 700 }}>QMee</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                  Email address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    className="input-field"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    style={{ paddingLeft: '2.5rem' }}
                    autoComplete="email"
                    id="login-email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Password</label>
                  <Link to="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--color-brand-400)', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPw ? 'text' : 'password'}
                    className="input-field"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                    autoComplete="current-password"
                    id="login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
                    style={{
                      position: 'absolute', right: '0.9rem', top: '50%',
                      transform: 'translateY(-50%)', background: 'none',
                      border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0,
                    }}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p style={{ color: '#f43f5e', fontSize: '0.8rem', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
                  {error}
                </p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '0.25rem', gap: '0.5rem', justifyContent: 'center' }}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  </span>
                ) : (
                  <><span>Sign In</span> <ArrowRight size={16} /></>
                )}
              </motion.button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.84rem' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: 'var(--color-brand-400)', textDecoration: 'none', fontWeight: 600 }}>
                Sign up free
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
