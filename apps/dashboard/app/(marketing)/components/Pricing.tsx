'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Pricing.module.css'

const freePlan = {
  tier: 'Free',
  price: '$0',
  priceSuffix: '/mo',
  desc: 'Perfect to get started',
  features: [
    'Access to free-tier models',
    '10 requests per minute',
    'Community support',
    'Basic analytics dashboard',
  ],
  cta: 'Get Started',
  ctaHref: '/login',
  popular: false,
}

const proPlan = {
  tier: 'Pro',
  price: 'Pay as you go',
  priceSuffix: '',
  desc: 'For serious builders',
  features: [
    'All 300+ models unlocked',
    'Priority routing and failover',
    'Full analytics dashboard',
    'Streaming support',
    'Email support',
  ],
  cta: 'Start Building',
  ctaHref: '/login',
  popular: true,
}

const enterprisePlan = {
  tier: 'Enterprise',
  price: 'Custom',
  priceSuffix: '',
  desc: 'For teams and organizations',
  features: [
    'Everything in Pro',
    'Dedicated infrastructure',
    '99.9% SLA guarantee',
    'SSO and team management',
    'Data residency options',
    'Dedicated account support',
  ],
  cta: 'Contact Us',
  ctaHref: 'mailto:hello@orbyt.ai',
  popular: false,
}

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <section id="pricing" className={styles.section} aria-label="Pricing">
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.eyebrow}>Pricing</p>
          <h2 className={styles.title}>Transparent. Simple. Fair.</h2>
          <p className={styles.subtitle}>
            Pay only for what you use. No monthly fees. No surprises.
          </p>

          {/* Billing toggle */}
          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${billing === 'monthly' ? styles.toggleActive : ''}`}
              onClick={() => setBilling('monthly')}
            >
              Monthly
              {billing === 'monthly' && (
                <motion.div layoutId="toggleBg" className={styles.toggleActiveBg} />
              )}
            </button>
            <button
              className={`${styles.toggleBtn} ${billing === 'annual' ? styles.toggleActive : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual
              <span className={styles.saveBadge}>Save 20%</span>
              {billing === 'annual' && (
                <motion.div layoutId="toggleBg" className={styles.toggleActiveBg} />
              )}
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {/* FREE */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={styles.card}
          >
            <div className={styles.tier}>{freePlan.tier}</div>
            <div className={styles.price}>
              {freePlan.price}
              {freePlan.priceSuffix && (
                <span className={styles.priceSuffix}>{freePlan.priceSuffix}</span>
              )}
            </div>
            <div className={styles.desc}>{freePlan.desc}</div>
            <div className={styles.divider} />
            <ul className={styles.features}>
              {freePlan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <Link href={freePlan.ctaHref} className={`${styles.cta} ${styles.ctaGhost}`}>
              {freePlan.cta}
            </Link>
          </motion.div>

          {/* PRO */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`${styles.card} ${styles.cardPopular}`}
          >
            <AnimatePresence>
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.popularBadge}
              >
                Most Popular
              </motion.span>
            </AnimatePresence>
            <div className={styles.tier}>{proPlan.tier}</div>
            <div className={`${styles.price} ${styles.priceSmall}`}>{proPlan.price}</div>
            <div className={styles.desc}>{proPlan.desc}</div>
            <div className={styles.divider} />
            <ul className={styles.features}>
              {proPlan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <Link href={proPlan.ctaHref} className={`${styles.cta} ${styles.ctaPrimary}`}>
              {proPlan.cta}
            </Link>
          </motion.div>

          {/* ENTERPRISE */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={styles.card}
          >
            <div className={styles.tier}>{enterprisePlan.tier}</div>
            <div className={styles.price}>{enterprisePlan.price}</div>
            <div className={styles.desc}>{enterprisePlan.desc}</div>
            <div className={styles.divider} />
            <ul className={styles.features}>
              {enterprisePlan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a href={enterprisePlan.ctaHref} className={`${styles.cta} ${styles.ctaGhost}`}>
              {enterprisePlan.cta}
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
