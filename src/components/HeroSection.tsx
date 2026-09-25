'use client'

import { useEffect, useState } from 'react'
import type { Track, SiteSettings, HeroSection as HeroData } from '@/types/payload'
import { getMediaUrl } from '@/lib/utils'
import styles from './HeroSection.module.css'

interface Props {
  track: Track
  settings: SiteSettings | null
}

const DEFAULT_BADGES = [
  { text: 'Machine Learning', pos: 'top-left' },
  { text: 'React / Next.js', pos: 'top-right' },
  { text: 'Python',           pos: 'left' },
  { text: 'Swift / iOS',      pos: 'right' },
  { text: 'SQL & Analytics',  pos: 'bottom-left' },
  { text: 'QA Automation',    pos: 'bottom-right' },
]

export default function HeroSection({ track, settings }: Props) {
  const [hero, setHero] = useState<HeroData | null>(null)

  useEffect(() => {
    fetch('/api/globals/hero-section?depth=1')
      .then((r) => r.json())
      .then((d) => setHero(d))
      .catch(() => {})
  }, [])

  const greeting   = hero?.greeting    ?? 'halo, aku'
  const name       = hero?.name        ?? settings?.fullName ?? 'Ni Komang Ayu Juliana'
  const bio        = hero?.bio         ?? settings?.tagline  ?? 'Fresh graduate Informatika dengan pengalaman langsung di Software Development, Data Science, Machine Learning, dan AI melalui Apple Developer Academy.'
  const ctaPrimary = hero?.ctaPrimary  ?? { label: 'Lihat Project', href: '#projects' }
  const ctaSecondary = hero?.ctaSecondary ?? { label: 'Unduh Resume', href: '#resume' }
  const avatarUrl  = hero?.illustration ? getMediaUrl(hero.illustration) : null
  const badges     = hero?.floatingBadges?.length ? hero.floatingBadges : DEFAULT_BADGES

  return (
    <div className={styles.root}>
      {/* Background orbs */}
      <div className={styles.orb1} aria-hidden />
      <div className={styles.orb2} aria-hidden />

      <div className={`container ${styles.inner}`}>
        {/* Left: text */}
        <div className={styles.text}>
          <p className={`animate-fade-up ${styles.greeting}`}>{greeting}</p>

          <h1 className={`animate-fade-up delay-1 ${styles.name}`}>
            {name}
          </h1>

          <p className={`animate-fade-up delay-2 ${styles.bio}`}>{bio}</p>

          {/* Track pill */}
          <div className={`animate-fade-up delay-3 ${styles.trackPill}`}>
            <span>{track.emoji}</span>
            <span>{track.label}</span>
          </div>

          <div className={`animate-fade-up delay-4 ${styles.ctas}`}>
            <a
              href={ctaPrimary.href ?? '#projects'}
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {ctaPrimary.label}
            </a>
            <a
              href={ctaSecondary.href ?? '#resume'}
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {ctaSecondary.label}
            </a>
          </div>
        </div>

        {/* Right: avatar + floating badges */}
        <div className={`animate-fade-in delay-2 ${styles.visual}`} aria-hidden>
          <div className={styles.avatarFrame}>
            {/* Glow ring */}
            <div className={styles.glowRing} />

            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt={name} className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <span className={styles.avatarInitials}>
                  {name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}

            {/* Floating badges */}
            {badges.slice(0, 6).map((badge, i) => (
              <div
                key={i}
                className={`${styles.badge} ${styles[`badge_${badge.pos?.replace('-', '_') ?? 'top_left'}`]}`}
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden>
        <div className={styles.scrollDot} />
        <span>scroll</span>
      </div>
    </div>
  )
}
