import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import type { Metadata } from 'next'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  return generatePageMetadata({ config: import('@payload-config').then((m) => m.default), params: resolvedParams, searchParams: resolvedSearchParams })
}

export default async function Page({ params, searchParams }: Args) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  return RootPage({ config: import('@payload-config').then((m) => m.default), importMap, params: resolvedParams, searchParams: resolvedSearchParams })
}
