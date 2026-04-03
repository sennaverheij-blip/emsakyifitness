'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PageWrapper from '@/components/portal/PageWrapper'
import { motion } from 'framer-motion'

export default function ClientDashboard() {
  const [name, setName] = useState('Athlete')
  const [weekData, setWeekData] = useState<{ week: number; phase: number; phaseLabel: string } | null>(null)

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(data => {
      if (data.name) setName(data.name)
      if (data.currentWorkout) {
        try {
          const plan = JSON.parse(data.currentWorkout.planJson)
          setWeekData({
            week: data.currentWorkout.week || plan.week || 1,
            phase: data.currentWorkout.phase || plan.phase || 1,
            phaseLabel: plan.phase_label || (data.currentWorkout.phase === 1 ? 'The Audit' : data.currentWorkout.phase === 2 ? 'The Forge' : 'The Operating System'),
          })
        } catch {
          setWeekData({ week: data.currentWorkout.week || 1, phase: data.currentWorkout.phase || 1, phaseLabel: 'The Audit' })
        }
      }
    }).catch(() => {})
  }, [])

  const week = weekData?.week || 1
  const phase = weekData?.phase || 1
  const phaseLabel = weekData?.phaseLabel || 'The Audit'
  const progress = Math.round((week / 16) * 100)

  return (
    <PageWrapper>
      {/* Hero panel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8 mb-8"
      >
        <h1 className="font-headline font-bold text-2xl mb-1">
          Welcome back, <span className="text-gradient-bronze">{name}</span>.
        </h1>
        <p className="text-sm text-brand-cream/40 font-body mb-5">Week {week} of 16 — Phase {phase}: {phaseLabel}</p>
        <div className="w-full bg-white/[0.06] rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-brand-bronze to-brand-gold h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="text-xs text-brand-cream/30 font-body mt-2">{week} / 16 weeks completed</p>
      </motion.div>

      {/* Quick action cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Log Today's Training", href: '/client/log', icon: '✎' },
          { label: "View Today's Meals", href: '/client/plans/nutrition', icon: '◆' },
          { label: 'Track Progress', href: '/client/progress', icon: '◉' },
        ].map((action, i) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
          >
            <Link
              href={action.href}
              className="block bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:border-brand-bronze/20 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <span className="text-2xl block mb-3 group-hover:scale-110 transition-transform duration-200">{action.icon}</span>
              <span className="text-sm font-body text-brand-cream/50 group-hover:text-brand-cream/80 transition-colors">
                {action.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Protocol card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/[0.02] border border-white/[0.06] border-l-4 border-l-brand-bronze rounded-2xl p-6 mb-8"
      >
        <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-bronze mb-2">Your Protocol</h3>
        <p className="font-body text-brand-cream/50 text-sm">
          Check your <Link href="/client/plans/workout" className="text-brand-bronze hover:text-brand-gold transition-colors">Workout Plan</Link> and <Link href="/client/plans/nutrition" className="text-brand-bronze hover:text-brand-gold transition-colors">Nutrition Plan</Link> for today&apos;s schedule.
        </p>
      </motion.div>

      {/* Check-in call */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 mb-8"
      >
        <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-bronze mb-2">Weekly Check-In</h3>
        <p className="font-body text-brand-cream/50 text-sm mb-4">
          Book your weekly check-in call with Emin to review progress and adjust your protocol.
        </p>
        <a
          href="https://calendly.com/admin-emsakyifitness/check-in-call"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary !py-3 !px-6 !text-sm inline-flex"
        >
          Book Check-In Call →
        </a>
      </motion.div>
    </PageWrapper>
  )
}
