import { useEffect, useRef, useState } from "react";
import { getProject } from "../api/portfolioApi";
import DetailIcon from "../components/icons/DetailIcon";
import Header from "../components/Header";
import ProjectIcon from "../components/icons/ProjectIcon";
import "./ProjectDetailPage.css";

function RichContent({ html }) {
  if (!html) return null;
  return (
    <div
      className="detail-rich-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function DetailAction({ url, className, children }) {
  if (!url)
    return (
      <span
        className={`detail-button ${className} disabled`}
        aria-disabled="true"
      >
        {children}
      </span>
    );
  return (
    <a
      className={`detail-button ${className}`}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function GalleryArrow({ direction }) {
  const isPrevious = direction === "previous";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={isPrevious ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ProjectGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(null);
  const hasMultipleImages = images.length > 1;

  const closeGallery = () => {
    setActiveIndex(null);
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
  };

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === null ? 0 : (current - 1 + images.length) % images.length,
    );
    setDragOffset(0);
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === null ? 0 : (current + 1) % images.length,
    );
    setDragOffset(0);
  };

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        setDragOffset(0);
        setIsDragging(false);
        dragStartX.current = null;
      }
      if (hasMultipleImages && event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + images.length) % images.length,
        );
        setDragOffset(0);
      }
      if (hasMultipleImages && event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % images.length,
        );
        setDragOffset(0);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, hasMultipleImages, images.length]);

  const handlePointerDown = (event) => {
    if (!hasMultipleImages || event.button !== 0) return;
    dragStartX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (dragStartX.current === null) return;
    setDragOffset(event.clientX - dragStartX.current);
  };

  const finishDrag = () => {
    if (dragStartX.current === null) return;

    if (dragOffset > 60) showPrevious();
    else if (dragOffset < -60) showNext();
    else setDragOffset(0);

    dragStartX.current = null;
    setIsDragging(false);
  };

  return (
    <>
      <div className="project-gallery-grid">
        {images.map((image, index) => (
          <button
            className="project-gallery-item"
            key={image.url}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`${image.alt || "Proje görseli"} görselini büyüt`}
          >
            <img src={image.url} alt={image.alt} />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Proje galerisi"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <button
            className="gallery-close"
            type="button"
            onClick={closeGallery}
            aria-label="Galeriyi kapat"
          >
            <span aria-hidden="true">×</span>
          </button>

          {hasMultipleImages && (
            <button
              className="gallery-navigation previous"
              type="button"
              onClick={showPrevious}
              aria-label="Önceki görsel"
            >
              <GalleryArrow direction="previous" />
            </button>
          )}

          <div
            className={`gallery-stage ${isDragging ? "dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
          >
            <img
              src={images[activeIndex].url}
              alt={images[activeIndex].alt}
              draggable="false"
              style={{ "--gallery-drag-offset": `${dragOffset}px` }}
            />
          </div>

          {hasMultipleImages && (
            <button
              className="gallery-navigation next"
              type="button"
              onClick={showNext}
              aria-label="Sonraki görsel"
            >
              <GalleryArrow direction="next" />
            </button>
          )}

          <div className="gallery-status" aria-live="polite">
            <span>{activeIndex + 1}</span> / {images.length}
            {hasMultipleImages && <small>Kaydır veya okları kullan</small>}
          </div>
        </div>
      )}
    </>
  );
}

export default function ProjectDetailPage({ slug, header }) {
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    getProject(slug, { signal: controller.signal })
      .then(setProject)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      });
    return () => controller.abort();
  }, [slug]);

  if (error)
    return (
      <main className="project-detail-page">
        <Header {...header} />
        <section className="detail-state">
          <h1>Proje bulunamadı</h1>
          <p>{error}</p>
          <a href="/projeler">Tüm projelere dön</a>
        </section>
      </main>
    );
  if (!project)
    return (
      <main className="project-detail-page">
        <Header {...header} />
        <section className="detail-state">
          <p>Proje yükleniyor…</p>
        </section>
      </main>
    );

  const hasOverview =
    project.overview.enabled &&
    (project.overview.content ||
      project.overview.problem ||
      project.overview.solution);
  const hasInfo = project.info.enabled && project.info.items.length > 0;
  const hasTechnology =
    project.technologyGroups.enabled &&
    project.technologyGroups.groups.length > 0;
  const hasFeatures =
    project.features.enabled && project.features.items.length > 0;
  const technical = project.technicalDepth;

  return (
    <main className="project-detail-page">
      <Header {...header} />
      <div className="project-detail-shell">
        <section className="detail-hero" id="hero">
          <span className="detail-kicker">
            {project.badge || "PROJE"} · {project.year || "GÜNCEL"}
          </span>
          <h1>{project.title}</h1>
          <p className="detail-summary">{project.summary}</p>
          <div className="detail-actions">
            <DetailAction url={project.liveDemoUrl} className="primary">
              Canlı Demo <DetailIcon type="external" />
            </DetailAction>
            <DetailAction url={project.githubUrl} className="secondary">
              GitHub <DetailIcon type="github" />
            </DetailAction>
          </div>
          {!!project.tags.length && (
            <div className="detail-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
          <div
            className="laptop-mockup"
            aria-label={`${project.title} ön izlemesi`}
          >
            <div className="laptop-screen">
              {project.coverUrl ? (
                <img src={project.coverUrl} alt={project.coverAlt} />
              ) : (
                <div
                  className="detail-cover-placeholder"
                  style={{ "--project-accent": project.accentColor }}
                >
                  <ProjectIcon type={project.cardIcon} />
                  <span>Kapak görseli panelden yüklenebilir</span>
                </div>
              )}
            </div>
            <div className="laptop-base">
              <span />
            </div>
          </div>
        </section>

        {(hasOverview || hasInfo) && (
          <section className="detail-two-column" id="details">
            {hasOverview && (
              <div className="detail-copy-stack">
                {project.overview.content && (
                  <article>
                    <h2>Proje Özeti</h2>
                    <RichContent html={project.overview.content} />
                  </article>
                )}
                {project.overview.problem && (
                  <article>
                    <h2>Problem</h2>
                    <RichContent html={project.overview.problem} />
                  </article>
                )}
                {project.overview.solution && (
                  <article>
                    <h2>Çözüm</h2>
                    <RichContent html={project.overview.solution} />
                  </article>
                )}
              </div>
            )}
            {hasInfo && (
              <aside className="project-info-card">
                <h3>Proje Bilgileri</h3>
                <dl>
                  {project.info.items.map((item) => (
                    <div key={`${item.label}-${item.value}`}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            )}
          </section>
        )}

        {(hasTechnology || hasFeatures) && (
          <section
            className={`tech-features-section ${hasTechnology && hasFeatures ? "" : "single"}`}
            id="tech-features"
          >
            {hasTechnology && (
              <div className="detail-tech-stack">
                <h2>Teknoloji Yığını</h2>
                {project.technologyGroups.groups.map((group) => (
                  <div key={group.title}>
                    <h4>{group.title}</h4>
                    <p>
                      {group.items.map((item) => (
                        <span key={item.name}>
                          {item.iconUrl && <img src={item.iconUrl} alt="" />}
                          {item.name}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {hasFeatures && (
              <div className="detail-features">
                <h2>Özellikler</h2>
                <div className="detail-features-grid">
                  {project.features.items.map((feature) => (
                    <article
                      className="detail-feature-card"
                      key={feature.title}
                    >
                      <span>
                        {feature.iconUrl ? (
                          <img src={feature.iconUrl} alt="" />
                        ) : (
                          <DetailIcon type={feature.icon} />
                        )}
                      </span>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {technical.enabled &&
          (technical.title ||
            technical.description ||
            technical.codeContent ||
            technical.architectureImageUrl) && (
            <section className="technical-depth-section" id="technical-depth">
              <div className="detail-section-heading">
                <h2>{technical.title || "Teknik Detaylar"}</h2>
                {technical.description && <p>{technical.description}</p>}
              </div>
              {(technical.codeContent || technical.architectureImageUrl) && (
                <div
                  className={`technical-depth-grid ${!technical.codeContent || !technical.architectureImageUrl ? "single" : ""}`}
                >
                  {technical.codeContent && (
                    <div className="code-window">
                      <div className="code-window-top">
                        <span />
                        <span />
                        <span />
                        <small>{technical.codeFilename || "kod-ornegi"}</small>
                      </div>
                      <pre>
                        <code data-language={technical.codeLanguage}>
                          {technical.codeContent}
                        </code>
                      </pre>
                    </div>
                  )}
                  {technical.architectureImageUrl && (
                    <div className="architecture-card">
                      <img
                        src={technical.architectureImageUrl}
                        alt={`${project.title} mimari diyagramı`}
                      />
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

        {project.gallery.enabled && project.gallery.images.length > 0 && (
          <section className="project-gallery-section" id="gallery">
            <h2>Proje Galerisi</h2>
            <ProjectGallery images={project.gallery.images} />
          </section>
        )}

        {project.relatedProjects.enabled &&
          project.relatedProjects.items.length > 0 && (
            <section className="related-projects-section" id="related-projects">
              <div className="related-heading">
                <h2>İlişkili Projeler</h2>
                <a href="/projeler">Tüm projeler</a>
              </div>
              <div className="related-projects-grid">
                {project.relatedProjects.items.map((related) => (
                  <article className="related-project-card" key={related.id}>
                    <div className="related-image">
                      {related.coverUrl ? (
                        <img src={related.coverUrl} alt={related.coverAlt} />
                      ) : (
                        <div
                          className="related-placeholder"
                          style={{ "--project-accent": related.accentColor }}
                        >
                          <ProjectIcon type={related.cardIcon} />
                        </div>
                      )}
                      <span>
                        <DetailIcon
                          type={
                            related.cardIcon === "cms"
                              ? "file"
                              : related.cardIcon
                          }
                        />
                      </span>
                    </div>
                    <div className="related-content">
                      <p>
                        {related.stackSummary?.split("/").map((tag) => (
                          <span key={tag}>{tag.trim()}</span>
                        ))}
                      </p>
                      <h3>{related.title}</h3>
                      <small>{related.summary}</small>
                      <a href={related.detailUrl}>
                        İncele <DetailIcon type="arrow" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

        <footer className="detail-cta-footer" id="contact">
          <h2>Birlikte çalışalım.</h2>
          {project.contactEmail ? (
            <a href={`mailto:${project.contactEmail}`}>İletişime Geç</a>
          ) : (
            <span className="detail-contact-disabled">
              İletişim adresi eklenmemiş
            </span>
          )}
          <p>
            © {new Date().getFullYear()} Portfolyo. Özenle tasarlandı ve
            geliştirildi.
          </p>
        </footer>
      </div>
    </main>
  );
}
