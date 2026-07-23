const specialProtocolPattern = /^(?:https?:|mailto:|tel:|\/\/)/i

export function normalizeInternalHref(url, { hashFromHome = false } = {}) {
  if (!url || specialProtocolPattern.test(url)) return url

  if (url.startsWith('#')) {
    return hashFromHome ? `/${url}` : url
  }

  return url.startsWith('/') ? url : `/${url}`
}

export function scrollToHash(hash, options = {}) {
  if (!hash) return false

  const id = decodeURIComponent(hash.replace(/^#/, ''))
  const target = document.getElementById(id)
  if (!target) return false

  target.scrollIntoView({
    block: 'start',
    behavior: options.behavior || 'auto',
  })
  return true
}
