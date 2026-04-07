import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Zap, Brain, ArrowRight, Sparkles, Star, ChevronRight } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Footer from '../components/Footer'

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
  item: {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.36,0.66,0.04,1] } },
  },
}

const features = [
  { icon: Brain,         title: 'Deep Reasoning',    desc: 'Multi-step reasoning engine that breaks down complex problems with clarity and precision.' },
  { icon: Zap,           title: 'Instant Responses',  desc: 'Streaming answers at blinding speed. No waiting, no loading spinners — just flow.' },
  { icon: MessageCircle, title: 'Natural Dialogue',   desc: 'Conversational context that actually persists. QMee remembers what matters.' },
  { icon: Sparkles,      title: 'Creative Thinking',  desc: 'Generate ideas, write code, draft content — a true creative partner for every task.' },
]

const prompts = [
  'Explain quantum entanglement simply',
  'Write a product launch email',
  'Debug my React component',
  'Summarize this research paper',
  'Plan a 7-day workout routine',
  'Write a poem about the ocean',
]

function HeroSection() {
  return (
    <section style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '6rem 1.5rem 4rem',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '800px', textAlign: 'center' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <span className="badge badge-brand">
            <Sparkles size={10} /> AI-Powered Intelligence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 7vw, 5.2rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
          }}
        >
          Think faster,{' '}
          <span className="gradient-text animate-gradient"
            style={{ backgroundImage: 'linear-gradient(135deg, #f72c86, #8b5cf6, #06b6d4, #f72c86)', backgroundSize: '300% 300%' }}>
            think deeper
          </span>
          <br />with QMee
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}
        >
          Your intelligent AI companion — ask anything, get thoughtful answers instantly. Powered by state-of-the-art language models.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          <Link to="/chat" className="btn btn-primary btn-xl" style={{ gap: '0.55rem' }}>
            <MessageCircle size={18} /> Start Chatting Free
          </Link>
          <Link to="/features" className="btn btn-ghost btn-xl" style={{ gap: '0.55rem' }}>
            Explore Features <ChevronRight size={16} />
          </Link>
        </motion.div>

        {/* Prompt pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
            justifyContent: 'center', maxWidth: '680px', margin: '0 auto',
          }}
        >
          {prompts.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ scale: 1.04, y: -2 }}
            >
              <Link
                to="/chat"
                style={{
                  display: 'block',
                  background: 'var(--color-surface-800)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.35rem 0.9rem',
                  fontSize: '0.78rem',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(247,44,134,0.3)'
                  e.currentTarget.style.color = 'var(--color-text-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)'
                  e.currentTarget.style.color = 'var(--color-text-secondary)'
                }}
              >
                {p}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.5rem', marginTop: '2rem', color: 'var(--color-text-muted)', fontSize: '0.8rem',
          }}
        >
          <div style={{ display: 'flex' }}>
            {[0,1,2,3,4].map(i => (
              <Star key={i} size={13} color="#f72c86" fill="#f72c86" style={{ marginRight: '-2px' }} />
            ))}
          </div>
          <span>Loved by <strong style={{ color: 'var(--color-text-secondary)' }}>10,000+</strong> users worldwide</span>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section style={{ padding: '5rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="badge badge-violet" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Zap size={10} /> Why QMee
          </span>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            letterSpacing: '-0.025em', marginBottom: '0.75rem',
          }}>
            Intelligence that <span className="gradient-text">feels natural</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto', fontSize: '1rem' }}>
            Built for the way you think — not the other way around.
          </p>
        </motion.div>

        <motion.div
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={stagger.item} className="feature-card">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'rgba(247,44,134,0.12)',
                  border: '1px solid rgba(247,44,134,0.2)',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <Icon size={20} color="#f72c86" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section style={{ padding: '5rem 1.5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(247,44,134,0.08) 0%, rgba(139,92,246,0.08) 100%)',
            border: '1px solid rgba(247,44,134,0.2)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(2.5rem, 6vw, 4rem)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Sparkles size={36} color="#f72c86" style={{ marginBottom: '1.25rem' }} />
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800, fontSize: 'clamp(1.7rem, 4vw, 2.5rem)',
            letterSpacing: '-0.025em', marginBottom: '1rem',
          }}>
            Ready to experience <span className="gradient-text">next-gen AI?</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
            Join thousands of users already using QMee to think smarter, work faster, and create better.
          </p>
          <Link to="/chat" className="btn btn-primary btn-xl" style={{ gap: '0.55rem' }}>
            Start for Free <ArrowRight size={18} />
          </Link>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', marginTop: '1rem' }}>
            No credit card required · Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </PageWrapper>
  )
}
