import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export default async function NotFound({ params, searchParams }: Args) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  return NotFoundPage({
    config: import('@payload-config').then((m) => m.default),
    importMap,
    params: Promise.resolve(resolvedParams),
    searchParams: Promise.resolve(resolvedSearchParams),
  })
}
