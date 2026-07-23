import { motion } from 'framer-motion'
import SocialIcon from './icons/SocialIcon'
import {
  socialContainerVariants,
  socialItemVariants,
} from './heroMotion'
import './SocialLinks.css'

const fallbackLinks = [
  { label: 'GitHub', url: 'https://github.com/sametopcu', type: 'github', external: true },
  { label: 'LinkedIn', url: 'https://www.linkedin.com', type: 'linkedin', external: true },
  { label: 'E-posta', url: 'mailto:samet.topcu@example.com', type: 'email' },
]

export default function SocialLinks({ links: apiLinks, reducedMotion = false }) {
  const links = Array.isArray(apiLinks) ? apiLinks : fallbackLinks

  return (
    <motion.div
      className="social-links"
      aria-label="Sosyal bağlantılar"
      variants={socialContainerVariants}
    >
      {links.map((link) => (
        <motion.a
          href={link.url}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noreferrer' : undefined}
          variants={socialItemVariants}
          whileHover={reducedMotion ? undefined : { y: -2, scale: 1.025 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          key={link.label}
        >
          <span className="social-icon" aria-hidden="true"><SocialIcon type={link.type} /></span>
          <span>{link.label}</span>
        </motion.a>
      ))}
    </motion.div>
  )
}
