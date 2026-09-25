'use client'

import { useEffect, useRef } from 'react'

export default function StarsBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const fragment = document.createDocumentFragment()
    const count = 120

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      const size = Math.random() * 2.5 + 0.5
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        --dur: ${Math.random() * 4 + 2}s;
        --delay: ${Math.random() * 6}s;
        --max-opacity: ${Math.random() * 0.6 + 0.2};
      `
      fragment.appendChild(star)
    }

    container.appendChild(fragment)
    return () => { container.innerHTML = '' }
  }, [])

  return <div ref={containerRef} className="stars-bg" aria-hidden />
}
