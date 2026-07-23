import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './PageTransitionWrapper.css'

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: {
      duration: 0.32,
      ease: [0.4, 0, 1, 1],
    },
  },
}

export default function PageTransitionWrapper({
  routeKey,
  children,
  onEntered,
}) {
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) onEntered?.()
  }, [onEntered, routeKey, shouldReduceMotion])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="page-transition-shell"
        key={routeKey}
        variants={pageVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
        exit={shouldReduceMotion ? undefined : 'exit'}
        onAnimationComplete={(definition) => {
          if (!shouldReduceMotion && definition === 'visible') onEntered?.()
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
