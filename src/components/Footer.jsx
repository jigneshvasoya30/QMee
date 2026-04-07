import { Link } from 'react-router-dom'
import { Sparkles, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const footerLinks = {
  Product: [
    { label: 'Features', to: '/features' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Chat', to: '/chat' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Login', to: '/login' },
    { label: 'Sign up', to: '/signup' },
  ],
}

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 1,
      borderTop: '1px solid var(--glass-border)',
      marginTop: '6rem',
      padding: '3rem 1.5rem 2rem',
      background: 'rgba(12,11,20,0.6)',
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '0.75rem' }}>
              <div style={{
                width: '30px', height: '30px',
                background: 'var(--gradient-brand)',
                borderRadius: '9px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.1rem' }}>
                <span className="gradient-text">Q</span>
                <span style={{ color: 'var(--color-text-primary)' }}>Mee</span>
              </span>
            </Link>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', lineHeight: 1.7, maxWidth: '200px' }}>
              Your intelligent AI companion. Ask anything, get thoughtful answers instantly.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
              {[
                { Icon: FaGithub, href: '#', label: 'GitHub' },
                { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
                { Icon: FaTwitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="btn btn-glass btn-icon btn-sm"
                  style={{ padding: '0.45rem' }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
                {title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {items.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      style={{
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        fontSize: '0.86rem',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
                      onMouseLeave={e => e.target.style.color = 'var(--color-text-secondary)'}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider" />
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '1.25rem', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} QMee. All rights reserved.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Made with <Heart size={12} color="#f72c86" fill="#f72c86" /> by QMee Team
          </p>
        </div>
      </div>
    </footer>
  )
}
