'use client'

import { useState } from 'react'
import type { Track, SiteSettings } from '@/types/payload'
import styles from './TrackSelector.module.css'

interface Props {
  tracks: Track[]
  settings: SiteSettings | null
  onSelect: (track: Track) => void
}

const DEFAULT_TRACKS: Track[] = [
  { id: 'ds', label: 'Data Science', slug: 'data-science', emoji: '🤖', tagline: 'Machine learning, analitik data & AI', color: '#38bdf8' },
  { id: 'se', label: 'Software Engineer', slug: 'software-engineer', emoji: '💻', tagline: 'Pengembangan aplikasi & web', color: '#a855f7' },
  { id: 'qa', label: 'Quality Assurance', slug: 'quality-assurance', emoji: '🔍', tagline: 'Testing & jaminan kualitas produk', color: '#34d399' },
]

export default function TrackSelector({ tracks, settings, onSelect }: Props) {
  const displayTracks = tracks.length > 0 ? tracks : DEFAULT_TRACKS
  const [hovered, setHovered] = useState<string | null>(null)

  const headline = settings?.landingHeadline ?? 'Halo, kamu lagi cari Ayu yang mana?'
  const subtext = settings?.landingSubtext ?? 'Pilih fokus di bawah supaya project dan resume yang tampil sesuai kebutuhanmu.'

  return (
    <div className={styles.root}>
      {/* Decorative orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.inner}>
        {/* Sparkle icon */}
        <div className={styles.sparkle} aria-hidden>✦</div>

        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.subtext}>{subtext}</p>

        <div className={styles.grid}>
          {displayTracks.map((track, i) => (
            <button
              key={track.id}
              className={`${styles.card} ${hovered === String(track.id) ? styles.cardHovered : ''}`}
              style={{
                '--card-accent': track.color ?? 'var(--accent-violet)',
                animationDelay: `${i * 100}ms`,
              } as React.CSSProperties}
              onMouseEnter={() => setHovered(String(track.id))}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(track)}
              aria-label={`Pilih track ${track.label}`}
            >
              {/* Glow ring */}
              <div className={styles.cardGlow} />

              {/* Corner star */}
              <span className={styles.cornerStar} aria-hidden>✦</span>

              <div className={styles.cardEmoji}>{track.emoji ?? '✦'}</div>
              <div className={styles.cardLabel}>{track.label}</div>
              <div className={styles.cardTagline}>{track.tagline}</div>

              <div className={styles.cardArrow} aria-hidden>→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
