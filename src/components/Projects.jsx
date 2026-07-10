import { useEffect, useMemo, useState } from 'react'
import { projects } from '../data/portfolioData'
import ProjectIcon from './icons/ProjectIcon'
import './Projects.css'

const visibleProjectCount = 4
const slideIntervalMs = 5000

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className={`project-preview ${project.accent}`}>
        <div className="project-preview-top">
          <span>{project.label}</span>
          <span>{project.year}</span>
        </div>
        <div className="preview-window" aria-hidden="true">
          <div className="preview-window-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="preview-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="preview-icon">
          <ProjectIcon type={project.icon} />
        </div>
      </div>
      <div className="project-content">
        <strong>{project.tag}</strong>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <a href="/project-detail">Devamı...</a>
      </div>
    </article>
  )
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isResetting, setIsResetting] = useState(false)
  const shouldSlide = projects.length > visibleProjectCount
  const loopingProjects = useMemo(() => {
    if (!shouldSlide) {
      return projects
    }

    return [...projects, ...projects.slice(0, visibleProjectCount)]
  }, [shouldSlide])

  useEffect(() => {
    if (!shouldSlide) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => current + 1)
    }, slideIntervalMs)

    return () => window.clearInterval(timer)
  }, [shouldSlide])

  useEffect(() => {
    if (!shouldSlide || activeIndex < projects.length) {
      return undefined
    }

    const resetTimer = window.setTimeout(() => {
      setIsResetting(true)
      setActiveIndex(0)
      window.requestAnimationFrame(() => {
        setIsResetting(false)
      })
    }, 520)

    return () => window.clearTimeout(resetTimer)
  }, [activeIndex, shouldSlide])

  const trackStyle = {
    transform: `translateX(calc(-${activeIndex} * var(--project-slide-step)))`,
    transition: isResetting ? 'none' : undefined,
  }

  return (
    <section className="projects-section" id="projelerim">
      <div className="section-heading">
        <div>
          <p>seçili işler</p>
          <h2>Projeler</h2>
        </div>
        <a href="/project-detail">Tümünü gör</a>
      </div>
      <div className="projects-carousel" aria-label="Projeler listesi">
        <div className="projects-track" style={trackStyle}>
          {loopingProjects.map((project, index) => (
            <ProjectCard project={project} key={`${project.title}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
