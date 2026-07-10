import { experiences } from '../data/portfolioData'
import './Experience.css'

export default function Experience() {
  const techTags = [
    ['Cisco', 'VLAN', 'TCP/IP', 'Firewall'],
    ['SQL', 'Oracle', 'PostgreSQL', 'Backup'],
    ['ATM Software', 'Analytics', 'REST API', 'Reporting'],
  ]

  return (
    <section className="experience-section" id="tecrubeler">
      <div className="experience-shell">
        <div className="experience-intro">
          <h2>Tecrübelerim</h2>
          <span>
            Ağ altyapısı, veritabanı yönetimi ve dijital kanal operasyonlarında
            sahada edinilmiş teknik pratikler.
          </span>
          <div className="experience-orbit" aria-hidden="true">
            <div className="orbit-ring" />
            <div className="orbit-ring" />
            <div className="orbit-dot" />
          </div>
        </div>

        <div className="experience-board" aria-label="Experience timeline">
          <div className="signal-line" aria-hidden="true" />
          {experiences.map((experience, index) => {
            const bullets = [
              experience.description,
              index === 0
                ? 'Saha kurulumlarında teknik dokümantasyon ve sorun analizi süreçlerine destek verdim.'
                : 'Operasyon ekipleriyle birlikte raporlama, takip ve kalite kontrol akışlarında yer aldım.',
              index === 2
                ? 'Kullanım verilerini yorumlayarak performans raporlarını daha okunabilir hale getirdim.'
                : 'Günlük iş akışlarında ekip içi iletişim ve standart takiplerini güçlendirdim.',
            ]

            return (
              <article className="experience-card" key={`${experience.company}-${experience.role}`}>
                <div className="experience-node" aria-hidden="true">
                  <span className="node-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="node-dot" />
                </div>
                <div className="experience-card-main">
                  <div className="experience-logo" aria-hidden="true">
                    <span>{experience.company.slice(0, 1)}</span>
                    <small>{experience.focus}</small>
                  </div>
                  <div className="experience-card-content">
                    <div className="experience-card-header">
                      <div>
                        <h3>{experience.role}</h3>
                        <p className="company">{experience.company}</p>
                      </div>
                      <div className="experience-meta" aria-label="Experience details">
                        <span>{index === 0 ? '2024' : '2025'}</span>
                        <span>{index === 0 ? 'Istanbul, TR' : 'Ankara, TR'}</span>
                      </div>
                    </div>
                    <p className="experience-description">{experience.description}</p>
                    <ul className="experience-bullets">
                      {bullets.slice(1).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="experience-tags">
                      {techTags[index].map((tag) => (
                        <span className="tech-tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
