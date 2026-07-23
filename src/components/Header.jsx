import { navItems } from '../data/portfolioData'
import './Header.css'

function Logo({ site }) {
  if (site === null) return null

  return (
    <a className="logo" href="/" aria-label="Ana sayfa">
      <span>{site?.brandName || 'LOGO'}</span>
      {site?.logoUrl ? (
        <img className="logo-image" src={site.logoUrl} alt="" />
      ) : (
        <span className="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      )}
    </a>
  )
}

export default function Header({ site, navigation }) {
  const items = navigation === undefined
    ? navItems.map((label) => ({
        label,
        url: `#${label.toLowerCase().replaceAll('ı', 'i').replaceAll(' ', '-').replaceAll('ü', 'u')}`,
      }))
    : navigation

  return (
    <header className="site-header">
      <Logo site={site} />
      <nav className="site-nav" aria-label="Ana menü">
        {items.map((item) => {
          const href = item.url.startsWith('#') && window.location.pathname !== '/' ? `/${item.url}` : item.url
          return <a href={href} key={item.id || item.label}>{item.label}</a>
        })}
      </nav>
      <button className="search-button" type="button" aria-label="Arama yakında aktif olacak" title="Arama yakında aktif olacak" disabled>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m20 20-4.8-4.8m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
        </svg>
      </button>
    </header>
  )
}
