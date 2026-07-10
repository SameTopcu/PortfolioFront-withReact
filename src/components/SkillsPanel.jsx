import { skillGroups } from '../data/portfolioData'
import SkillIcon from './icons/SkillIcon'
import './SkillsPanel.css'

export default function SkillsPanel() {
  return (
    <aside className="skills-panel" aria-labelledby="skills-title">
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <section className="skill-column-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul className="skill-badges">
              {group.items.map((item) => (
                <li className={`skill-logo ${item.icon}`} key={item.name}>
                  <span className="skill-logo-icon">
                    <SkillIcon type={item.icon} />
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
