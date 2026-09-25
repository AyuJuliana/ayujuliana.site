import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Tracks } from './collections/Tracks'
import { Projects } from './collections/Projects'
import { Resumes } from './collections/Resumes'
import { ContactMessages } from './collections/ContactMessages'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { HeroSection } from './globals/HeroSection'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Debug: log what we're receiving
const payloadSecret = process.env.PAYLOAD_SECRET || 'fallback-secret-change-me'
console.log('[payload.config.ts] PAYLOAD_SECRET:', payloadSecret ? `present (${payloadSecret.length} chars)` : 'MISSING')
console.log('[payload.config.ts] DATABASE_URI:', process.env.DATABASE_URI ? 'present' : 'MISSING')

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Ayu Juliana CMS',
      favicon: '/favicon.ico',
    },
  },
  collections: [
    Tracks,
    Projects,
    Resumes,
    ContactMessages,
    Media,
    Tags,
    // built-in users collection
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
  globals: [
    SiteSettings,
    HeroSection,
    Navigation,
  ],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'],
})
