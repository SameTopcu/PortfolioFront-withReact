import './App.css'
import BlogNewsDetail from './components/BlogNewsDetail'
import BlogSlider from './components/BlogSlider'
import ContactSection from './components/ContactSection'
import Experience from './components/Experience'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import SiteFooter from './components/SiteFooter'
import ProjectDetailPage from './pages/ProjectDetailPage'

function App() {
  if (window.location.pathname === '/blog-haber-detail') {
    return <BlogNewsDetail />
  }

  if (window.location.pathname === '/project-detail') {
    return <ProjectDetailPage />
  }

  return (
    <main className="portfolio-page">
      <div className="page-frame">
        <Header />
        <Hero />
        <Projects />
        <Experience />
        <BlogSlider />
        <ContactSection />
        <SiteFooter />
      </div>
    </main>
  )
}

export default App
