import { useEffect, useState } from 'react'
import './App.css'
import { getHomeContent } from './api/portfolioApi'
import BlogNewsDetail from './components/BlogNewsDetail'
import BlogSlider from './components/BlogSlider'
import ContactSection from './components/ContactSection'
import Experience from './components/Experience'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import SiteFooter from './components/SiteFooter'
import ProjectArchivePage from './pages/ProjectArchivePage'
import ProjectDetailPage from './pages/ProjectDetailPage'

function useHomeContent() {
  const [homeContent, setHomeContent] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    getHomeContent({ signal: controller.signal })
      .then(setHomeContent)
      .catch((error) => {
        if (error.name !== 'AbortError') console.warn('Laravel API erişilemedi; yerel içerik gösteriliyor.', error)
      })
    return () => controller.abort()
  }, [])

  return homeContent
}

function headerProps(homeContent) {
  return {
    site: homeContent === null ? undefined : homeContent.site,
    navigation: homeContent === null ? undefined : homeContent.navigation,
  }
}

function PortfolioHome({ homeContent }) {
  return (
    <main className="portfolio-page">
      <div className="page-frame">
        <Header {...headerProps(homeContent)} />
        <Hero
          hero={homeContent === null ? undefined : homeContent.hero}
          skillGroups={homeContent === null ? undefined : homeContent.skillGroups}
        />
        <Projects />
        <Experience />
        <BlogSlider />
        <ContactSection />
        <SiteFooter />
      </div>
    </main>
  )
}

function App() {
  const homeContent = useHomeContent()
  const path = window.location.pathname.replace(/\/$/, '') || '/'

  if (path === '/blog-haber-detail') return <BlogNewsDetail header={headerProps(homeContent)} />
  if (path.startsWith('/haberler/')) {
    const slug = decodeURIComponent(path.slice('/haberler/'.length))
    return <BlogNewsDetail slug={slug} header={headerProps(homeContent)} />
  }
  if (path === '/projeler' || path === '/project-detail') return <ProjectArchivePage header={headerProps(homeContent)} />
  if (path.startsWith('/projeler/')) {
    const slug = decodeURIComponent(path.slice('/projeler/'.length))
    return <ProjectDetailPage slug={slug} header={headerProps(homeContent)} />
  }

  return <PortfolioHome homeContent={homeContent} />
}

export default App
