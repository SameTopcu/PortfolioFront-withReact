import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { getHomeContent } from './api/portfolioApi'
import BlogNewsDetail from './components/BlogNewsDetail'
import BlogSlider from './components/BlogSlider'
import ContactSection from './components/ContactSection'
import Experience from './components/Experience'
import HaberDetayPage from './components/HaberDetayPage'
import Header from './components/Header'
import Hero from './components/Hero'
import PageTransitionWrapper from './components/motion/PageTransitionWrapper'
import Projects from './components/Projects'
import ProjectsPage from './components/ProjectsPage'
import SiteFooter from './components/SiteFooter'
import useSpaLocation from './hooks/useSpaLocation'
import ProjectDetailPage from './pages/ProjectDetailPage'
import { scrollToHash } from './utils/navigation'
import './HomeTheme.css'

const homeContentCacheKey = 'portfolio-home-content-v1'

function readCachedHomeContent() {
  try {
    const cachedContent = window.sessionStorage.getItem(homeContentCacheKey)
    return cachedContent ? JSON.parse(cachedContent) : null
  } catch {
    return null
  }
}

function cacheHomeContent(homeContent) {
  try {
    window.sessionStorage.setItem(homeContentCacheKey, JSON.stringify(homeContent))
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

function useHomeContent() {
  const [homeContent, setHomeContent] = useState(readCachedHomeContent)

  useEffect(() => {
    const controller = new AbortController()
    getHomeContent({ signal: controller.signal })
      .then((freshHomeContent) => {
        setHomeContent(freshHomeContent)
        cacheHomeContent(freshHomeContent)
      })
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
  const location = useSpaLocation()
  const pendingHashScroll = useRef(null)
  const path = location.pathname.replace(/\/$/, '') || '/'

  const handlePageEntered = useCallback(() => {
    pendingHashScroll.current?.()
    pendingHashScroll.current = null

    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0 })
      return
    }

    if (scrollToHash(location.hash)) return

    const observer = new MutationObserver(() => {
      if (scrollToHash(location.hash)) {
        observer.disconnect()
        window.clearTimeout(timeout)
        pendingHashScroll.current = null
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
    const timeout = window.setTimeout(() => {
      observer.disconnect()
      pendingHashScroll.current = null
    }, 3000)

    pendingHashScroll.current = () => {
      observer.disconnect()
      window.clearTimeout(timeout)
    }
  }, [location.hash])

  useEffect(() => () => pendingHashScroll.current?.(), [])

  let page

  if (path === '/blog-haber-detail') {
    page = <BlogNewsDetail header={headerProps(homeContent)} />
  } else if (path === '/haberler') {
    page = <HaberDetayPage header={headerProps(homeContent)} />
  } else if (path.startsWith('/haberler/')) {
    const slug = decodeURIComponent(path.slice('/haberler/'.length))
    page = <BlogNewsDetail slug={slug} header={headerProps(homeContent)} />
  } else if (path === '/projeler' || path === '/project-detail') {
    page = <ProjectsPage header={headerProps(homeContent)} />
  } else if (path.startsWith('/projeler/')) {
    const slug = decodeURIComponent(path.slice('/projeler/'.length))
    page = <ProjectDetailPage slug={slug} header={headerProps(homeContent)} />
  } else {
    page = <PortfolioHome homeContent={homeContent} />
  }

  return (
    <PageTransitionWrapper
      routeKey={`${path}${location.search}`}
      onEntered={handlePageEntered}
    >
      {page}
    </PageTransitionWrapper>
  )
}

export default App
