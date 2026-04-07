import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Brain, Zap, MessageCircle, Code2, Globe, Shield,
  ImageIcon, FileText, BarChart2, ArrowRight, Sparkles, Mic2
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Footer from '../components/Footer'

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1 } } },
  item: {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.36,0.66,0.04,1] } },
  },
}

const allFeatures = [
  {
    icon: Brain,    color: '#f72c86', bg: 'rgba(247,44,134,0.1)',
    title: 'Deep Reasoning',
    desc: 'Multi-step chain of thought reasoning to tackle complex questions with structured logic.',
    tags: ['Logic', 'Analysis'],
  },
  {
    icon: Code2,    color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',
    title: 'Code Generation',
    desc: 'Generate, review, debug and explain code in 20+ programming languages with context awareness.',
    tags: ['Dev', 'Debugging'],
  },
  {
    icon: FileText, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',
    title: 'Document Analysis',
    desc: 'Upload PDFs, docs, or paste text. QMee reads, summarizes and extracts key insights.',
    tags: ['Research', 'Summary'],
  },
  {
    icon: ImageIcon, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',
    title: 'Image Understanding',
    desc: 'Describe, analyze, and extract information from images with multimodal intelligence.',
    tags: ['Vision', 'AI'],
  },
  {
    icon: Globe,    color: '#10b981', bg: 'rgba(16,185,129,0.1)',
    title: 'Web Awareness',
    desc: 'Real-time knowledge about current events, trends and information beyond training cutoffs.',
    tags: ['Real-time', 'Search'],
  },
  {
    icon: Mic2,     color: '#f43f5e', bg: 'rgba(244,63,94,0.1)',
    title: 'Voice Mode',
    desc: 'Speak naturally with QMee using advanced speech recognition and natural language output.',
    tags: ['Voice', 'Accessibility'],
  },
  {
    icon: Shield,   color: '#6366f1', bg: 'rgba(99,102,241,0.1)',
    title: 'Privacy First',
    desc: 'Your conversations are encrypted end-to-end. We never train on your private data.',
    tags: ['Security', 'GDPR'],
  },
  {
    icon: BarChart2, color: '#ec4899', bg: 'rgba(236,72,153,0.1)',
    title: 'Data Insights',
    desc: 'Paste tables or datasets — QMee interprets trends, generates charts and gives actionable insights.',
    tags: ['Analytics', 'Data'],
  },
]

export default function Features() {
  return (
    <PageWrapper>
      <div style={{ minHeight: '100dvh', paddingTop: '80px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <section style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="badge badge-brand" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
                <Sparkles size={10} /> Features
              </span>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em', marginBottom: '1rem',
              }}>
                Everything you need,<br />
                <span className="gradient-text">nothing you don't</span>
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                QMee packs a full suite of AI capabilities — built for professionals, creators, and curious minds alike.
              </p>
              <Link to="/chat" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
                Try All Features Free <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid */}
        <section style={{ padding: '2rem 1.5rem 5rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div
              variants={stagger.container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {allFeatures.map(({ icon: Icon, color, bg, title, desc, tags }) => (
                <motion.div key={title} variants={stagger.item}>
                  <div
                    className="feature-card"
                    style={{ height: '100%', cursor: 'default' }}
                  >
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: '46px', height: '46px',
                        background: bg, border: `1px solid ${color}30`,
                        borderRadius: '13px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1rem',
                      }}>
                        <Icon size={21} color={color} />
                      </div>
                      <h3 style={{ fontWeight: 700, fontSize: '0.98rem', marginBottom: '0.4rem' }}>{title}</h3>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.7, marginBottom: '0.85rem' }}>
                        {desc}
                      </p>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {tags.map(t => (
                          <span key={t} style={{
                            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.05em',
                            padding: '0.2rem 0.55rem', borderRadius: '99px',
                            background: `${color}18`, color, border: `1px solid ${color}30`,
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageWrapper>
  )
}
