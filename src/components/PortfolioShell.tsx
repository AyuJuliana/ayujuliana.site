'use client'

import { useState, useEffect, useRef } from 'react'
import type { Track, SiteSettings } from '@/types/payload'
import SiteNav from './SiteNav'
import HeroSection from './HeroSection'
import ProjectsSection from './ProjectsSection'
import ResumeSection from './ResumeSection'
import ContactSection from './ContactSection'
import Footer from './Footer'

interface Props {
  track: Track
  tracks: Track[]
  settings: SiteSettings | null
  onChangeTrack: () => void
}

export default function PortfolioShell({ track, tracks, settings, onChangeTrack }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Intersection observer for active nav link
  useEffect(() => {
    const sections = ['home', 'projects', 'resume', 'contact']
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <SiteNav
        track={track}
        tracks={tracks}
        scrolled={scrolled}
        activeSection={activeSection}
        onChangeTrack={onChangeTrack}
        settings={settings}
      />

      <main>
        <section id="home">
          <HeroSection track={track} settings={settings} />
        </section>

        <section id="projects">
          <ProjectsSection track={track} />
        </section>

        <section id="resume">
          <ResumeSection track={track} />
        </section>

        <section id="contact">
          <ContactSection track={track} settings={settings} />
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  )
}
