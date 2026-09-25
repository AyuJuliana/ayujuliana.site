import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/payload'
import { getMediaUrl } from '@/lib/utils'
import '../globals.css'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings: any = await getSiteSettings()
    return {
      title: settings.seo?.metaTitle ?? 'Ayu Juliana — Portfolio',
      description: settings.seo?.metaDescription ?? 'Portfolio Ni Komang Ayu Juliana',
      openGraph: {
        title: settings.seo?.metaTitle ?? 'Ayu Juliana — Portfolio',
        description: settings.seo?.metaDescription ?? '',
        images: settings.seo?.ogImage
          ? [{ url: getMediaUrl(settings.seo.ogImage) }]
          : [],
      },
    }
  } catch {
    return {
      title: 'Ayu Juliana — Portfolio',
    }
  }
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return children
}
