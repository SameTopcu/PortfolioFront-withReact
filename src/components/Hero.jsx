import SkillsPanel from './SkillsPanel'
import SocialLinks from './SocialLinks'
import './Hero.css'

const defaultHero = {
  headline: 'Modern Full Stack Developer',
  description: 'Hızlı, ölçeklenebilir ve kullanıcı dostu web uygulamaları tasarlıyor ve geliştiriyorum. Laravel, React, arayüz mühendisliği ve yapay zekâ destekli geliştirme üzerine çalışıyorum.',
  primaryButton: { label: 'Projelerimi Gör', url: '#projelerim' },
  secondaryButton: { label: 'İletişime Geç', url: '#iletisim' },
}

export default function Hero({ hero, skillGroups }) {
  if (hero === null) return null

  const content = hero === undefined ? defaultHero : hero

  return (
    <section className="hero-section" id="hakkimda">
      <div className="hero-copy">
        <h1>{content.headline}</h1>
        <p>{content.description}</p>
        <div className="hero-actions">
          <a className="hero-button primary" href={content.primaryButton.url}>{content.primaryButton.label}</a>
          <a className="hero-button secondary" href={content.secondaryButton.url}>{content.secondaryButton.label}</a>
        </div>
        <SocialLinks links={content.socialLinks} />
      </div>
      <SkillsPanel groups={skillGroups} />
    </section>
  )
}
