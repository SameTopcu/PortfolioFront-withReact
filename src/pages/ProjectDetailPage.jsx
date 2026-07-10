import {
  projectDetailFeatures,
  projectDetailImages,
  projectDetailTags,
  relatedProjects,
} from "../data/portfolioData";
import DetailIcon from "../components/icons/DetailIcon";
import "./ProjectDetailPage.css";
import Header from '../components/Header';

export default function ProjectDetailPage() {
  return (
    <main className="project-detail-page">
      <Header />
      

      <div className="project-detail-shell">
        <section className="detail-hero" id="hero">
          <h1>Admin Dashboard &amp; Analytics</h1>
          <div className="detail-actions">
            <a className="detail-button primary" href="#live-demo">
              Live Demo <DetailIcon type="external" />
            </a>
            <a
              className="detail-button secondary"
              href="https://github.com/sametopcu"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <DetailIcon type="github" />
            </a>
          </div>
          <div className="detail-tags">
            {projectDetailTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div
            className="laptop-mockup"
            aria-label="Admin dashboard interface preview"
          >
            <div className="laptop-screen">
              <img
                src={projectDetailImages[0]}
                alt="Admin Dashboard Interface"
              />
            </div>
            <div className="laptop-base">
              <span />
            </div>
          </div>
        </section>

        <section className="detail-two-column" id="details">
          <div className="detail-copy-stack">
            <article>
              <h2>Project Overview</h2>
              <p>
                This comprehensive Admin Dashboard and Analytics platform was
                designed for an enterprise SaaS client to streamline their data
                management workflows. The project involved building a robust
                backend architecture coupled with a highly responsive and
                intuitive frontend.
              </p>
              <p>
                The system handles complex data sets, providing real-time
                visualizations and detailed user management capabilities. Key
                focuses were performance, scalability, and an exceptional user
                experience for administrative staff.
              </p>
            </article>
            <article>
              <h2>Problem &amp; Solution</h2>
              <p>
                The client struggled with legacy systems that were slow and
                difficult to navigate. Data silos prevented effective
                cross-departmental analysis.
              </p>
              <p>
                We implemented a unified REST API using Laravel, ensuring secure
                and fast data access. The frontend was built with React and
                Tailwind CSS, offering a seamless SPA experience with dynamic
                charting powered by D3.js and Recharts.
              </p>
            </article>
          </div>

          <aside className="project-info-card">
            <h3>Project Info</h3>
            <dl>
              <div>
                <dt>Client</dt>
                <dd>SaaS Co.</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>Full Stack Dev</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>3 Months</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>Enterprise</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="tech-features-section" id="tech-features">
          <div className="detail-tech-stack">
            <h2>Tech Stack</h2>
            <div>
              <h4>Frontend</h4>
              <p>
                <span>React</span>
                <span>Tailwind CSS</span>
              </p>
            </div>
            <div>
              <h4>Backend</h4>
              <p>
                <span>Laravel</span>
                <span>MySQL</span>
                <span>TypeScript</span>
              </p>
            </div>
            <div>
              <h4>Infrastructure</h4>
              <p>
                <span>
                  <DetailIcon type="cloud" /> AWS
                </span>
                <span>
                  <DetailIcon type="container" /> Docker
                </span>
              </p>
            </div>
          </div>

          <div className="detail-features">
            <h2>Features</h2>
            <div className="detail-features-grid">
              {projectDetailFeatures.map((feature) => (
                <article className="detail-feature-card" key={feature.title}>
                  <span>
                    <DetailIcon type={feature.icon} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="technical-depth-section" id="technical-depth">
          <div className="detail-section-heading">
            <h2>Technical Depth</h2>
            <p>
              A deep dive into the code architecture and system design patterns
              used to achieve performance and reliability.
            </p>
          </div>
          <div className="technical-depth-grid">
            <div className="code-window">
              <div className="code-window-top">
                <span />
                <span />
                <span />
                <small>AnalyticsController.ts</small>
              </div>
              <pre>{`async function fetchRealTimeData() {
  const response = await api.get('/v1/stats');
  return response.data.map(item => ({
    timestamp: new Date(item.created_at),
    value: item.metric_value
  }));
}`}</pre>
            </div>
            <div className="architecture-card">
              <img src={projectDetailImages[1]} alt="Architecture Diagram" />
            </div>
          </div>
          <div className="metrics-grid">
            {[
              ["Speed", "99/100", "99"],
              ["SEO", "100/100", "100"],
              ["Accessibility", "98/100", "98"],
            ].map(([label, score, width]) => (
              <div className="metric-item" key={label}>
                <strong>
                  {label}: <span>{score}</span>
                </strong>
                <div>
                  <span style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="project-gallery-section" id="gallery">
          <h2>Project Gallery</h2>
          <div className="project-gallery-grid">
            {projectDetailImages.slice(2, 10).map((image, index) => (
              <img src={image} alt={`Screenshot ${index + 1}`} key={image} />
            ))}
          </div>
        </section>

        <section className="related-projects-section" id="related-projects">
          <div className="related-heading">
            <h2>Related Projects</h2>
            <div>
              <button type="button" aria-label="Previous project">
                <DetailIcon type="left" />
              </button>
              <button type="button" aria-label="Next project">
                <DetailIcon type="right" />
              </button>
            </div>
          </div>
          <div className="related-projects-grid">
            {relatedProjects.map((project) => (
              <article className="related-project-card" key={project.title}>
                <div className="related-image">
                  <img src={project.image} alt={project.title} />
                  <span className={project.tone}>
                    <DetailIcon type={project.icon} />
                  </span>
                </div>
                <div className="related-content">
                  <p>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </p>
                  <h3>{project.title}</h3>
                  <small>{project.text}</small>
                  <a href="/project-detail">
                    Read More <DetailIcon type="arrow" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="detail-dots" aria-hidden="true">
            <span />
            <span className="active" />
            <span />
            <span />
          </div>
        </section>

        <footer className="detail-cta-footer" id="contact">
          <h2>Let&apos;s work together.</h2>
          <a href="mailto:hello@example.com">Get in Touch</a>
          <p>© 2026 Portfolio Showcase. Designed and built with passion.</p>
        </footer>
      </div>
    </main>
  );
}
