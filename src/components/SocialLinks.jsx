import SocialIcon from './icons/SocialIcon'
import './SocialLinks.css'

const fallbackLinks = [
  { label: 'GitHub', url: 'https://github.com/sametopcu', type: 'github', external: true },
  { label: 'LinkedIn', url: '#linkedin', type: 'linkedin' },
  { label: 'E-posta', url: 'mailto:samet.topcu@example.com', type: 'email' },
  { label: 'CV İndir', url: '#download-cv', type: 'download' },
]

export default function SocialLinks({ links: apiLinks }) {
  const links = Array.isArray(apiLinks) ? apiLinks : fallbackLinks

  return (
    <div className="social-links" aria-label="Sosyal bağlantılar">
      {links.map((link) => (
        <a href={link.url} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} key={link.label}>
          <span className="social-icon" aria-hidden="true"><SocialIcon type={link.type} /></span>
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  )
}
