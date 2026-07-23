const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8081/api').replace(/\/$/, '')

export async function getHomeContent({ signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/home`, {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Anasayfa içeriği alınamadı.')
  }

  const payload = await response.json()
  return payload.data
}

export async function getProjects({ signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/projects`, { signal, headers: { Accept: 'application/json' } })
  if (!response.ok) throw new Error('Projeler alınamadı.')
  const payload = await response.json()
  return payload.data
}

export async function getProject(slug, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/projects/${encodeURIComponent(slug)}`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error(response.status === 404 ? 'Proje bulunamadı.' : 'Proje detayı alınamadı.')
  const payload = await response.json()
  return payload.data
}

export async function getExperiences({ signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/experiences`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error('Tecrübeler alınamadı.')
  const payload = await response.json()
  return payload.data
}

export async function getBlogPosts({ signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/blog-posts`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error('Haberler ve blog yazıları alınamadı.')
  const payload = await response.json()
  return payload.data
}

export async function getBlogPost(slug, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/blog-posts/${encodeURIComponent(slug)}`, {
    signal,
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error(response.status === 404 ? 'Yazı bulunamadı.' : 'Yazı detayı alınamadı.')
  const payload = await response.json()
  return payload.data
}

export async function submitContactMessage(contactMessage) {
  const response = await fetch(`${apiBaseUrl}/contact-messages`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactMessage),
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const validationMessage = Object.values(payload.errors ?? {}).flat()[0]
    const fallback = response.status === 429
      ? 'Çok kısa sürede fazla mesaj gönderildi. Lütfen bir dakika sonra tekrar deneyin.'
      : 'Mesajınız gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.'
    throw new Error(validationMessage || payload.message || fallback)
  }

  return payload
}
