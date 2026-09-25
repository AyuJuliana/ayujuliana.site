import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Site',
    description: 'Main navigation links shown in the header.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      label: 'Logo text',
      defaultValue: 'ayu.juliana',
    },
    {
      name: 'links',
      type: 'array',
      label: 'Nav links',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Anchor or URL',
          admin: { description: 'e.g. #projects or /projects' },
        },
        {
          name: 'visibleOnTracks',
          type: 'relationship',
          relationTo: 'tracks',
          hasMany: true,
          label: 'Only show on these tracks',
          admin: {
            description: 'Leave empty to show on all tracks.',
          },
        },
      ],
      defaultValue: [
        { label: 'Home', href: '#home' },
        { label: 'Project', href: '#projects' },
        { label: 'Resume', href: '#resume' },
        { label: 'Kontak', href: '#contact' },
      ],
    },
  ],
}
