import { useEffect, useState } from 'react'
import { getBlogPosts } from '../api/portfolioApi'
import Header from './Header'
import {
  ScrollAnimateContainer,
  ScrollAnimateItem,
} from './motion/ScrollAnimateContainer'
import SiteFooter from './SiteFooter'
import './HaberDetayPage.css'

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

function formatDate(item) {
  if (!item.publishedAt) return 'Güncel'
  const date = new Date(`${item.publishedAt}T00:00:00`)
  return Number.isNaN(date.getTime())
    ? item.publishedAt
    : dateFormatter.format(date)
}

function HaberArchiveCard({ item }) {
  return (
    <ScrollAnimateItem
      as="article"
      className="haber-page-card"
      whileHover={{ y: -6 }}
    >
      <a href={item.detailUrl} aria-label={`${item.title} haberini oku`}>
        <div
          className={`haber-page-image ${item.coverUrl ? 'has-image' : ''}`}
          style={{ '--haber-accent': item.categoryColor || '#2563eb' }}
        >
          {item.coverUrl ? (
            <img src={item.coverUrl} alt={item.coverAlt || item.title} />
          ) : (
            <div className="haber-page-placeholder" aria-hidden="true">
              <span>{item.category || 'Haber'}</span>
              <strong>{item.title.slice(0, 1)}</strong>
            </div>
          )}
        </div>
        <div className="haber-page-content">
          <p className="haber-page-date">{formatDate(item)}</p>
          <h2>{item.title}</h2>
          <p className="haber-page-excerpt">{item.excerpt}</p>
          <div className="haber-page-card-footer">
            <span>{item.category}</span>
            <strong>{item.readTimeMinutes ? `${item.readTimeMinutes} dk` : 'Oku'} →</strong>
          </div>
        </div>
      </a>
    </ScrollAnimateItem>
  )
}

export default function HaberDetayPage({ header }) {
  const [content, setContent] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()
    getBlogPosts({ signal: controller.signal })
      .then((data) => {
        setContent(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error')
      })
    return () => controller.abort()
  }, [])

  const items = content?.items ?? []

  return (
    <main className="haber-page">
      <Header {...header} />
      <section className="haber-page-shell">
        <header className="haber-page-heading">
          <p>{content?.eyebrow || 'HABERLER & BLOG'}</p>
          <div>
            <h1>Tüm Haberler</h1>
            <span aria-hidden="true" />
          </div>
          <small>
            Yazılım geliştirme, teknoloji ve üretim süreçlerine dair tüm
            haberler ve teknik notlar.
          </small>
        </header>

        {status === 'loading' && (
          <p className="haber-page-state">Haberler yükleniyor…</p>
        )}
        {status === 'error' && (
          <p className="haber-page-state">Haberler şu anda yüklenemiyor.</p>
        )}
        {status === 'ready' && items.length === 0 && (
          <p className="haber-page-state">Henüz yayınlanmış haber yok.</p>
        )}

        {items.length > 0 && (
          <ScrollAnimateContainer
            className="haber-page-grid"
            stagger={0.1}
            amount={0.08}
          >
            {items.map((item) => (
              <HaberArchiveCard item={item} key={item.id ?? item.slug} />
            ))}
          </ScrollAnimateContainer>
        )}
      </section>
      <SiteFooter />
    </main>
  )
}
