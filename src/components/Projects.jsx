import { useEffect, useMemo, useState } from 'react'
import { getProjects } from '../api/portfolioApi'
import ProjectIcon from './icons/ProjectIcon'
import {
  ScrollAnimateContainer,
  ScrollAnimateItem,
} from './motion/ScrollAnimateContainer'
import './Projects.css'

const visibleProjectCount = 4
const slideIntervalMs = 5000

export function ProjectCard({ project }) {
  return (
    <ScrollAnimateItem
      as="article"
      className="project-card"
      style={{ '--project-accent': project.accentColor || '#2563eb' }}
      whileHover={{ y: -8 }}
    >
      <div className="project-preview">
        {project.coverUrl && <img className="project-cover-image" src={project.coverUrl} alt={project.coverAlt || project.title} />}
        <div className="project-preview-top"><span>{project.badge || 'Proje'}</span><span>{project.year || '—'}</span></div>
        {!project.coverUrl && <div className="preview-window" aria-hidden="true"><div className="preview-window-bar"><span /><span /><span /></div><div className="preview-lines"><span /><span /><span /></div></div>}
        <div className="preview-icon">{project.cardIconUrl ? <img src={project.cardIconUrl} alt="" /> : <ProjectIcon type={project.cardIcon || 'code'} />}</div>
      </div>
      <div className="project-content">
        <strong>{project.stackSummary || 'Proje'}</strong>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <a href={project.detailUrl}>Devamını gör</a>
      </div>
    </ScrollAnimateItem>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    getProjects({ signal: controller.signal })
      .then((items) => {
        setProjects(Array.isArray(items) ? items : [])
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn('Projeler API üzerinden alınamadı.', error)
        }
      })
    return () => controller.abort()
  }, [])

  const shouldSlide = projects.length > visibleProjectCount
  const loopingProjects = useMemo(() => shouldSlide ? [...projects, ...projects.slice(0, visibleProjectCount)] : projects, [projects, shouldSlide])

  useEffect(() => {
    if (!shouldSlide) return undefined
    const timer = window.setInterval(() => setActiveIndex((current) => current + 1), slideIntervalMs)
    return () => window.clearInterval(timer)
  }, [shouldSlide])

  useEffect(() => {
    if (!shouldSlide || activeIndex < projects.length) return undefined
    const resetTimer = window.setTimeout(() => {
      setIsResetting(true)
      setActiveIndex(0)
      window.requestAnimationFrame(() => setIsResetting(false))
    }, 520)
    return () => window.clearTimeout(resetTimer)
  }, [activeIndex, projects.length, shouldSlide])

  return (
    <section className="projects-section" id="projelerim">
      <div className="section-heading"><div><p>seçili işler</p><h2>Projeler</h2></div><a href="/projeler">Hepsini görüntüle</a></div>
      <div className="projects-carousel" aria-label="Projeler listesi">
        <ScrollAnimateContainer
          className="projects-track"
          stagger={0.1}
          style={{ transform: `translateX(calc(-${activeIndex} * var(--project-slide-step)))`, transition: isResetting ? 'none' : undefined }}
        >
          {loopingProjects.map((project, index) => <ProjectCard project={project} key={`${project.id}-${index}`} />)}
        </ScrollAnimateContainer>
      </div>
    </section>
  )
}
