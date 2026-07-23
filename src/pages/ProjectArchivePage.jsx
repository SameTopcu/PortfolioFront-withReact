import { useEffect, useState } from "react";
import { getProjects } from "../api/portfolioApi";
import Header from "../components/Header";
import { ProjectCard } from "../components/Projects";
import "../components/Projects.css";
import "./ProjectArchivePage.css";

export default function ProjectArchivePage({ header }) {
  const [projects, setProjects] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    getProjects({ signal: controller.signal })
      .then((data) => {
        setProjects(data);
        setState("ready");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setState("error");
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="project-archive-page">
      <Header {...header} />
      <section className="project-archive-hero">
        <span>SEÇİLİ ÇALIŞMALAR</span>
        <h1>Projeler</h1>
        <p>
          Ürün düşüncesi, güçlü arayüzler ve sürdürülebilir teknik altyapı
          etrafında şekillenen çalışmalar.
        </p>
      </section>
      <section className="project-archive-grid" aria-live="polite">
        {state === "loading" && (
          <p className="archive-message">Projeler yükleniyor…</p>
        )}
        {state === "error" && (
          <p className="archive-message">Projeler şu anda yüklenemiyor.</p>
        )}
        {state === "ready" && !projects.length && (
          <p className="archive-message">Henüz yayınlanmış proje yok.</p>
        )}
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </section>
      <footer className="project-archive-footer">
        <a href="/#iletisim">Bir proje hakkında konuşalım</a>
        <span>© {new Date().getFullYear()} Portfolyo</span>
      </footer>
    </main>
  );
}
