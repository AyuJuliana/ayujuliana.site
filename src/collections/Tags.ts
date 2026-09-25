import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    description: 'Technology / skill tags used on projects.',
    defaultColumns: ['name', 'color'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tag name (e.g. Python, React, TensorFlow)',
    },
    {
      name: 'color',
      type: 'text',
      label: 'Pill background color (CSS hex)',
      admin: {
        description: 'Optional. Defaults to the track accent color if empty.',
      },
    },
  ],
  timestamps: true,
}
