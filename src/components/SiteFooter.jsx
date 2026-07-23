import './SiteFooter.css'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-about">
          <h4 className="footer-heading">About</h4>
          <div className="footer-ae-logo">
            <svg viewBox="0 0 40 40" aria-hidden="true" fill="currentColor">
              <path d="M16 8L16 32L12 32L12 22L4 22L4 32L0 32L0 8L16 8ZM12 18L12 12L4 12L4 18L12 18Z" />
              <path d="M20 8L36 8L36 12L24 12L24 18L34 18L34 22L24 22L24 28L36 28L36 32L20 32L20 8Z" />
            </svg>
          </div>
          <p className="footer-about-text">
            Senior Software Engineer building robust and scalable solutions for a modern world.
          </p>
          <span className="footer-location">Based in Istanbul, TR.</span>
        </div>

        <div className="footer-col footer-quick-links">
          <h4 className="footer-heading">Quick Links</h4>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#hakkimda">Hakkımda</a>
            <a href="#projeler">Projeler</a>
            <a href="#tecrubeler">Tecrübe</a>
            <a href="#haberler-blog">Blog</a>
          </nav>
        </div>

        <div className="footer-col footer-social-col">
          <h4 className="footer-heading">Social</h4>
          <nav className="footer-social-links" aria-label="Social links">
            <a href="#linkedin">
              <span className="social-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"/></svg>
              </span>
              LinkedIn
            </a>
            <a href="https://github.com/sametopcu" target="_blank" rel="noreferrer">
              <span className="social-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
    <path d="M280.5 426.5C214.5 418.5 168 371 168 309.5C168 284.5 177 257.5 192 239.5C185.5 223 186.5 188 194 173.5C214 171 241 181.5 257 196C276 190 296 187 320.5 187C345 187 365 190 383 195.5C398.5 181.5 426 171 446 173.5C453 187 454 222 447.5 239C463.5 258 472 283.5 472 309.5C472 371 425.5 417.5 358.5 426C375.5 437 387 461 387 488.5L387 540.5C387 555.5 399.5 564 414.5 558C505 523.5 576 433 576 321C576 179.5 461 64 319.5 64C178 64 64 179.5 64 321C64 432 134.5 524 229.5 558.5C243 563.5 256 554.5 256 541L256 501C249 504 240 506 232 506C199 506 179.5 488 165.5 454.5C160 441 154 433 142.5 431.5C136.5 431 134.5 428.5 134.5 425.5C134.5 419.5 144.5 415 154.5 415C169 415 181.5 424 194.5 442.5C204.5 457 215 463.5 227.5 463.5C240 463.5 248 459 259.5 447.5C268 439 274.5 431.5 280.5 426.5z"/></svg>
              </span>
              GitHub
            </a>
          </nav>
        </div>

        <div className="footer-col footer-newsletter">
          <h4 className="footer-heading">İletişim</h4>
          <p className="newsletter-text">Mesajınızı ve size ulaşabileceğim e-posta adresini doğrudan yönetim paneline bırakın.</p>
          <a className="footer-contact-link" href="#iletisim">Bildirim gönder <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Abdulsamed Topcu. | Designed & Developed with passion.</span>
        <a href="#hakkimda">↑ Back to Top</a>
      </div>
    </footer>
  )
}
