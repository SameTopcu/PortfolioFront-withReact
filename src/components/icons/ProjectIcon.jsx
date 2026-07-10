export default function ProjectIcon({ type }) {
  if (type === 'dashboard') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 11h32v26H8z" />
        <path d="M8 18h32M16 26h8M16 32h16M31 26h5" />
      </svg>
    )
  }

  if (type === 'cart') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M11 13h5l4 17h17l4-12H18" />
        <path d="M22 38a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM35 38a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </svg>
    )
  }

  if (type === 'cms') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 11h24v26H12z" />
        <path d="M17 18h14M17 24h10M17 30h14" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="m19 16-8 8 8 8M29 16l8 8-8 8M26 13l-4 22" />
    </svg>
  )
}
