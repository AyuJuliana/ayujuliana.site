import type { SiteSettings } from '@/types/payload'
import styles from './Footer.module.css'

interface Props { settings: SiteSettings | null }

export default function Footer({ settings }: Props) {
  const text = settings?.footerText
    ?? '© 2026 Ni Komang Ayu Juliana — dibuat dengan ✦ di antara bintang-bintang.'

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <hr className="divider" style={{ margin: 0 }} />
        <p className={styles.text}>{text}</p>
      </div>
    </footer>
  )
}
