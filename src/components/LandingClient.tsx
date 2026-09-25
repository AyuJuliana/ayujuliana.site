'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import TrackSelector from './TrackSelector'
import PortfolioShell from './PortfolioShell'
import StarsBackground from './StarsBackground'
import type { Track, SiteSettings } from '@/types/payload'

interface Props {
  tracks: Track[]
  selectedTrackSlug: string | null
  settings: SiteSettings | null
}

export default function LandingClient({ tracks, selectedTrackSlug, settings }: Props) {
  const router = useRouter()
  const [activeTrack, setActiveTrack] = useState<Track | null>(
    selectedTrackSlug
      ? (tracks.find((t) => t.slug === selectedTrackSlug) ?? null)
      : null,
  )

  // Apply track accent color to <html>
  useEffect(() => {
    const html = document.documentElement
    if (activeTrack?.slug) {
      html.setAttribute('data-track', activeTrack.slug)
    } else {
      html.removeAttribute('data-track')
    }
  }, [activeTrack])

  // Sync URL
  useEffect(() => {
    if (activeTrack) {
      const url = new URL(window.location.href)
      url.searchParams.set('track', activeTrack.slug)
      router.replace(url.pathname + url.search, { scroll: false })
    }
  }, [activeTrack, router])

  function handleSelectTrack(track: Track) {
    setActiveTrack(track)
  }

  function handleChangeTrack() {
    setActiveTrack(null)
    router.replace('/', { scroll: false })
  }

  if (!activeTrack) {
    return (
      <>
        <StarsBackground />
        <TrackSelector
          tracks={tracks}
          settings={settings}
          onSelect={handleSelectTrack}
        />
      </>
    )
  }

  return (
    <>
      <StarsBackground />
      <PortfolioShell
        track={activeTrack}
        tracks={tracks}
        settings={settings}
        onChangeTrack={handleChangeTrack}
      />
    </>
  )
}
