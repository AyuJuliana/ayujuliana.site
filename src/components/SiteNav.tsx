'use client'

import { useState } from 'react'
import type { Track, SiteSettings } from '@/types/payload'
import styles from './SiteNav.module.css'

interface Props {
  track: Track
  tracks: Track[]
  scrolled: boolean
  activeSection: string
  onChangeTrack: () => void
  settings: SiteSettings | null
}

const NAV_LINKS = [
  { label: 'Home',    href: '#home' },
  { label: 'Project', href: '#projects' },
  { label: 'Resume',  href: '#resume' },
  { label: 'Kontak',  href: '#contact' },
]

export default function SiteNav({
  track,
  scrolled,
  activeSection,
  onChangeTrack,
  settings,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const logoText = settings?.shortName ?? 'ayu.juliana'

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${styles.nav}`} aria-label="Main navigation">
      <div className={`container nav-inner`}>
        {/* Logo */}
        <a
          href="#home"
          className={`nav-logo ${styles.logo}`}
          onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
        >
          {logoText}
        </a>

        {/* Desktop links */}
        <ul className={`nav-links ${styles.desktopLinks}`} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Track badge + change button */}
        <div className={styles.right}>
          <button
            className={`nav-track-badge ${styles.trackBadge}`}
            onClick={onChangeTrack}
            title="Ganti track"
            aria-label={`Track aktif: ${track.label}. Klik untuk ganti.`}
          >
            <span>{track.emoji ?? '✦'}</span>
            <span>{track.label}</span>
            <span className={styles.changeCaret} aria-hidden>⌄</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button className={styles.mobileClose} onClick={() => setMenuOpen(false)} aria-label="Tutup">✕</button>
          <ul role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.mobileLink} ${activeSection === link.href.replace('#', '') ? styles.mobileLinkActive : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button className={styles.mobileTrackBtn} onClick={() => { setMenuOpen(false); onChangeTrack() }}>
                {track.emoji} Ganti track
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
