'use client'

import { useEffect, useRef } from 'react'
import type { Project, Tag } from '@/types/payload'
import { getMediaUrl } from '@/lib/utils'
import styles from './ProjectModal.module.css'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Trap focus
  useEffect(() => { panelRef.current?.focus() }, [])

  const coverUrl = getMediaUrl(
    typeof project.coverImage === 'object' && project.coverImage
      ? (project.coverImage as any).sizes?.hero ?? project.coverImage
      : null,
  )

  const tags = (project.tags ?? []).filter(
    (t): t is Tag => typeof t === 'object' && 'name' in t,
  )

  const { github, live, caseStudy } = project.links ?? {}

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        ref={panelRef}
        className={`modal-panel ${styles.panel}`}
        tabIndex={-1}
      >
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Tutup modal">✕</button>

        {/* Hero image */}
        {coverUrl && (
          <div className={styles.cover}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverUrl} alt={project.title} className={styles.coverImg} />
            <div className={styles.coverOverlay} />
          </div>
        )}

        <div className={styles.body}>
          {/* Meta row */}
          <div className={styles.metaRow}>
            {project.year && <span className={styles.year}>{project.year}</span>}
            {project.role && <span className={styles.role}>{project.role}</span>}
            {project.status && (
              <span className={`${styles.status} ${styles[`status_${project.status}`]}`}>
                {project.status === 'completed' ? '✓ Selesai' : project.status === 'in-progress' ? '⟳ In Progress' : 'Arsip'}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className={styles.title}>{project.title}</h2>

          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag.id} className="tag" style={tag.color ? { '--track-accent': tag.color } as React.CSSProperties : undefined}>
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {project.shortDescription && (
            <p className={styles.shortDesc}>{project.shortDescription}</p>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className={styles.highlights}>
              <h4 className={styles.sectionHeading}>Highlights</h4>
              <ul className={styles.highlightList}>
                {project.highlights.map((h, i) => (
                  <li key={i} className={styles.highlightItem}>
                    <span className={styles.highlightDot} aria-hidden>✦</span>
                    {h.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className={styles.gallery}>
              <h4 className={styles.sectionHeading}>Gallery</h4>
              <div className={styles.galleryGrid}>
                {project.gallery.map((item, i) => {
                  const imgUrl = getMediaUrl(
                    typeof item.image === 'object' ? (item.image as any).sizes?.card ?? item.image : null,
                  )
                  return imgUrl ? (
                    <figure key={i} className={styles.galleryItem}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imgUrl} alt={item.caption ?? `Gallery ${i + 1}`} />
                      {item.caption && <figcaption>{item.caption}</figcaption>}
                    </figure>
                  ) : null
                })}
              </div>
            </div>
          )}

          {/* Links */}
          {(github || live || caseStudy) && (
            <div className={styles.links}>
              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  🔗 Live Demo
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <GitHubIcon /> GitHub
                </a>
              )}
              {caseStudy && (
                <a href={caseStudy} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  📄 Case Study
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
