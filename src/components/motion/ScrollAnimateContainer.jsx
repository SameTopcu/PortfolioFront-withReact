import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const motionElements = {
  article: motion.article,
  div: motion.div,
  section: motion.section,
  ul: motion.ul,
}

const itemVariants = {
  up: {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  },
}

export function ScrollAnimateContainer({
  as = 'div',
  children,
  stagger = 0.1,
  delay = 0,
  amount = 0.18,
  once = true,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionElement = motionElements[as] ?? motion.div
  const variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          delayChildren: delay,
          staggerChildren: stagger,
        },
      },
    }),
    [delay, stagger],
  )

  return (
    <MotionElement
      {...props}
      variants={variants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once, amount, margin: '0px 0px -6% 0px' }}
    >
      {children}
    </MotionElement>
  )
}

export function ScrollAnimateItem({
  as = 'div',
  direction = 'up',
  children,
  whileHover,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  const MotionElement = motionElements[as] ?? motion.div

  return (
    <MotionElement
      {...props}
      variants={
        shouldReduceMotion
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : itemVariants[direction] ?? itemVariants.up
      }
      whileHover={shouldReduceMotion ? undefined : whileHover}
    >
      {children}
    </MotionElement>
  )
}
