import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site',
    description: 'Global site metadata, contact info, and social links.',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Identity ─────────────────────────────────────────────────
    {
      name: 'fullName',
      type: 'text',
      defaultValue: 'Ni Komang Ayu Juliana',
      label: 'Full name',
    },
    {
      name: 'shortName',
      type: 'text',
      defaultValue: 'Ayu Juliana',
      label: 'Short name (used in logo / header)',
    },
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Global tagline / bio',
      defaultValue:
        'Fresh graduate Informatika dengan pengalaman langsung di Software Development, Data Science, Machine Learning, dan AI melalui Apple Developer Academy.',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Avatar / profile photo',
    },

    // ── Contact ───────────────────────────────────────────────────
    {
      name: 'contact',
      type: 'group',
      label: 'Contact info',
      fields: [
        { name: 'email', type: 'email', label: 'Email', defaultValue: 'ayujuliani349@gmail.com' },
        { name: 'phone', type: 'text', label: 'Phone', defaultValue: '+62 819-3919-7582' },
        { name: 'location', type: 'text', label: 'Location', defaultValue: 'Tabanan, Bali' },
      ],
    },

    // ── Social links ──────────────────────────────────────────────
    {
      name: 'social',
      type: 'group',
      label: 'Social links',
      fields: [
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL', defaultValue: 'https://linkedin.com/in/ayu-juliana' },
        { name: 'github', type: 'text', label: 'GitHub URL', defaultValue: 'https://github.com/username' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'twitter', type: 'text', label: 'Twitter / X URL' },
      ],
    },

    // ── SEO ───────────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          defaultValue: 'Ayu Juliana — Portfolio',
          label: 'Meta title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta description',
          defaultValue:
            'Portfolio Ni Komang Ayu Juliana — Fresh Graduate Informatika, Apple Developer Academy.',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'OG image',
        },
      ],
    },

    // ── Landing page ──────────────────────────────────────────────
    {
      name: 'landingHeadline',
      type: 'text',
      label: 'Landing page headline',
      defaultValue: 'Halo, kamu lagi cari Ayu yang mana?',
    },
    {
      name: 'landingSubtext',
      type: 'textarea',
      label: 'Landing page sub-text',
      defaultValue: 'Pilih fokus di bawah supaya project dan resume yang tampil sesuai kebutuhanmu.',
    },

    // ── Footer ────────────────────────────────────────────────────
    {
      name: 'footerText',
      type: 'text',
      label: 'Footer copyright text',
      defaultValue: '© 2026 Ni Komang Ayu Juliana — dibuat dengan ✦ di antara bintang-bintang.',
    },
  ],
}
