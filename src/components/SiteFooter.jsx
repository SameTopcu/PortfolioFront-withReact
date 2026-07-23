import { useEffect, useState } from 'react'
import { getFooterContent } from '../api/portfolioApi'
import { normalizeInternalHref } from '../utils/navigation'
import './SiteFooter.css'

const fallbackFooter = {
  aboutTitle: 'Hakkımda',
  logoText: 'ST',
  aboutText: 'Modern dünyaya yönelik güçlü, ölçeklenebilir ve kullanıcı odaklı çözümler geliştiren yazılım geliştirici.',
  locationText: 'İstanbul, TR',
  quickLinksTitle: 'Hızlı Bağlantılar',
  quickLinks: [
    { id: 'about', label: 'Hakkımda', url: '/#hakkimda' },
    { id: 'projects', label: 'Projeler', url: '/#projelerim' },
    { id: 'experience', label: 'Tecrübeler', url: '/#tecrubeler' },
    { id: 'blog', label: 'Haberler-Blog', url: '/#haberler-blog' },
    { id: 'contact', label: 'İletişim', url: '/#iletisim' },
  ],
  socialTitle: 'Sosyal',
  socialLinks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com', type: 'linkedin' },
    { label: 'GitHub', url: 'https://github.com/sametopcu', type: 'github' },
  ],
  contactTitle: 'İletişim',
  contactText: 'Mesajınızı ve size ulaşabileceğim e-posta adresini doğrudan yönetim paneline bırakın.',
  contactButtonLabel: 'Bildirim gönder',
  contactButtonUrl: '/#iletisim',
  copyrightText: `© ${new Date().getFullYear()} Abdulsamed Topcu. Tüm hakları saklıdır.`,
  backToTopLabel: 'Yukarı dön',
  backToTopUrl: '/#hakkimda',
}

function SocialIcon({ type }) {
  if (type === 'linkedin') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2ZM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></svg>
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
}

function externalLinkProps(url) {
  return /^https?:\/\//i.test(url || '') ? { target: '_blank', rel: 'noreferrer' } : {}
}

export default function SiteFooter() {
  const [footer, setFooter] = useState(undefined)

  useEffect(() => {
    const controller = new AbortController()
    getFooterContent({ signal: controller.signal })
      .then(setFooter)
      .catch((error) => {
        if (error.name !== 'AbortError') console.warn('Footer içeriği API üzerinden alınamadı.', error)
      })
    return () => controller.abort()
  }, [])

  const content = footer === undefined ? fallbackFooter : footer
  if (!content) return null

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-about">
          <h4 className="footer-heading">{content.aboutTitle}</h4>
          {content.logoText && <div className="footer-monogram" aria-label={content.logoText}>{content.logoText}</div>}
          <p className="footer-about-text">{content.aboutText}</p>
          {content.locationText && <span className="footer-location">{content.locationText}</span>}
        </div>

        <div className="footer-col footer-quick-links">
          <h4 className="footer-heading">{content.quickLinksTitle}</h4>
          <nav className="footer-links" aria-label="Hızlı bağlantılar">
            {content.quickLinks.map((link) => (
              <a href={normalizeInternalHref(link.url)} key={link.id ?? `${link.label}-${link.url}`} {...externalLinkProps(link.url)}>{link.label}</a>
            ))}
          </nav>
        </div>

        <div className="footer-col footer-social-col">
          <h4 className="footer-heading">{content.socialTitle}</h4>
          <nav className="footer-social-links" aria-label="Sosyal bağlantılar">
            {content.socialLinks.map((link) => (
              <a href={link.url} key={`${link.type}-${link.url}`} {...externalLinkProps(link.url)}>
                <span className="social-icon"><SocialIcon type={link.type} /></span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-col footer-contact">
          <h4 className="footer-heading">{content.contactTitle}</h4>
          <p className="footer-contact-text">{content.contactText}</p>
          <a className="footer-contact-link" href={normalizeInternalHref(content.contactButtonUrl)} {...externalLinkProps(content.contactButtonUrl)}>
            {content.contactButtonLabel}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{content.copyrightText}</span>
        <a href={normalizeInternalHref(content.backToTopUrl)}>{content.backToTopLabel}<span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  )
}
