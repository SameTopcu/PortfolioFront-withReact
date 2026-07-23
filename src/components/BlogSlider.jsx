import { useEffect, useState } from 'react'
import { getBlogPosts } from '../api/portfolioApi'
import { blogSlides } from '../data/portfolioData'
import './BlogSlider.css'

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const fallbackContent = {
  eyebrow: 'blog',
  heading: 'Haberler & Programlar',
  items: blogSlides.map((slide) => ({ ...slide, detailUrl: '/blog-haber-detail' })),
}

function dateLabel(item) {
  if (!item.publishedAt) return item.date
  const date = new Date(`${item.publishedAt}T00:00:00`)
  return Number.isNaN(date.getTime()) ? item.publishedAt : dateFormatter.format(date)
}

export default function BlogSlider() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [content, setContent] = useState(undefined)

  useEffect(() => {
    const controller = new AbortController()
    getBlogPosts({ signal: controller.signal })
      .then(setContent)
      .catch((error) => {
        if (error.name !== 'AbortError') console.warn('Haberler ve blog API üzerinden alınamadı.', error)
      })
    return () => controller.abort()
  }, [])

  const resolved = content === undefined ? fallbackContent : content
  const slides = resolved?.items ?? []

  if (!resolved || slides.length === 0) return null

  const visibleActiveSlide = activeSlide % slides.length

  const goToPrevious = () => {
    setActiveSlide(visibleActiveSlide === 0 ? slides.length - 1 : visibleActiveSlide - 1)
  }

  const goToNext = () => {
    setActiveSlide(visibleActiveSlide === slides.length - 1 ? 0 : visibleActiveSlide + 1)
  }

  return (
    <section className="blog-slider-section" id="haberler-blog">
      <div className="blog-section-header">
        <div>
          <p className="blog-section-badge">{resolved.eyebrow}</p>
          <h2 className="blog-section-title">{resolved.heading}</h2>
        </div>
        <div className="blog-nav-arrows">
          <button className="blog-arrow-btn" type="button" onClick={goToPrevious} aria-label="Önceki yazı">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button className="blog-arrow-btn" type="button" onClick={goToNext} aria-label="Sonraki yazı">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      <div className="blog-cards-track" aria-live="polite">
        {slides.map((slide, index) => (
          <article className={`blog-card ${index === visibleActiveSlide ? 'blog-card--active' : ''}`} style={{ '--blog-category-color': slide.categoryColor || '#3b82f6' }} key={slide.id ?? slide.slug ?? slide.title}>
            <div className="blog-card-image">
              {(slide.coverUrl || slide.image) ? (
                <img src={slide.coverUrl || slide.image} alt={slide.coverAlt || ''} loading="lazy" />
              ) : (
                <div className="blog-card-cover-fallback" aria-hidden="true"><span>{slide.category}</span><strong>{slide.title.slice(0, 1)}</strong></div>
              )}
              <span className="blog-card-category">{slide.category}</span>
              <div className="blog-card-image-overlay" />
            </div>
            <div className="blog-card-body">
              <h3 className="blog-card-title">{slide.title}</h3>
              <p className="blog-card-text">{slide.excerpt || slide.text}</p>
              <div className="blog-card-footer">
                <div className="blog-card-meta">
                  <span className="blog-card-date"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /></svg>{dateLabel(slide)}</span>
                  <span className="blog-card-read-time"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" /></svg>{slide.readTimeMinutes ? `${slide.readTimeMinutes} dk` : slide.readTime}</span>
                </div>
                <a className="blog-card-link" href={slide.detailUrl}>Devamını Oku<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg></a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="blog-dots" aria-label="Blog slaytları">
        {slides.map((item, index) => (
          <button className={index === visibleActiveSlide ? 'active' : undefined} type="button" aria-label={`${item.title} slaydını göster`} aria-current={index === visibleActiveSlide} onClick={() => setActiveSlide(index)} key={item.id ?? item.slug ?? item.title} />
        ))}
      </div>
    </section>
  )
}
