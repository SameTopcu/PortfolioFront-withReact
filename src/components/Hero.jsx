import { motion, useReducedMotion } from 'framer-motion'
import SkillsPanel from './SkillsPanel'
import SocialLinks from './SocialLinks'
import {
  heroButtonGroupVariants,
  heroContentVariants,
  heroItemVariants,
} from './heroMotion'
import './Hero.css'

const defaultHero = {
  headline: 'Modern Full Stack Developer',
  description: 'Hızlı, ölçeklenebilir ve kullanıcı dostu web uygulamaları tasarlıyor ve geliştiriyorum. Laravel, React, arayüz mühendisliği ve yapay zekâ destekli geliştirme üzerine çalışıyorum.',
  primaryButton: { label: 'Projelerimi Gör', url: '#projelerim' },
  secondaryButton: { label: 'İletişime Geç', url: '#iletisim' },
}

function HeroHeadline({ headline }) {
  const words = String(headline || defaultHero.headline).trim().split(/\s+/)
  const accentWord = words.pop()

  return (
    <>
      <span className="hero-headline-main">{words.join(' ')}</span>
      <span className="hero-headline-accent">{accentWord}</span>
    </>
  )
}

export default function Hero({ hero, skillGroups }) {
  const shouldReduceMotion = useReducedMotion()

  if (hero === null) return null

  const content = hero === undefined ? defaultHero : hero

  return (
    <section className="hero-section" id="hakkimda">
      <div className="hero-background" aria-hidden="true">
        <span className="hero-orb hero-orb-blue" />
        <span className="hero-orb hero-orb-violet" />
        <span className="hero-orb hero-orb-cyan" />
        <span className="hero-motion-grid" />
      </div>

      <motion.div
        className="hero-copy"
        variants={heroContentVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
      >
        <motion.h1 variants={heroItemVariants}>
          <HeroHeadline headline={content.headline} />
        </motion.h1>
        <motion.p variants={heroItemVariants}>{content.description}</motion.p>
        <motion.div className="hero-actions" variants={heroButtonGroupVariants}>
          <motion.a
            className="hero-button primary"
            href={content.primaryButton.url}
            variants={heroItemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          >
            {content.primaryButton.label}
            <span className="hero-button-arrow" aria-hidden="true">→</span>
          </motion.a>
          <motion.a
            className="hero-button secondary"
            href={content.secondaryButton.url}
            variants={heroItemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
          >
            {content.secondaryButton.label}
          </motion.a>
        </motion.div>
        <SocialLinks
          links={content.socialLinks}
          reducedMotion={shouldReduceMotion}
        />
      </motion.div>
      <SkillsPanel
        groups={skillGroups}
        reducedMotion={shouldReduceMotion}
      />
    </section>
  )
}
