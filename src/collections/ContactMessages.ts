import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'senderName',
    description: 'Inbound messages submitted via the contact form.',
    defaultColumns: ['senderName', 'senderEmail', 'subject', 'read', 'createdAt'],
  },
  access: {
    // Only admins can read/delete messages
    read: ({ req }) => Boolean(req.user),
    create: () => true, // public can submit
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'senderName',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'senderEmail',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Subject',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'track',
      type: 'relationship',
      relationTo: 'tracks',
      label: 'Track context',
      admin: {
        description: 'Which track was active when the user submitted the form.',
      },
    },
    {
      name: 'read',
      type: 'checkbox',
      defaultValue: false,
      label: 'Marked as read',
    },
  ],
  timestamps: true,
}
