import SkillsPanel from './SkillsPanel'
import SocialLinks from './SocialLinks'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero-section" id="hakkimda">
      <div className="hero-copy">
        <h1>
          Modern Full Stack Developer
        </h1>
        <p>
          I design and build fast, scalable and user-friendly web applications.
          Passionate about Laravel, React, UI Engineering and AI-assisted development.
        </p>
        <div className="hero-actions">
          <a className="hero-button primary" href="#projelerim">View Projects</a>
          <a className="hero-button secondary" href="#iletisim">Contact Me</a>
        </div>
        <SocialLinks />
      </div>
      <SkillsPanel />
    </section>
  )
}
