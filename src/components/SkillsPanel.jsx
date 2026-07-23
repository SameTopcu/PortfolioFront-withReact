import { skillGroups } from '../data/portfolioData'
import SkillIcon from './icons/SkillIcon'
import './SkillsPanel.css'

export default function SkillsPanel({ groups }) {
  const displayedGroups = groups === undefined ? skillGroups : groups

  return (
    <aside className="skills-panel" aria-label="Teknolojiler">
      <div className="skills-grid">
        {displayedGroups.map((group) => (
          <section className="skill-column-card" key={group.id || group.title}>
            <h3>{group.title}</h3>
            <ul className="skill-badges">
              {group.items.map((item) => (
                <li className={`skill-logo ${item.icon || 'uploaded'}`} key={item.id || item.name}>
                  <span className="skill-logo-icon" style={item.accentColor ? { background: item.accentColor } : undefined}>
                    {item.iconUrl ? <img src={item.iconUrl} alt="" /> : <SkillIcon type={item.icon} />}
                  </span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  )
}
