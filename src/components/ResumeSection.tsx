'use client'

import { useEffect, useState } from 'react'
import type { Track, Resume, EducationEntry, ExperienceEntry, SkillCategory, Certification } from '@/types/payload'
import { getMediaUrl, yearRange } from '@/lib/utils'
import styles from './ResumeSection.module.css'

interface Props { track: Track }

export default function ResumeSection({ track }: Props) {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'skills' | 'certifications'>('experience')

  useEffect(() => {
    setLoading(true)
    fetch(`/api/resumes?where[track][equals]=${track.id}&depth=1&limit=1`)
      .then((r) => r.json())
      .then((d) => setResume(d.docs?.[0] ?? null))
      .catch(() => setResume(null))
      .finally(() => setLoading(false))
  }, [track.id])

  const pdfUrl = resume?.pdfFile ? getMediaUrl(resume.pdfFile) : null

  const tabs = [
    { key: 'experience',     label: 'Pengalaman',     show: (resume?.experience?.length ?? 0) > 0 },
    { key: 'education',      label: 'Pendidikan',     show: (resume?.education?.length ?? 0) > 0 },
    { key: 'skills',         label: 'Skills',         show: (resume?.skills?.length ?? 0) > 0 },
    { key: 'certifications', label: 'Sertifikasi',    show: (resume?.certifications?.length ?? 0) > 0 },
  ].filter((t) => t.show) as { key: typeof activeTab; label: string; show: boolean }[]

  return (
    <div className={`section ${styles.root}`}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className="section-label">cv</span>
          <h2 className={styles.title}>Resume</h2>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner} aria-label="Loading..." />
          </div>
        ) : !resume ? (
          <div className={styles.placeholder}>
            <div className={styles.placeholderCard}>
              <div className={styles.placeholderIcon}>✦</div>
              <h3>Siap kolaborasi ✦</h3>
              <p>Unduh resume yang disesuaikan dengan fokus karier yang kamu pilih.</p>
              <p className={styles.placeholderNote}>
                Resume untuk track <strong>{track.label}</strong> akan segera hadir.
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.inner}>
            {/* Download card */}
            <div className={`card ${styles.downloadCard}`}>
              <div className={styles.downloadTop}>
                <div>
                  <div className={styles.downloadLabel}>Resume — {track.label}</div>
                  <div className={styles.downloadTitle}>{resume.title}</div>
                  {resume.version && (
                    <div className={styles.downloadVersion}>Versi: {resume.version}</div>
                  )}
                </div>
                <div className={styles.pdfIcon} aria-hidden>📄</div>
              </div>
              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  download
                  className={`btn btn-primary ${styles.downloadBtn}`}
                  aria-label={`Unduh resume ${resume.title}`}
                >
                  ↓ Unduh PDF
                </a>
              ) : (
                <div className={styles.pdfPlaceholder}>
                  File PDF belum tersedia — segera hadir setelah CV dikirim.
                </div>
              )}
            </div>

            {/* Structured CV tabs */}
            {tabs.length > 0 && (
              <div className={styles.cvSection}>
                {/* Tab bar */}
                <div className={styles.tabs} role="tablist">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      role="tab"
                      aria-selected={activeTab === tab.key}
                      className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab panels */}
                <div role="tabpanel" className={styles.tabPanel}>
                  {activeTab === 'experience' && (
                    <ExperienceTab items={resume.experience ?? []} />
                  )}
                  {activeTab === 'education' && (
                    <EducationTab items={resume.education ?? []} />
                  )}
                  {activeTab === 'skills' && (
                    <SkillsTab items={resume.skills ?? []} />
                  )}
                  {activeTab === 'certifications' && (
                    <CertificationsTab items={resume.certifications ?? []} />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Tab components ─────────────────────────────────────── */

function ExperienceTab({ items }: { items: ExperienceEntry[] }) {
  return (
    <div className={styles.timeline}>
      {items.map((item, i) => (
        <div key={i} className={styles.timelineItem}>
          <div className={styles.timelineDot} />
          <div className={styles.timelineContent}>
            <div className={styles.timelineMeta}>
              <span className={styles.timelineDate}>
                {item.startDate}{item.endDate ? ` – ${item.endDate}` : ' – sekarang'}
              </span>
              {item.location && <span className={styles.timelineLocation}>{item.location}</span>}
            </div>
            <div className={styles.timelineRole}>{item.role}</div>
            <div className={styles.timelineCompany}>{item.company}</div>
            {item.highlights && item.highlights.length > 0 && (
              <ul className={styles.highlightList}>
                {item.highlights.map((h, j) => (
                  <li key={j}><span aria-hidden>✦</span> {h.text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function EducationTab({ items }: { items: EducationEntry[] }) {
  return (
    <div className={styles.timeline}>
      {items.map((item, i) => (
        <div key={i} className={styles.timelineItem}>
          <div className={styles.timelineDot} />
          <div className={styles.timelineContent}>
            <div className={styles.timelineMeta}>
              <span className={styles.timelineDate}>
                {yearRange(item.startYear, item.endYear)}
              </span>
            </div>
            <div className={styles.timelineRole}>{item.degree}{item.major ? ` — ${item.major}` : ''}</div>
            <div className={styles.timelineCompany}>{item.institution}</div>
            {item.description && <p className={styles.timelineDesc}>{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

function SkillsTab({ items }: { items: SkillCategory[] }) {
  return (
    <div className={styles.skillsGrid}>
      {items.map((cat, i) => (
        <div key={i} className={styles.skillCategory}>
          <div className={styles.skillCatLabel}>{cat.category}</div>
          <div className={styles.skillTags}>
            {cat.items.split(',').map((s) => s.trim()).filter(Boolean).map((skill) => (
              <span key={skill} className="tag">{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CertificationsTab({ items }: { items: Certification[] }) {
  return (
    <div className={styles.certGrid}>
      {items.map((cert, i) => (
        <a
          key={i}
          href={cert.url ?? undefined}
          target={cert.url ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`${styles.certCard} ${!cert.url ? styles.certNoLink : ''}`}
        >
          <div className={styles.certName}>{cert.name}</div>
          {cert.issuer && <div className={styles.certIssuer}>{cert.issuer}</div>}
          {cert.date   && <div className={styles.certDate}>{cert.date}</div>}
          {cert.url    && <span className={styles.certLink} aria-label="Lihat kredensial">↗</span>}
        </a>
      ))}
    </div>
  )
}
