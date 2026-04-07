import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, Sparkles, Zap, Building2, ArrowRight, HelpCircle } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Footer from '../components/Footer'

const plans = [
  {
    id: 'free',
    name: 'Free',
    icon: Sparkles,
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for getting started with AI',
    features: [
      '50 messages per day',
      'Standard response speed',
      'Web chat interface',
      'Basic reasoning model',
      'Community support',
    ],
    cta: 'Get Started Free',
    ctaTo: '/chat',
    featured: false,
    color: 'var(--color-text-secondary)',
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Zap,
    price: { monthly: 18, yearly: 14 },
    description: 'For professionals & power users',
    features: [
      'Unlimited messages',
      'Priority response speed',
      'Advanced reasoning model',
      'Image & document upload',
      'Voice mode',
      'Code execution sandbox',
      'Priority support',
      'Early feature access',
    ],
    cta: 'Start Pro Trial',
    ctaTo: '/signup',
    featured: true,
    color: '#f72c86',
    badge: 'Most Popular',
  },
  {
    id: 'team',
    name: 'Team',
    icon: Building2,
    price: { monthly: 45, yearly: 36 },
    description: 'For teams that think together',
    features: [
      'Everything in Pro',
      'Up to 25 team members',
      'Shared conversation history',
      'Admin dashboard',
      'SSO & SAML auth',
      'Usage analytics',
      'Dedicated Slack support',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    ctaTo: '/about',
    featured: false,
    color: '#8b5cf6',
  },
]

const faqs = [
  { q: 'Can I switch plans anytime?', a: 'Yes — upgrade or downgrade at any time. Changes take effect immediately, and we prorate billing accordingly.' },
  { q: 'Is there a free trial for Pro?', a: 'Absolutely. Your first 14 days on Pro are completely free — no credit card required to start.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, UPI, and PayPal. Enterprise customers can pay via invoice.' },
  { q: 'Is my data private?', a: 'Always. All conversations are end-to-end encrypted. We never use your data to train our models.' },
]

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <PageWrapper>
      <div style={{ minHeight: '100dvh', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <section style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '620px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge badge-brand" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
                <Sparkles size={10} /> Pricing
              </span>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em', marginBottom: '1rem',
              }}>
                Simple, <span className="gradient-text">transparent</span> pricing
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Start free. Scale as you grow. No hidden fees, no surprises.
              </p>

              {/* Billing toggle */}
              <div style={{
                display: 'inline-flex',
                background: 'var(--color-surface-800)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-full)',
                padding: '4px', gap: '4px',
              }}>
                {['monthly', 'yearly'].map(b => (
                  <button
                    key={b}
                    onClick={() => setBilling(b)}
                    style={{
                      padding: '0.4rem 1.1rem',
                      borderRadius: 'var(--radius-full)',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'inherit', fontWeight: 600,
                      fontSize: '0.82rem', textTransform: 'capitalize',
                      transition: 'all 0.25s ease',
                      background: billing === b ? 'var(--gradient-brand)' : 'transparent',
                      color: billing === b ? '#fff' : 'var(--color-text-secondary)',
                      boxShadow: billing === b ? '0 2px 12px rgba(247,44,134,0.3)' : 'none',
                    }}
                  >
                    {b} {b === 'yearly' && <span style={{ fontSize: '0.68rem', opacity: 0.85, marginLeft: '2px' }}>−20%</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section style={{ padding: '1rem 1.5rem 4rem' }}>
          <div style={{
            maxWidth: '1050px', margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.25rem', alignItems: 'start',
          }}>
            {plans.map(({ id, name, icon: Icon, price, description, features, cta, ctaTo, featured, color, badge }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`pricing-card ${featured ? 'featured' : ''}`}
                style={{ position: 'relative' }}
              >
                {badge && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--gradient-brand)',
                    color: '#fff', fontSize: '0.7rem', fontWeight: 700,
                    padding: '0.25rem 0.9rem', borderRadius: '99px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 16px rgba(247,44,134,0.35)',
                  }}>
                    {badge}
                  </div>
                )}

                {/* Plan header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: `${color}18`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{name}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)' }}>{description}</div>
                  </div>
                </div>

                {/* Price */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.3rem' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '2.8rem', letterSpacing: '-0.04em', lineHeight: 1 }}>
                      ${price[billing]}
                    </span>
                    {price[billing] > 0 && (
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                        / mo
                      </span>
                    )}
                    {price[billing] === 0 && (
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: '0.3rem' }}>forever</span>
                    )}
                  </div>
                  {billing === 'yearly' && price.yearly > 0 && (
                    <p style={{ color: '#4ade80', fontSize: '0.74rem', marginTop: '0.2rem' }}>
                      Billed ${price.yearly * 12}/yr — save ${(price.monthly - price.yearly) * 12}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  to={ctaTo}
                  className={`btn btn-${featured ? 'primary' : 'ghost'} btn-md`}
                  style={{ width: '100%', marginBottom: '1.5rem', justifyContent: 'center' }}
                >
                  {cta} {featured && <ArrowRight size={15} />}
                </Link>

                {/* Features */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.84rem', color: 'var(--color-text-secondary)' }}>
                      <Check size={14} color={featured ? '#f72c86' : '#4ade80'} style={{ marginTop: '2px', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '2rem 1.5rem 5rem' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: '1.8rem',
                letterSpacing: '-0.025em', textAlign: 'center',
                marginBottom: '2.5rem',
              }}
            >
              Frequently asked <span className="gradient-text">questions</span>
            </motion.h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map(({ q, a }, i) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    background: 'var(--color-surface-900)',
                    border: `1px solid ${openFaq === i ? 'rgba(247,44,134,0.3)' : 'var(--glass-border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden', transition: 'border-color 0.2s',
                    cursor: 'pointer',
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '1rem 1.25rem', gap: '1rem',
                  }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{q}</span>
                    <HelpCircle size={16} color={openFaq === i ? '#f72c86' : 'var(--color-text-muted)'} style={{ flexShrink: 0 }} />
                  </div>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ padding: '0 1.25rem 1rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}
                    >
                      {a}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageWrapper>
  )
}
