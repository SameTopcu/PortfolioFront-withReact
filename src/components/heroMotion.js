export const HERO_EASE = [0.22, 1, 0.36, 1]

export const headerVariants = {
  hidden: { opacity: 0, y: -22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.66, ease: HERO_EASE },
  },
}

export const heroContentVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.62,
      staggerChildren: 0.14,
    },
  },
}

export const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.66, ease: HERO_EASE },
  },
}

export const heroButtonGroupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
    },
  },
}

export const socialContainerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: HERO_EASE,
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
}

export const socialItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: HERO_EASE },
  },
}

export const skillGridVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.58,
      staggerChildren: 0.16,
    },
  },
}

export const skillCardVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.68, ease: HERO_EASE },
  },
}

export const skillContentsVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.07,
    },
  },
}

export const skillItemVariants = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: HERO_EASE },
  },
}
