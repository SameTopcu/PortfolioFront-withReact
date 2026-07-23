import { useEffect, useState } from 'react'
import { getProjects } from '../api/portfolioApi'
import Header from './Header'
import ProjectIcon from './icons/ProjectIcon'
import {
  ScrollAnimateContainer,
  ScrollAnimateItem,
} from './motion/ScrollAnimateContainer'
import SiteFooter from './SiteFooter'
import './ProjectsPage.css'

function ProjectArchiveCard({ project }) {
  return (
    <ScrollAnimateItem
      as="article"
      className="projects-page-card"
      whileHover={{ y: -6 }}
    >
      <a href={project.detailUrl} aria-label={`${project.title} projesini incele`}>
        <div
          className={`projects-page-image ${project.coverUrl ? 'has-image' : ''}`}
          style={{ '--archive-accent': project.accentColor || '#2563eb' }}
        >
          {project.coverUrl ? (
            <img src={project.coverUrl} alt={project.coverAlt || project.title} />
          ) : (
            <div className="projects-page-placeholder" aria-hidden="true">
              <ProjectIcon type={project.cardIcon || 'code'} />
              <span>{project.badge || 'Proje'}</span>
            </div>
          )}
        </div>
        <div className="projects-page-content">
          <div className="projects-page-meta">
            <span>{project.year || 'Güncel'}</span>
            <span>{project.stackSummary || project.badge || 'Proje'}</span>
          </div>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
          <strong>Projeyi incele <span aria-hidden="true">↗</span></strong>
        </div>
      </a>
    </ScrollAnimateItem>
  )
}

export default function ProjectsPage({ header }) {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()
    getProjects({ signal: controller.signal })
      .then((items) => {
        setProjects(items)
        setStatus('ready')
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error')
      })
    return () => controller.abort()
  }, [])

  return (
    <main className="projects-page">
      <Header {...header} />
      <section className="projects-page-shell">
        <header className="archive-page-heading">
          <p>PORTFOLYO ARŞİVİ</p>
          <div>
            <h1>Tüm Projeler</h1>
            <span aria-hidden="true" />
          </div>
          <small>
            Tasarım, geliştirme ve sürdürülebilir teknik altyapı odağında
            hazırlanan tüm çalışmalar.
          </small>
        </header>

        {status === 'loading' && (
          <p className="projects-page-state">Projeler yükleniyor…</p>
        )}
        {status === 'error' && (
          <p className="projects-page-state">Projeler şu anda yüklenemiyor.</p>
        )}
        {status === 'ready' && projects.length === 0 && (
          <p className="projects-page-state">Henüz yayınlanmış proje yok.</p>
        )}

        {projects.length > 0 && (
          <ScrollAnimateContainer
            className="projects-page-grid"
            stagger={0.1}
            amount={0.08}
          >
            {projects.map((project) => (
              <ProjectArchiveCard project={project} key={project.id} />
            ))}
          </ScrollAnimateContainer>
        )}
      </section>
      <SiteFooter />
    </main>
  )
}
