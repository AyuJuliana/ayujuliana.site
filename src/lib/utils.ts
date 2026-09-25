/** Merge class names (tiny clsx-like helper, no extra dep needed) */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** Get a media URL from a Payload upload field */
export function getMediaUrl(
  media: { url?: string | null } | string | number | null | undefined,
  fallback = '',
): string {
  if (!media) return fallback
  if (typeof media === 'string') return media
  if (typeof media === 'object' && 'url' in media) return media.url ?? fallback
  return fallback
}

/** Format a year range */
export function yearRange(start?: number | null, end?: number | null): string {
  if (!start) return ''
  if (!end) return `${start} – sekarang`
  return `${start} – ${end}`
}

/** Truncate text to n chars */
export function truncate(text: string, n: number): string {
  if (text.length <= n) return text
  return text.slice(0, n).trimEnd() + '…'
}
