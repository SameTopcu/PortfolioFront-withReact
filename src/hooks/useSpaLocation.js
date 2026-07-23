import { useEffect, useState } from 'react'
import { scrollToHash } from '../utils/navigation'

function readLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }
}

export default function useSpaLocation() {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    const handlePopState = () => {
      const nextLocation = readLocation()
      setLocation(nextLocation)
      window.requestAnimationFrame(() => scrollToHash(nextLocation.hash))
    }

    const handleInternalLink = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = event.target.closest('a[href]')
      if (
        !anchor ||
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')
      ) {
        return
      }

      const href = anchor.getAttribute('href')
      if (!href || /^(mailto:|tel:)/i.test(href)) return

      const nextUrl = new URL(anchor.href, window.location.href)
      if (nextUrl.origin !== window.location.origin) return

      const currentUrl = new URL(window.location.href)
      const isSameDocument =
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search

      if (isSameDocument) {
        if (!nextUrl.hash) return

        event.preventDefault()
        if (nextUrl.href !== currentUrl.href) {
          window.history.pushState({}, '', nextUrl)
        }
        setLocation(readLocation())
        window.requestAnimationFrame(() => scrollToHash(nextUrl.hash))
        return
      }

      event.preventDefault()
      window.history.pushState({}, '', nextUrl)
      setLocation(readLocation())
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleInternalLink)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleInternalLink)
    }
  }, [])

  return location
}
