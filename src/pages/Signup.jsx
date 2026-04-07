import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { useAuth } from '../hooks/useAuth'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signup } = useAuth()

  const validate = () => {
    if (!form.name.trim())  return 'Please enter your name.'
    if (!form.email.trim()) return 'Please enter your email.'
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email address.'
    if (form.password.length < 8) return 'Password must be at least 8 characters.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }
    setError(''); setLoading(true)
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1200))
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === form.email)) {
      setError('An account with this email already exists.')
      setLoading(false)
      return
    }

    signup(form)
    setLoading(false)
    navigate('/login') // Redirect to login after signup
  }

  const strength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2 : 3

  const strengthColors = ['none', '#f43f5e', '#f59e0b', '#4ade80']
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong']

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
                Create your account
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.87rem' }}>
                Join <span className="gradient-text" style={{ fontWeight: 700 }}>QMee</span> — free forever, no card needed
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                  Full name
                </label>
                <div style={{ position: 'relative' }}>
                  <UserIcon size={15} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    style={{ paddingLeft: '2.5rem' }}
                    autoComplete="name"
                    id="signup-name"
                  />
                </div>
              </div>

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
                    id="signup-email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={15} color="var(--color-text-muted)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPw ? 'text' : 'password'}
                    className="input-field"
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                    autoComplete="new-password"
                    id="signup-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
                    style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0 }}
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {/* Password strength */}
                {form.password.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '0.25rem' }}>
                      {[1,2,3].map(s => (
                        <div key={s} style={{
                          flex: 1, height: '3px', borderRadius: '99px',
                          background: s <= strength ? strengthColors[strength] : 'var(--color-surface-700)',
                          transition: 'background 0.3s',
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
                  </div>
                )}
              </div>

              {error && (
                <p style={{ color: '#f43f5e', fontSize: '0.8rem', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '8px', padding: '0.5rem 0.75rem' }}>
                  {error}
                </p>
              )}

              <p style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                By signing up, you agree to our{' '}
                <a href="#" style={{ color: 'var(--color-brand-400)', textDecoration: 'none' }}>Terms</a> and{' '}
                <a href="#" style={{ color: 'var(--color-brand-400)', textDecoration: 'none' }}>Privacy Policy</a>.
              </p>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '0.1rem', gap: '0.5rem', justifyContent: 'center' }}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  </span>
                ) : (
                  <><span>Create Account</span> <ArrowRight size={16} /></>
                )}
              </motion.button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.84rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--color-brand-400)', textDecoration: 'none', fontWeight: 600 }}>
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
