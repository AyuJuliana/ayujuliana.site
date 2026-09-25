import type { CollectionConfig } from 'payload'

export const Resumes: CollectionConfig = {
  slug: 'resumes',
  admin: {
    useAsTitle: 'title',
    description: 'Resume / CV files — one per track. Users download the one matching their selected track.',
    defaultColumns: ['title', 'track', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Resume title',
      admin: {
        description: 'e.g. "Data Science Resume — Ayu Juliana"',
      },
    },
    {
      name: 'track',
      type: 'relationship',
      relationTo: 'tracks',
      required: true,
      label: 'Track',
      admin: {
        description: 'Which track this resume is for.',
      },
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'PDF file',
    },
    {
      name: 'version',
      type: 'text',
      label: 'Version / date label',
      admin: {
        description: 'e.g. "September 2026". Shown as a badge in the admin.',
      },
    },

    // ── Structured CV data (for future web-rendered CV) ──────────
    {
      name: 'education',
      type: 'array',
      label: 'Education',
      fields: [
        {
          name: 'institution',
          type: 'text',
          required: true,
        },
        {
          name: 'degree',
          type: 'text',
          required: true,
        },
        {
          name: 'major',
          type: 'text',
        },
        {
          name: 'startYear',
          type: 'number',
        },
        {
          name: 'endYear',
          type: 'number',
          admin: { description: 'Leave empty if currently enrolled.' },
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'experience',
      type: 'array',
      label: 'Work Experience',
      fields: [
        {
          name: 'company',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'startDate',
          type: 'text',
          label: 'Start date (e.g. Jan 2024)',
        },
        {
          name: 'endDate',
          type: 'text',
          label: 'End date (leave empty for current)',
        },
        {
          name: 'location',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'highlights',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Skills',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Category (e.g. Languages, Frameworks)',
        },
        {
          name: 'items',
          type: 'text',
          label: 'Comma-separated skill list',
          required: true,
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Certifications & Awards',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
        },
        {
          name: 'date',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Credential URL',
        },
      ],
    },
  ],
  timestamps: true,
}
