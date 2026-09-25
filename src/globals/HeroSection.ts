import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  admin: {
    group: 'Site',
    description: 'Content for the main hero / above-the-fold section.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'greeting',
      type: 'text',
      label: 'Greeting line',
      defaultValue: 'halo, aku',
      admin: { description: 'Small italic line above the name.' },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      defaultValue: 'Ni Komang Ayu Juliana',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio paragraph',
      defaultValue:
        'Fresh graduate Informatika dengan pengalaman langsung di Software Development, Data Science, Machine Learning, dan AI melalui Apple Developer Academy.',
    },
    {
      name: 'ctaPrimary',
      type: 'group',
      label: 'Primary CTA button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Lihat Project' },
        { name: 'href', type: 'text', defaultValue: '#projects' },
      ],
    },
    {
      name: 'ctaSecondary',
      type: 'group',
      label: 'Secondary CTA button',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Unduh Resume' },
        { name: 'href', type: 'text', defaultValue: '#resume' },
      ],
    },
    {
      name: 'floatingBadges',
      type: 'array',
      label: 'Floating skill badges (decorative)',
      fields: [
        { name: 'text', type: 'text', required: true },
        {
          name: 'position',
          type: 'select',
          options: [
            { label: 'Top Left', value: 'top-left' },
            { label: 'Top Right', value: 'top-right' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Right', value: 'bottom-right' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
      ],
      admin: {
        description: 'Small floating chips around the hero illustration.',
      },
    },
    {
      name: 'illustration',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero illustration / avatar',
    },
  ],
}
