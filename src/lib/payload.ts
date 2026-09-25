/**
 * Server-side Payload data helpers.
 * These run only in Server Components / Route Handlers.
 */
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function getPayloadClient() {
  const config = await configPromise
  return getPayload({ config })
}

// ── Tracks ────────────────────────────────────────────────────────────────────
export async function getAllTracks() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'tracks',
    sort: 'order',
    limit: 20,
  })
  return result.docs
}

export async function getTrackBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'tracks',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

// ── Projects ─────────────────────────────────────────────────────────────────
export async function getProjectsByTrack(trackId: string | number) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: {
      tracks: { in: [trackId] },
    },
    sort: '-featured,order',
    depth: 2,
    limit: 50,
  })
  return result.docs
}

export async function getAllProjects() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    sort: '-featured,order',
    depth: 2,
    limit: 100,
  })
  return result.docs
}

export async function getProjectBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return result.docs[0] ?? null
}

// ── Resumes ───────────────────────────────────────────────────────────────────
export async function getResumeByTrack(trackId: string | number) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'resumes',
    where: { track: { equals: trackId } },
    depth: 1,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function getAllResumes() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'resumes',
    depth: 1,
    limit: 10,
  })
  return result.docs
}

// ── Globals ───────────────────────────────────────────────────────────────────
export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
}

export async function getHeroSection() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'hero-section', depth: 1 })
}

export async function getNavigation() {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation', depth: 1 })
}

// ── Contact ───────────────────────────────────────────────────────────────────
export async function submitContactMessage(data: {
  senderName: string
  senderEmail: string
  subject?: string
  message: string
  trackId?: string
}) {
  const payload = await getPayloadClient()
  return payload.create({
    collection: 'contact-messages',
    data: {
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      subject: data.subject,
      message: data.message,
      track: data.trackId,
    },
  })
}
