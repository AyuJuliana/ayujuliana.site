'use client'

import { useEffect, useState } from 'react'
import type { Track, Project, Tag } from '@/types/payload'
import { getMediaUrl } from '@/lib/utils'
import ProjectModal from './ProjectModal'
import styles from './ProjectsSection.module.css'

interface Props { track: Track }

export default function ProjectsSection({ track }: Props) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState<Project | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/projects?where[tracks][in]=${track.id}&depth=2&sort=-featured,order&limit=50`)
      .then((r) => r.json())
      .then((d) => setProjects(d.docs ?? []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [track.id])

  return (
    <div className={`section ${styles.root}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">karya</span>
          <h2 className={styles.title}>Project Terpilih</h2>
          <p className={styles.subtitle}>
            Semua project di bawah relevan untuk track <strong>{track.label}</strong>.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className={styles.loadingGrid}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`${styles.skeleton} card`} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>✦</span>
            <p>Project untuk track ini akan segera hadir.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

/* ── Project Card ────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const coverUrl = getMediaUrl(
    typeof project.coverImage === 'object' && project.coverImage
      ? (project.coverImage as any).sizes?.card ?? project.coverImage
      : null,
  )

  const tags = (project.tags ?? []).filter(
    (t): t is Tag => typeof t === 'object' && 'name' in t,
  )

  return (
    <button
      className={`card ${styles.card} ${project.featured ? styles.featured : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={onClick}
      aria-label={`Lihat project ${project.title}`}
    >
      {/* Cover image */}
      <div className={styles.cover}>
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverUrl} alt={project.title} className={styles.coverImg} />
        ) : (
          <div className={styles.coverPlaceholder}>
            <span>✦</span>
          </div>
        )}
        {project.featured && (
          <div className={styles.featuredBadge}>✦ Featured</div>
        )}
        {project.status === 'in-progress' && (
          <div className={styles.wipBadge}>In Progress</div>
        )}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.meta}>
          {project.year && <span className={styles.year}>{project.year}</span>}
          {project.role && <span className={styles.role}>{project.role}</span>}
        </div>

        <h3 className={styles.cardTitle}>{project.title}</h3>

        {project.shortDescription && (
          <p className={styles.cardDesc}>{project.shortDescription}</p>
        )}

        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.slice(0, 4).map((tag) => (
              <span key={tag.id} className="tag" style={tag.color ? { '--track-accent': tag.color } as React.CSSProperties : undefined}>
                {tag.name}
              </span>
            ))}
            {tags.length > 4 && (
              <span className={styles.moreTags}>+{tags.length - 4}</span>
            )}
          </div>
        )}

        <span className={styles.readMore} aria-hidden>Lihat detail →</span>
      </div>
    </button>
  )
}
