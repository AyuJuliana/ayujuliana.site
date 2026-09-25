import type { CollectionConfig } from 'payload'

export const Tracks: CollectionConfig = {
  slug: 'tracks',
  admin: {
    useAsTitle: 'label',
    description: 'Career focus tracks shown on the landing selector page.',
    defaultColumns: ['label', 'slug', 'emoji', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Label (e.g. Data Science)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (e.g. data-science)',
      admin: {
        description: 'Used in URL params and CSS class names. Lowercase, hyphenated.',
      },
    },
    {
      name: 'emoji',
      type: 'text',
      label: 'Emoji icon',
      admin: {
        description: 'Single emoji shown next to the track label.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Short tagline',
      admin: {
        description: 'Shown below the label in the track selector card.',
      },
    },
    {
      name: 'color',
      type: 'text',
      label: 'Accent color (CSS hex or var)',
      admin: {
        description: 'e.g. #c084fc — used for glows and highlights for this track.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sort order on the selector screen.',
      },
    },
  ],
  timestamps: true,
}
