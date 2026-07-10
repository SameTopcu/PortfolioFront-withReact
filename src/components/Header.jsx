import { navItems } from '../data/portfolioData'
import './Header.css'

function Logo() {
  return (
    <a className="logo" href="/" aria-label="Homepage">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
        </svg>
      </span>
      <span>LOGO</span>
    </a>
  )
}

export default function Header() {
  return (
    <header className="site-header">
      <Logo />
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a href={`#${item.toLowerCase().replaceAll('ı', 'i').replaceAll(' ', '-').replaceAll('ü', 'u')}`} key={item}>
            {item}
          </a>
        ))}
      </nav>
      <button className="search-button" type="button" aria-label="Search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m20 20-4.8-4.8m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
        </svg>
      </button>
    </header>
  )
}
