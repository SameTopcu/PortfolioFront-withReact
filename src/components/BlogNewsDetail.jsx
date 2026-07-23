import { useEffect, useState } from 'react'
import { getBlogPost } from '../api/portfolioApi'
import { blogNewsDetail } from '../data/portfolioData'
import Header from './Header'
import './BlogNewsDetail.css'

const dateFormatter = new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })

function BlogDetailIcon({ type }) {
  const paths = {
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    clock: 'M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
    arrow: 'M5 12h14M12 5l7 7-7 7',
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[type]} /></svg>
}

function formattedDate(post) {
  if (!post.publishedAt) return post.date
  const date = new Date(`${post.publishedAt}T00:00:00`)
  return Number.isNaN(date.getTime()) ? post.publishedAt : dateFormatter.format(date)
}

const fallbackPost = {
  ...blogNewsDetail,
  excerpt: blogNewsDetail.summary,
  contentHtml: `<p>${blogNewsDetail.about}</p><h3>Süreç ve Yöntemler</h3><p>${blogNewsDetail.processText}</p><ul>${blogNewsDetail.processItems.map((item) => `<li><strong>${item.title}:</strong> ${item.text}</li>`).join('')}</ul>`,
  readTimeMinutes: null,
  coverUrl: blogNewsDetail.image,
  coverAlt: `${blogNewsDetail.title} kapak görseli`,
  relatedPosts: blogNewsDetail.relatedPosts.map((title) => ({ title, detailUrl: '/blog-haber-detail' })),
}

export default function BlogNewsDetail({ slug, header }) {
  const [post, setPost] = useState(slug ? null : fallbackPost)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return undefined
    const controller = new AbortController()
    getBlogPost(slug, { signal: controller.signal })
      .then(setPost)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
    return () => controller.abort()
  }, [slug])

  if (error) return <main className="blog-detail-page"><Header {...header} /><section className="blog-detail-state"><h1>Yazı bulunamadı</h1><p>{error}</p><a href="/#haberler-blog">Haberler ve blog bölümüne dön</a></section></main>
  if (!post) return <main className="blog-detail-page"><Header {...header} /><section className="blog-detail-state"><p>Yazı yükleniyor…</p></section></main>

  return (
    <main className="blog-detail-page">
      <Header {...header} />
      <div className="blog-detail-shell">
        <div className="blog-detail-breadcrumbs">
          <nav aria-label="Blog gezinti yolu"><a href="/">Anasayfa</a><span>/</span><a href="/#haberler-blog">Haberler-Blog</a><span>/</span><strong>{post.title}</strong></nav>
          <div className="blog-detail-meta"><span><BlogDetailIcon type="calendar" />{formattedDate(post)}</span><span><BlogDetailIcon type="clock" />{post.readTimeMinutes ? `${post.readTimeMinutes} dk` : post.readTime}</span></div>
        </div>

        <div className="blog-detail-layout">
          <article className="blog-detail-article">
            <div className="blog-detail-kicker" style={{ '--blog-category-color': post.categoryColor || '#155de8' }}>{post.category}</div>
            <h1>{post.title}</h1>
            <p className="blog-detail-lead">{post.excerpt}</p>
            <figure className={`blog-detail-cover ${post.coverUrl ? '' : 'is-placeholder'}`}>
              {post.coverUrl ? <img src={post.coverUrl} alt={post.coverAlt} /> : <div className="blog-detail-cover-placeholder"><span>{post.category}</span><strong>{post.title}</strong></div>}
            </figure>
            <section className="blog-detail-section blog-detail-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            {post.sourceUrl && <div className="blog-source-link"><span>Özgün kaynak</span><a href={post.sourceUrl} target="_blank" rel="noreferrer">{post.sourceLabel || 'Kaynağı görüntüle'}<BlogDetailIcon type="arrow" /></a></div>}
          </article>

          <aside className="blog-detail-sidebar" aria-label="Blog detay yan paneli">
            {!!post.categories?.length && <section className="blog-sidebar-card"><h3>Kategoriler</h3><div className="blog-category-list">{post.categories.map((category) => {
              const name = typeof category === 'string' ? category : category.name
              const color = typeof category === 'string' ? '#155de8' : category.accentColor
              return <a href="/#haberler-blog" style={{ '--blog-category-color': color }} key={name}>{name}</a>
            })}</div></section>}
            {!!post.relatedPosts?.length && <section className="blog-sidebar-card"><h3>İlgili Yazılar</h3><ul className="blog-related-list">{post.relatedPosts.map((related) => <li key={related.id ?? related.title}><a href={related.detailUrl}>{related.title}<BlogDetailIcon type="arrow" /></a></li>)}</ul></section>}
          </aside>
        </div>
      </div>
    </main>
  )
}
