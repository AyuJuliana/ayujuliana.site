/**
 * Lightweight hand-written types that match the Payload collections.
 * Once you run `payload generate:types`, replace these with the
 * auto-generated types from src/payload-types.ts
 */

export interface MediaFile {
  id: string | number
  url?: string | null
  alt?: string | null
  caption?: string | null
  filename?: string | null
  sizes?: {
    thumbnail?: { url?: string | null }
    card?: { url?: string | null }
    hero?: { url?: string | null }
  }
}

export interface Track {
  id: string | number
  label: string
  slug: string
  emoji?: string | null
  tagline?: string | null
  color?: string | null
  order?: number | null
}

export interface Tag {
  id: string | number
  name: string
  color?: string | null
}

export interface ProjectLink {
  github?: string | null
  live?: string | null
  caseStudy?: string | null
}

export interface ProjectHighlight {
  text: string
}

export interface GalleryItem {
  image: MediaFile | string | number
  caption?: string | null
}

export interface Project {
  id: string | number
  title: string
  slug: string
  shortDescription?: string | null
  description?: unknown // Lexical rich text
  tracks: (Track | string | number)[]
  tags?: (Tag | string | number)[]
  coverImage?: MediaFile | string | number | null
  gallery?: GalleryItem[]
  links?: ProjectLink
  year?: number | null
  status?: 'completed' | 'in-progress' | 'archived'
  featured?: boolean
  order?: number
  role?: string | null
  highlights?: ProjectHighlight[]
  createdAt?: string
  updatedAt?: string
}

export interface EducationEntry {
  institution: string
  degree: string
  major?: string | null
  startYear?: number | null
  endYear?: number | null
  description?: string | null
}

export interface ExperienceEntry {
  company: string
  role: string
  startDate?: string | null
  endDate?: string | null
  location?: string | null
  description?: unknown
  highlights?: { text: string }[]
}

export interface SkillCategory {
  category: string
  items: string
}

export interface Certification {
  name: string
  issuer?: string | null
  date?: string | null
  url?: string | null
}

export interface Resume {
  id: string | number
  title: string
  track: Track | string | number
  pdfFile: MediaFile | string | number
  version?: string | null
  education?: EducationEntry[]
  experience?: ExperienceEntry[]
  skills?: SkillCategory[]
  certifications?: Certification[]
}

export interface ContactInfo {
  email?: string | null
  phone?: string | null
  location?: string | null
}

export interface SocialLinks {
  linkedin?: string | null
  github?: string | null
  instagram?: string | null
  twitter?: string | null
}

export interface SEOSettings {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: MediaFile | string | number | null
}

export interface SiteSettings {
  fullName?: string | null
  shortName?: string | null
  tagline?: string | null
  avatar?: MediaFile | string | number | null
  contact?: ContactInfo
  social?: SocialLinks
  seo?: SEOSettings
  landingHeadline?: string | null
  landingSubtext?: string | null
  footerText?: string | null
}

export interface HeroSection {
  greeting?: string | null
  name?: string | null
  bio?: string | null
  ctaPrimary?: { label?: string | null; href?: string | null }
  ctaSecondary?: { label?: string | null; href?: string | null }
  floatingBadges?: { text: string; position?: string | null }[]
  illustration?: MediaFile | string | number | null
}

export interface NavLink {
  label: string
  href: string
  visibleOnTracks?: (Track | string | number)[]
}

export interface Navigation {
  logoText?: string | null
  links?: NavLink[]
}
