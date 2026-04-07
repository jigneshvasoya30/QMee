import { motion } from 'framer-motion'

export default function PageWrapper({ children, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.36, 0.66, 0.04, 1] }}
      style={{ position: 'relative', zIndex: 1, ...style }}
    >
      {children}
    </motion.div>
  )
}
