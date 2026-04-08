import { useState, useEffect } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, MessageCircle, User, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.36, 0.66, 0.04, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 50, padding: '0 1.5rem',
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(15,17,21,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* Logo */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <div style={{
              width: '32px', height: '32px',
              background: 'var(--gradient-brand)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--glow-sm)',
            }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800, fontSize: '1.2rem',
              letterSpacing: '-0.02em',
            }}>
              <span className="gradient-text">Q</span>
              <span style={{ color: 'var(--color-text-primary)' }}>Mee</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            className="hidden md:flex"
            aria-label="Main navigation"
          >
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ padding: '0.35rem 0.9rem' }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {!user ? (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm hidden md:flex">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/chat"
                  className="btn btn-primary btn-sm"
                  style={{ gap: '0.4rem' }}
                  aria-label="Open chat"
                >
                  <MessageCircle size={14} />
                  <span className=" sm:inline">Chat</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="btn btn-glass btn-icon hidden md:flex"
                  aria-label="View profile"
                >
                  <User size={18} />
                </Link>
              </>
            )}
            {/* Mobile hamburger */}
            <button
              className="btn btn-glass btn-icon md:hidden flex"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="btn btn-glass btn-icon"
              style={{ position: 'absolute', top: '1.25rem', right: '1.5rem' }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            {/* Mobile logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'var(--gradient-brand)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.4rem' }}>
                <span className="gradient-text">Q</span>
                <span style={{ color: 'var(--color-text-primary)' }}>Mee</span>
              </span>
            </div>

            {links.map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <NavLink
                  to={to}
                  end={to === '/'}
                  style={{
                    fontSize: '1.5rem', fontWeight: 700,
                    textDecoration: 'none',
                    color: 'var(--color-text-secondary)',
                    transition: 'color 0.2s',
                  }}
                  className={({ isActive }) => isActive ? 'gradient-text' : ''}
                >
                  {label}
                </NavLink>
              </motion.div>
            ))}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.07 + 0.1 }}
              >
                <NavLink
                  to="/profile"
                  style={{
                    fontSize: '1.5rem', fontWeight: 700,
                    textDecoration: 'none',
                    color: 'var(--color-text-secondary)',
                    transition: 'color 0.2s',
                  }}
                  className={({ isActive }) => isActive ? 'gradient-text' : ''}
                >
                  Profile
                </NavLink>
              </motion.div>
            )}

            {!user ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}
              >
                <Link to="/login" className="btn btn-primary btn-lg" style={{ width: '80%' }}>
                   Login
                </Link>
                <Link to="/signup" className="btn btn-ghost btn-lg" style={{ width: '80%' }}>
                   Sign Up
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}
              >
                <Link to="/chat" className="btn btn-primary btn-lg" style={{ width: '80%' }}>
                  <MessageCircle size={18} /> Chat
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="btn btn-ghost btn-lg" style={{ width: '80%', color: '#f43f5e' }}>
                  <LogOut size={18} /> Logout
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}
