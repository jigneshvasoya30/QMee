import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Heart, Target, Eye, Lightbulb, Users, MessageCircle } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Footer from '../components/Footer'

const values = [
  { icon: Heart,     color: '#f72c86', title: 'Human-centered', desc: 'Every design decision starts and ends with the people using QMee every day.' },
  { icon: Target,    color: '#8b5cf6', title: 'Precision',       desc: 'We obsess over accuracy, context, and nuance in every response we generate.' },
  { icon: Eye,       color: '#06b6d4', title: 'Transparency',    desc: 'No black boxes. We explain our reasoning, acknowledge uncertainty, and never pretend.' },
  { icon: Lightbulb, color: '#f59e0b', title: 'Curiosity',       desc: 'We believe the best questions unlock the best answers. Keep asking.' },
]

const stats = [
  { value: '10K+', label: 'Active users' },
  { value: '2M+',  label: 'Messages sent' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '4.9★', label: 'User rating' },
]

export default function About() {
  return (
    <PageWrapper>
      <div style={{ minHeight: '100dvh', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <section style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge badge-brand" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
                <Sparkles size={10} /> Our Story
              </span>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em', marginBottom: '1.25rem',
              }}>
                Building AI that <span className="gradient-text">feels human</span>
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                QMee was born from a simple frustration — AI tools felt cold, robotic, and disconnected from how people actually think.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
                We set out to build something different: an AI companion that listens deeply, responds thoughtfully, and genuinely helps. Not just a chatbot — a thinking partner.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: '2rem 1.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1px',
                background: 'var(--glass-border)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
              }}
            >
              {stats.map(({ value, label }) => (
                <div key={label} style={{
                  background: 'var(--color-surface-900)',
                  padding: '2rem 1.5rem', textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 900, fontSize: '2.2rem',
                    letterSpacing: '-0.04em', marginBottom: '0.3rem',
                  }} className="gradient-text">
                    {value}
                  </div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)',
                letterSpacing: '-0.025em', textAlign: 'center', marginBottom: '3rem',
              }}
            >
              What we <span className="gradient-text">believe in</span>
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.1rem',
            }}>
              {values.map(({ icon: Icon, color, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="feature-card"
                >
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: '42px', height: '42px',
                      background: `${color}15`,
                      border: `1px solid ${color}30`,
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '0.85rem',
                    }}>
                      <Icon size={19} color={color} />
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.83rem', lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '3rem 1.5rem 6rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{
                background: 'linear-gradient(135deg, rgba(247,44,134,0.07) 0%, rgba(139,92,246,0.07) 100%)',
                border: '1px solid rgba(247,44,134,0.18)',
                borderRadius: 'var(--radius-2xl)',
                padding: '3rem 2rem',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Users size={36} color="#f72c86" style={{ marginBottom: '1rem' }} />
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.025em', marginBottom: '0.75rem',
              }}>
                Join our <span className="gradient-text">community</span>
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.7 }}>
                Thousands of curious minds are already using QMee to learn, create and solve problems faster than ever before.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/chat" className="btn btn-primary btn-lg" style={{ gap: '0.45rem' }}>
                  <MessageCircle size={17} /> Start Chatting
                </Link>
                <Link to="/pricing" className="btn btn-ghost btn-lg">
                  View Plans
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageWrapper>
  )
}
