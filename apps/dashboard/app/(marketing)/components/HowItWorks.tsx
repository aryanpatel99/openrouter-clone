'use client'

import { useEffect, useRef } from 'react'
import { Key, Zap, Rocket } from 'lucide-react'
import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '01',
    icon: <Key size={24} />,
    title: 'Get Your API Key',
    body: 'Create a free account and grab your key instantly. No credit card required.',
  },
  {
    num: '02',
    icon: <Zap size={24} />,
    title: 'Choose Your Model',
    body: 'Browse 300+ models. Filter by speed, cost, context window, and capability. Switch any time.',
  },
  {
    num: '03',
    icon: <Rocket size={24} />,
    title: 'Ship It',
    body: 'Point your existing OpenAI SDK to our endpoint. One line change. Fully compatible.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.revealCard')
    if (!cards) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="how-it-works" className={styles.section} ref={sectionRef} aria-label="How it works">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>How It Works</p>
          <h2 className={styles.title}>From Zero to Production in Minutes</h2>
          <p className={styles.subtitle}>Three steps. No friction. No rewrites.</p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`${styles.card} revealCard`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
