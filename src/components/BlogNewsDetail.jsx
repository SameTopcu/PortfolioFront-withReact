import { blogNewsDetail } from '../data/portfolioData'
import Header from './Header'
import './BlogNewsDetail.css'

function BlogDetailIcon({ type }) {
  const paths = {
    calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
    clock: 'M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z',
    arrow: 'M5 12h14M12 5l7 7-7 7',
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  )
}

function BlogBreadcrumbs() {
  return (
    <div className="blog-detail-breadcrumbs">
      <nav aria-label="Blog breadcrumbs">
        <a href="/">Anasayfa</a>
        <span>/</span>
        <a href="/#blog">Haberler-Blog</a>
        <span>/</span>
        <strong>{blogNewsDetail.title}</strong>
      </nav>
      <div className="blog-detail-meta">
        <span>
          <BlogDetailIcon type="calendar" />
          {blogNewsDetail.date}
        </span>
        <span>
          <BlogDetailIcon type="clock" />
          {blogNewsDetail.readTime}
        </span>
      </div>
    </div>
  )
}

function BlogArticle() {
  return (
    <article className="blog-detail-article">
      <div className="blog-detail-kicker">{blogNewsDetail.category}</div>
      <h1>{blogNewsDetail.title}</h1>
      <p className="blog-detail-lead">{blogNewsDetail.summary}</p>

      <figure className="blog-detail-cover">
        <img src={blogNewsDetail.image} alt={`${blogNewsDetail.title} kapak görseli`} />
      </figure>

      <section className="blog-detail-section">
        <h2>Proje Hakkında</h2>
        <p>{blogNewsDetail.about}</p>
      </section>

      <section className="blog-detail-section">
        <h2>Süreç ve Yöntemler</h2>
        <p>{blogNewsDetail.processText}</p>
        <ul className="blog-process-list">
          {blogNewsDetail.processItems.map((item) => (
            <li key={item.title}>
              <span aria-hidden="true" />
              <p>
                <strong>{item.title}:</strong> {item.text}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

function BlogSidebar() {
  return (
    <aside className="blog-detail-sidebar" aria-label="Blog detay yan paneli">
      <section className="blog-sidebar-card">
        <h3>Kategoriler</h3>
        <div className="blog-category-list">
          {blogNewsDetail.categories.map((category) => (
            <a href="/#blog" key={category}>{category}</a>
          ))}
        </div>
      </section>

      <section className="blog-sidebar-card">
        <h3>İlgili Yazılar</h3>
        <ul className="blog-related-list">
          {blogNewsDetail.relatedPosts.map((post) => (
            <li key={post}>
              <a href="/blog-haber-detail">
                {post}
                <BlogDetailIcon type="arrow" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default function BlogNewsDetail() {
  return (
    <main className="blog-detail-page">
      <Header />
      <div className="blog-detail-shell">
        <BlogBreadcrumbs />
        <div className="blog-detail-layout">
          <BlogArticle />
          <BlogSidebar />
        </div>
      </div>
    </main>
  )
}
