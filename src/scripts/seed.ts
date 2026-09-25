/**
 * Seed script — run once after DB is connected to populate default data.
 *
 * Usage:  npx tsx src/scripts/seed.ts
 * Requires DATABASE_URI and PAYLOAD_SECRET in .env
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })
  console.log('🌱 Seeding database…')

  // ── Tracks ──────────────────────────────────────────────
  const trackData = [
    {
      label:   'Data Science',
      slug:    'data-science',
      emoji:   '🤖',
      tagline: 'Machine learning, analitik data & AI',
      color:   '#38bdf8',
      order:   1,
    },
    {
      label:   'Software Engineer',
      slug:    'software-engineer',
      emoji:   '💻',
      tagline: 'Pengembangan aplikasi & web',
      color:   '#a855f7',
      order:   2,
    },
    {
      label:   'Quality Assurance',
      slug:    'quality-assurance',
      emoji:   '🔍',
      tagline: 'Testing & jaminan kualitas produk',
      color:   '#34d399',
      order:   3,
    },
  ]

  const trackIds: Record<string, string | number> = {}
  for (const t of trackData) {
    const existing = await payload.find({ collection: 'tracks', where: { slug: { equals: t.slug } } })
    if (existing.docs.length === 0) {
      const doc = await payload.create({ collection: 'tracks', data: t })
      trackIds[t.slug] = doc.id
      console.log(`  ✓ Track: ${t.label}`)
    } else {
      trackIds[t.slug] = existing.docs[0].id
      console.log(`  ↩ Track already exists: ${t.label}`)
    }
  }

  // ── Site Settings global ─────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      fullName:  'Ni Komang Ayu Juliana',
      shortName: 'Ayu Juliana',
      tagline:   'Fresh graduate Informatika dengan pengalaman langsung di Software Development, Data Science, Machine Learning, dan AI melalui Apple Developer Academy.',
      contact: {
        email:    'ayujuliani349@gmail.com',
        phone:    '+62 819-3919-7582',
        location: 'Tabanan, Bali',
      },
      social: {
        linkedin: 'https://linkedin.com/in/ayu-juliana',
        github:   'https://github.com/username',
      },
      seo: {
        metaTitle:       'Ayu Juliana — Portfolio',
        metaDescription: 'Portfolio Ni Komang Ayu Juliana — Fresh Graduate Informatika, Apple Developer Academy.',
      },
      landingHeadline: 'Halo, kamu lagi cari Ayu yang mana?',
      landingSubtext:  'Pilih fokus di bawah supaya project dan resume yang tampil sesuai kebutuhanmu.',
      footerText:      '© 2026 Ni Komang Ayu Juliana — dibuat dengan ✦ di antara bintang-bintang.',
    },
  })
  console.log('  ✓ Site Settings global updated')

  // ── Hero Section global ──────────────────────────────────
  await payload.updateGlobal({
    slug: 'hero-section',
    data: {
      greeting: 'halo, aku',
      name:     'Ni Komang Ayu Juliana',
      bio:      'Fresh graduate Informatika dengan pengalaman langsung di Software Development, Data Science, Machine Learning, dan AI melalui Apple Developer Academy.',
      ctaPrimary:   { label: 'Lihat Project', href: '#projects' },
      ctaSecondary: { label: 'Unduh Resume',  href: '#resume' },
      floatingBadges: [
        { text: 'Machine Learning', position: 'top-left' },
        { text: 'React / Next.js',  position: 'top-right' },
        { text: 'Python',           position: 'left' },
        { text: 'Swift / iOS',      position: 'right' },
        { text: 'SQL & Analytics',  position: 'bottom-left' },
        { text: 'QA Automation',    position: 'bottom-right' },
      ],
    },
  })
  console.log('  ✓ Hero Section global updated')

  // ── Navigation global ────────────────────────────────────
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      logoText: 'ayu.juliana',
      links: [
        { label: 'Home',    href: '#home' },
        { label: 'Project', href: '#projects' },
        { label: 'Resume',  href: '#resume' },
        { label: 'Kontak',  href: '#contact' },
      ],
    },
  })
  console.log('  ✓ Navigation global updated')

  console.log('\n✅ Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
