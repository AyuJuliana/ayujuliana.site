import { redirect } from 'next/navigation'
import { getAllTracks, getSiteSettings } from '@/lib/payload'
import LandingClient from '@/components/LandingClient'

// This is the track-selector landing page.
// After a user picks a track they're redirected to /?track=<slug>
// but we render the full portfolio in-page using the TrackContext.

export const dynamic = 'force-dynamic'

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>
}) {
  const { track: trackSlug } = await searchParams

  const [tracks, settings] = await Promise.all([
    getAllTracks(),
    getSiteSettings().catch(() => null),
  ])

  return (
    <LandingClient
      tracks={tracks}
      selectedTrackSlug={trackSlug ?? null}
      settings={settings}
    />
  )
}
