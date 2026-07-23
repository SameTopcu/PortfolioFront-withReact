import { useEffect, useState } from 'react'
import { getExperiences } from '../api/portfolioApi'
import {
  ScrollAnimateContainer,
  ScrollAnimateItem,
} from './motion/ScrollAnimateContainer'
import './Experience.css'

const dateFormatter = new Intl.DateTimeFormat('tr-TR', { month: 'short', year: 'numeric' })

function formatExperiencePeriod(experience) {
  if (!experience.startDate) return ''
  const start = dateFormatter.format(new Date(`${experience.startDate}T00:00:00`))
  if (experience.isCurrent) return `${start} – Günümüz`
  if (!experience.endDate) return start
  const end = dateFormatter.format(new Date(`${experience.endDate}T00:00:00`))
  return `${start} – ${end}`
}

export default function Experience() {
  const [experienceSection, setExperienceSection] = useState(undefined)

  useEffect(() => {
    const controller = new AbortController()
    getExperiences({ signal: controller.signal })
      .then(setExperienceSection)
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn('Tecrübeler API üzerinden alınamadı.', error)
          setExperienceSection(null)
        }
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (!experienceSection || window.location.hash !== '#tecrubeler') return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('tecrubeler')?.scrollIntoView({ block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [experienceSection])

  if (!experienceSection || experienceSection.items.length === 0) return null

  return (
    <section className="experience-section" id="tecrubeler">
      <div className="experience-shell">
        <div className="experience-intro">
          <h2>{experienceSection.heading}</h2>
          {experienceSection.description && <span>{experienceSection.description}</span>}
          <div className="experience-orbit" aria-hidden="true">
            <div className="orbit-ring" />
            <div className="orbit-ring" />
            <div className="orbit-dot" />
          </div>
        </div>

        <ScrollAnimateContainer
          className="experience-board"
          aria-label="Tecrübe zaman çizelgesi"
          stagger={0.1}
        >
          <div className="signal-line" aria-hidden="true" />
          {experienceSection.items.map((experience, index) => (
            <ScrollAnimateItem
              as="article"
              className="experience-card"
              whileHover={{ x: 6, y: -2 }}
              key={experience.id}
            >
              <div className="experience-node" aria-hidden="true">
                <span className="node-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="node-dot" />
              </div>
              <div className="experience-card-main">
                <div className={`experience-logo ${experience.logoUrl ? 'has-image' : ''}`} aria-hidden="true">
                  {experience.logoUrl
                    ? <img src={experience.logoUrl} alt="" />
                    : <span>{experience.company.slice(0, 1).toLocaleUpperCase('tr-TR')}</span>}
                  {experience.focus && <small>{experience.focus}</small>}
                </div>
                <div className="experience-card-content">
                  <div className="experience-card-header">
                    <div>
                      <h3>{experience.role}</h3>
                      <p className="company">{experience.company}</p>
                    </div>
                    {(formatExperiencePeriod(experience) || experience.location) && (
                      <div className="experience-meta" aria-label="Tecrübe ayrıntıları">
                        {formatExperiencePeriod(experience) && <span>{formatExperiencePeriod(experience)}</span>}
                        {experience.location && <span>{experience.location}</span>}
                      </div>
                    )}
                  </div>
                  <p className="experience-description">{experience.description}</p>
                  {experience.bullets.length > 0 && (
                    <ul className="experience-bullets">
                      {experience.bullets.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  {experience.tags.length > 0 && (
                    <div className="experience-tags">
                      {experience.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimateItem>
          ))}
        </ScrollAnimateContainer>
      </div>
    </section>
  )
}
