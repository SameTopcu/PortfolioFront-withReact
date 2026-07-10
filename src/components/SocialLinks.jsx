import SocialIcon from './icons/SocialIcon'
import './SocialLinks.css'

export default function SocialLinks() {
  const links = [
    { label: 'Github', href: 'https://github.com/sametopcu', type: 'github', external: true },
    { label: 'LinkedIn', href: '#linkedin', type: 'linkedin' },
    { label: 'Email', href: 'mailto:samet.topcu@example.com', type: 'email' },
    { label: 'Download CV', href: '#download-cv', type: 'download' },
  ]

  return (
    <div className="social-links" aria-label="Social links">
      {links.map((link) => (
        <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} key={link.label}>
          <span className="social-icon" aria-hidden="true">
            <SocialIcon type={link.type} />
          </span>
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  )
}
