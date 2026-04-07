import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Lock, CreditCard, Bell, LogOut, Camera,
  Check, Shield, ChevronRight, Zap, Sparkles
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import { useAuth } from '../hooks/useAuth'

const tabs = [
  { id: 'general', label: 'General', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  // { id: 'notifs', label: 'Alerts', icon: Bell },
]

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [is2FAEnabled, setIs2FAEnabled] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setIsSaving(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <PageWrapper>
      <div style={{
        minHeight: '100dvh', padding: '6rem 1rem 4rem',
        maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1
      }}>
        {/* Header */}
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 800,
            fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.04em',
            marginBottom: '0.5rem',
            background: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Profile
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Manage your personal information and subscription.
          </p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(200px, 25%, 280px) 1fr',
          gap: '2.5rem',
          alignItems: 'start'
        }} className="profile-grid">

          {/* Sidebar Nav */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn btn-ghost`}
                style={{
                  justifyContent: 'flex-start',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '14px',
                  background: activeTab === tab.id ? 'var(--gradient-brand-soft)' : 'transparent',
                  borderColor: activeTab === tab.id ? 'rgba(247,44,134,0.3)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontWeight: activeTab === tab.id ? 600 : 500
                }}
              >
                <tab.icon size={18} style={{ opacity: activeTab === tab.id ? 1 : 0.7 }} />
                {tab.label}
              </button>
            ))}
            <div className="divider" style={{ margin: '1rem 0' }} />
            <button
              onClick={() => { logout(); window.location.href = '/'; }}
              className="btn btn-ghost"
              style={{ justifyContent: 'flex-start', color: '#f43f5e', padding: '0.8rem 1.2rem' }}
            >
              <LogOut size={18} /> Logout
            </button>
          </aside>

          {/* Main Content */}
          <main style={{ minHeight: '500px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {activeTab === 'general' && (
                  <section className="surface-card" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <User size={20} className="gradient-text" /> Personal Profile
                    </h2>

                    {/* Avatar Upload */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          width: '90px', height: '90px', borderRadius: '24px',
                          background: 'var(--gradient-brand)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: '2rem', fontWeight: 800, color: '#fff',
                          boxShadow: 'var(--glow-sm)'
                        }}>
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <button style={{
                          position: 'absolute', bottom: '-4px', right: '-4px',
                          width: '32px', height: '32px', borderRadius: '10px',
                          background: 'var(--color-surface-800)', border: '1px solid var(--glass-border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--color-text-primary)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)'
                        }}>
                          <Camera size={14} />
                        </button>
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{user?.name || 'Guest User'}</h3>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Member since 2026</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-grid">
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.6rem' }}>Display Name</label>
                        <input type="text" className="input-field" defaultValue={user?.name || ''} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.6rem' }}>Email Address</label>
                        <input type="email" className="input-field" defaultValue={user?.email || ''} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.6rem' }}>Phone Number</label>
                        <input type="tel" className="input-field" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>

                    <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                      <button onClick={handleSave} className="btn btn-primary btn-md" disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <AnimatePresence>
                        {showSuccess && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ color: '#4ade80', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                          >
                            <Check size={16} /> Saved successfully!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </section>
                )}

                {activeTab === 'security' && (
                  <section className="surface-card" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Security Settings</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(247,44,134,0.1)', color: 'var(--color-brand-500)' }}><Lock size={20} /></div>
                          <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Change Password</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Keep your account secure with a strong password.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate('/forgot-password')}
                          className="btn btn-ghost btn-sm"
                        >
                          Update
                        </button>
                      </div>

                      <div className="glass" style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(139,92,246,0.1)', color: 'var(--color-violet-500)' }}><Shield size={20} /></div>
                          <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Two-Factor Auth</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Add an extra layer of security to your account.</p>
                          </div>
                        </div>
                        <div
                          onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                          style={{
                            width: '44px', height: '24px', borderRadius: '20px',
                            background: is2FAEnabled ? 'var(--gradient-brand)' : 'var(--color-surface-600)',
                            position: 'relative', cursor: 'pointer',
                            transition: 'background 0.3s ease',
                            boxShadow: is2FAEnabled ? '0 0 15px rgba(247,44,134,0.3)' : 'none'
                          }}
                        >
                          <motion.div
                            animate={{ x: is2FAEnabled ? 22 : 2 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            style={{
                              position: 'absolute', top: '3px',
                              width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === 'billing' && (
                  <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="pricing-card featured" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{
                          width: '56px', height: '50px', borderRadius: '16px',
                          background: 'var(--gradient-brand)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', color: '#fff'
                        }}>
                          <Zap size={28} />
                        </div>
                        <div>
                          <p style={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 800, color: 'var(--color-brand-400)', marginBottom: '0.25rem' }}>Current Plan</p>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Pro AI Plan</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Renews on Oct 12, 2026</p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>$19.99<span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.6 }}>/mo</span></p>
                        <button className="btn btn-ghost btn-sm" style={{ marginTop: '0.5rem' }}>Manage Billing</button>
                      </div>
                    </div>

                    <div className="surface-card" style={{ padding: '2rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Billing History</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                          { date: 'Sep 12, 2026', amount: '$19.99', status: 'Paid' },
                          { date: 'Aug 12, 2026', amount: '$19.99', status: 'Paid' },
                          { date: 'Jul 12, 2026', amount: '$19.99', status: 'Paid' },
                        ].map((invoice, i) => (
                          <div key={i} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)'
                          }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <CreditCard size={16} style={{ opacity: 0.5 }} />
                              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{invoice.date}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{invoice.amount}</span>
                              <span className="badge badge-brand">{invoice.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .profile-grid aside {
            flex-direction: row !important;
            overflow-x: auto;
            padding: 0.25rem 0 0.75rem;
            margin-bottom: 0.5rem;
            gap: 0.75rem !important;
            -ms-overflow-style: none;
            scrollbar-width: none;
            /* Gradient mask to show more items */
            mask-image: linear-gradient(to right, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
          }
          .profile-grid aside::-webkit-scrollbar { display: none; }
          .profile-grid aside button {
            white-space: nowrap;
            flex-shrink: 0;
            padding: 0.6rem 1rem !important;
            font-size: 0.85rem !important;
          }
          .profile-grid .divider { display: none; }
        }
        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .form-grid > div {
            grid-column: span 1 !important;
          }
          .surface-card {
            padding: 1.25rem !important;
          }
        }
      `}</style>
    </PageWrapper>
  )
}
