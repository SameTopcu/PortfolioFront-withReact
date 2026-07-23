import { useState } from 'react'
import { submitContactMessage } from '../api/portfolioApi'
import './ContactSection.css'

export default function ContactSection() {
  const [messageLength, setMessageLength] = useState(0)
  const [formState, setFormState] = useState({ type: 'idle', message: '' })

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: '#linkedin',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2ZM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      ),
    },
    {
      label: 'Github',
      href: 'https://github.com/sametopcu',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: '#twitter',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2Z" />
        </svg>
      ),
    },
  ]

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      subject: String(formData.get('subject') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      website: String(formData.get('website') || '').trim(),
    }

    setFormState({ type: 'loading', message: 'Mesajınız yönetim paneline iletiliyor…' })
    try {
      const result = await submitContactMessage(payload)
      form.reset()
      setMessageLength(0)
      setFormState({ type: 'success', message: result.message })
    } catch (error) {
      setFormState({ type: 'error', message: error.message })
    }
  }

  return (
    <section className="contact-section" id="iletisim">
      <div className="contact-inner">
        <div className="contact-left">
          <h2 className="contact-title">İletişim</h2>
          <p className="contact-desc">
            Bir proje fikriniz veya iş birliği teklifiniz varsa mesaj bırakın.
            Bildiriminiz ve dönüş adresiniz doğrudan yönetim panelindeki gelen kutusuna ulaşır.
          </p>
          
          <div className="contact-socials">
            {socialLinks.map((link) => (
              <a
                href={link.href}
                className="contact-social-icon"
                key={link.label}
                aria-label={link.label}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} aria-busy={formState.type === 'loading'}>
          <div className="contact-form-heading">
            <span>Yeni bildirim</span>
            <small>Tüm alanlar zorunludur</small>
          </div>
          <div className="contact-form-row">
            <label><span>Ad soyad</span><input type="text" name="name" placeholder="Adınızı yazın" minLength="2" maxLength="100" autoComplete="name" required /></label>
            <label><span>E-posta</span><input type="email" name="email" placeholder="ornek@adres.com" maxLength="190" autoComplete="email" required /></label>
          </div>
          <label><span>Konu</span><input type="text" name="subject" placeholder="Mesajınızın konusu" minLength="3" maxLength="160" required /></label>
          <label className="contact-message-field">
            <span>Mesaj</span>
            <textarea name="message" placeholder="Projenizi veya görüşmek istediğiniz konuyu anlatın…" rows="6" minLength="10" maxLength="5000" onChange={(event) => setMessageLength(event.target.value.length)} required />
            <small>{messageLength} / 5000</small>
          </label>
          <label className="contact-honeypot" aria-hidden="true">
            Web sitesi
            <input type="text" name="website" tabIndex="-1" autoComplete="off" />
          </label>
          <div className="contact-form-footer">
            <p className={`contact-form-status is-${formState.type}`} role={formState.type === 'error' ? 'alert' : 'status'} aria-live="polite">
              {formState.message}
            </p>
            <button type="submit" disabled={formState.type === 'loading'}>
              <span>{formState.type === 'loading' ? 'Gönderiliyor…' : 'Bildirimi Gönder'}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 14-7-4 14-3-5-7-2Z" /><path d="m12 14 7-9" /></svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
