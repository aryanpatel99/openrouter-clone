'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Zap, Gift, Brain } from 'lucide-react'
import styles from './ModelGrid.module.css'

interface Model {
  name: string
  provider: string
  badgeColor: string
  initials: string
  context: string
  price: string
  speed: string
  speedType: 'fast' | 'free' | 'reasoning'
}

const models: Model[] = [
  {
    name: 'GPT-4.1',
    provider: 'OpenAI',
    badgeColor: '#10a37f',
    initials: 'OA',
    context: '1M ctx',
    price: '$2.00/1M',
    speed: 'Fast',
    speedType: 'fast',
  },
  {
    name: 'Claude Sonnet 4.6',
    provider: 'Anthropic',
    badgeColor: '#cc785c',
    initials: 'AN',
    context: '200K ctx',
    price: '$3.00/1M',
    speed: 'Fast',
    speedType: 'fast',
  },
  {
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    badgeColor: '#4285f4',
    initials: 'GO',
    context: '1M ctx',
    price: '$0.10/1M',
    speed: 'Blazing',
    speedType: 'fast',
  },
  {
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    badgeColor: '#0064e0',
    initials: 'ME',
    context: '128K ctx',
    price: '$0.09/1M',
    speed: 'Free Tier',
    speedType: 'free',
  },
  {
    name: 'Mistral Large',
    provider: 'Mistral',
    badgeColor: '#ff7000',
    initials: 'MI',
    context: '128K ctx',
    price: '$2.00/1M',
    speed: 'Fast',
    speedType: 'fast',
  },
  {
    name: 'Qwen3 235B',
    provider: 'Alibaba',
    badgeColor: '#6366f1',
    initials: 'QW',
    context: '256K ctx',
    price: '$0.14/1M',
    speed: 'Reasoning',
    speedType: 'reasoning',
  },
]

export default function ModelGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.modelCard')
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
      { threshold: 0.1 }
    )
    cards.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const renderSpeedIcon = (type: Model['speedType']) => {
    switch (type) {
      case 'fast':      return <Zap size={14} className={styles.speedIcon} />
      case 'free':      return <Gift size={14} className={styles.speedIcon} />
      case 'reasoning': return <Brain size={14} className={styles.speedIcon} />
      default:          return null
    }
  }

  return (
    <section id="models" className={styles.section} ref={sectionRef} aria-label="Model library">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>The Model Library</p>
          <h2 className={styles.title}>300+ Models. Zero Switching Cost.</h2>
          <p className={styles.subtitle}>Same API call. Different model. That&rsquo;s it.</p>
        </div>

        <div className={styles.grid}>
          {models.map((model, i) => (
            <div
              key={model.name}
              className={`${styles.card} modelCard`}
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            >
              <div className={styles.cardTop}>
                <div
                  className={styles.badge}
                  style={{ background: model.badgeColor }}
                >
                  {model.initials}
                </div>
                <div className={styles.modelName}>{model.name}</div>
              </div>
              <div className={styles.provider}>{model.provider}</div>
              <div className={styles.divider} />
              <div className={styles.footer}>
                <div className={styles.footerLeft}>
                  <span className={styles.ctxPill}>{model.context}</span>
                  <span className={styles.speedPill}>
                    {renderSpeedIcon(model.speedType)}
                    {model.speed}
                  </span>
                </div>
                <span className={styles.price}>{model.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/models" className={styles.btnGhost}>
            View All 300+ Models →
          </Link>
        </div>
      </div>
    </section>
  )
}
