import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    description: 'Portfolio projects — shown in the "Karya" section, filterable by track.',
    defaultColumns: ['title', 'track', 'featured', 'status', 'year'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Core info ────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
      admin: {
        description: 'Auto-generate from title, or fill manually.',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short description',
      admin: {
        description: 'Shown on the project card (max ~120 chars).',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Full description',
      admin: {
        description: 'Shown inside the project modal / detail drawer.',
      },
    },

    // ── Track & tags ─────────────────────────────────────────────
    {
      name: 'tracks',
      type: 'relationship',
      relationTo: 'tracks',
      hasMany: true,
      required: true,
      label: 'Tracks',
      admin: {
        description: 'Which career tracks this project belongs to.',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Tech / skill tags',
    },

    // ── Media ────────────────────────────────────────────────────
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover image',
      admin: {
        description: 'Used as the project card thumbnail.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },

    // ── Links ────────────────────────────────────────────────────
    {
      name: 'links',
      type: 'group',
      label: 'Links',
      fields: [
        {
          name: 'github',
          type: 'text',
          label: 'GitHub URL',
        },
        {
          name: 'live',
          type: 'text',
          label: 'Live demo URL',
        },
        {
          name: 'caseStudy',
          type: 'text',
          label: 'Case study / write-up URL',
        },
      ],
    },

    // ── Metadata ─────────────────────────────────────────────────
    {
      name: 'year',
      type: 'number',
      label: 'Year',
      admin: {
        description: 'Year the project was completed.',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'completed',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured project',
      defaultValue: false,
      admin: {
        description: 'Featured projects are shown first and with a larger card.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Display order',
      admin: {
        description: 'Lower numbers appear first within the same track.',
      },
    },
    {
      name: 'role',
      type: 'text',
      label: 'Your role on this project',
      admin: {
        description: 'e.g. "ML Engineer", "Full-stack Dev", "QA Lead"',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      label: 'Key highlights / achievements',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}
