import { motion } from 'framer-motion'
import { skillGroups } from '../data/portfolioData'
import SkillIcon from './icons/SkillIcon'
import {
  skillCardVariants,
  skillContentsVariants,
  skillGridVariants,
  skillItemVariants,
} from './heroMotion'
import './SkillsPanel.css'

const FLOAT_DURATIONS = [4.8, 5.4, 5.9]

export default function SkillsPanel({ groups, reducedMotion = false }) {
  const displayedGroups = groups === undefined ? skillGroups : groups

  return (
    <motion.aside
      className="skills-panel"
      aria-label="Teknolojiler"
      initial={reducedMotion ? false : 'hidden'}
      animate="visible"
    >
      <div className="skills-window-toolbar" aria-hidden="true">
        <span className="skills-window-dots">
          <i />
          <i />
          <i />
        </span>
        <svg viewBox="0 0 24 24">
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
        </svg>
      </div>
      <motion.div className="skills-grid" variants={skillGridVariants}>
        {displayedGroups.map((group, groupIndex) => (
          <motion.div
            className={`skill-card-stage skill-card-stage-${groupIndex + 1}`}
            variants={skillCardVariants}
            whileHover={reducedMotion ? undefined : { y: -7 }}
            key={group.id || group.title}
          >
            <div
              className="skill-card-float"
              style={{
                '--skill-float-duration': `${FLOAT_DURATIONS[groupIndex % FLOAT_DURATIONS.length]}s`,
                '--skill-float-delay': `${0.9 + groupIndex * 0.35}s`,
              }}
            >
              <motion.section
                className="skill-column-card"
                variants={skillContentsVariants}
              >
                <motion.h3 variants={skillItemVariants}>
                  {group.title}
                </motion.h3>
                <motion.ul
                  className="skill-badges"
                  variants={skillContentsVariants}
                >
                  {group.items.map((item) => (
                    <motion.li
                      className={`skill-logo ${item.icon || 'uploaded'}`}
                      variants={skillItemVariants}
                      key={item.id || item.name}
                    >
                      <span
                        className="skill-logo-icon"
                        style={item.accentColor ? { background: item.accentColor } : undefined}
                      >
                        {item.iconUrl ? <img src={item.iconUrl} alt="" /> : <SkillIcon type={item.icon} />}
                      </span>
                      <span>{item.name}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.section>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.aside>
  )
}
