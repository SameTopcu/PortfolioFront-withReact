import { useState } from 'react'
import { blogSlides } from '../data/portfolioData'
import './BlogSlider.css'

export default function BlogSlider() {
  const [activeSlide, setActiveSlide] = useState(0)

  const goToPrevious = () => {
    setActiveSlide((current) => (current === 0 ? blogSlides.length - 1 : current - 1))
  }

  const goToNext = () => {
    setActiveSlide((current) => (current === blogSlides.length - 1 ? 0 : current + 1))
  }

  return (
    <section className="blog-slider-section" id="blog">
      <div className="blog-section-header">
        <div>
          <p className="blog-section-badge">blog</p>
          <h2 className="blog-section-title">Haberler & Programlar</h2>
        </div>
        <div className="blog-nav-arrows">
          <button className="blog-arrow-btn" type="button" onClick={goToPrevious} aria-label="Önceki blog">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button className="blog-arrow-btn" type="button" onClick={goToNext} aria-label="Sonraki blog">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="blog-cards-track" aria-live="polite">
        {blogSlides.map((slide, index) => (
          <article
            className={`blog-card ${index === activeSlide ? 'blog-card--active' : ''}`}
            key={slide.title}
          >
            <div className="blog-card-image">
              <img src={slide.image} alt="" loading="lazy" />
              <span className="blog-card-category">{slide.category}</span>
              <div className="blog-card-image-overlay" />
            </div>
            <div className="blog-card-body">
              <h3 className="blog-card-title">{slide.title}</h3>
              <p className="blog-card-text">{slide.text}</p>
              <div className="blog-card-footer">
                <div className="blog-card-meta">
                  <span className="blog-card-date">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                    </svg>
                    {slide.date}
                  </span>
                  <span className="blog-card-read-time">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                    </svg>
                    {slide.readTime}
                  </span>
                </div>
                <a className="blog-card-link" href="/blog-haber-detail">
                  Devamını Oku
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="blog-dots" aria-label="Blog slaytları">
        {blogSlides.map((item, index) => (
          <button
            className={index === activeSlide ? 'active' : undefined}
            type="button"
            aria-label={`${item.title} slaydını göster`}
            aria-current={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            key={item.title}
          />
        ))}
      </div>
    </section>
  )
}
