'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PageWrapper from '@/components/portal/PageWrapper'
import { AuroraBackground } from '@/components/ui/aurora-background'
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
      {/* Hero with Aurora */}
      <div className="relative overflow-hidden rounded-3xl mb-8">
        <AuroraBackground className="opacity-50 absolute inset-0" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 p-8"
        >
          <h1 className="heading-lg mb-2">
            Welcome back, <span className="text-gradient-bronze">{name}</span>.
          </h1>
          <p className="text-sm text-brand-cream/40 font-body mb-6">Week {week} of 16 — Phase {phase}: {phaseLabel}</p>

          {/* Progress stat */}
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-bold text-brand-cream">{progress}%</span>
            <span className="text-sm text-brand-cream/40 font-body pb-2">complete</span>
          </div>

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
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              className="apple-card block p-8 group"
            >
              <span className="text-3xl block mb-4 group-hover:scale-110 transition-transform duration-200">{action.icon}</span>
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
        className="apple-card-static p-8 mb-8"
      >
        <h3 className="label-sm mb-3 text-brand-bronze">Your Protocol</h3>
        <p className="font-body text-brand-cream/50 text-sm">
          Check your <Link href="/client/plans/workout" className="text-brand-bronze hover:text-brand-gold transition-colors">Workout Plan</Link> and <Link href="/client/plans/nutrition" className="text-brand-bronze hover:text-brand-gold transition-colors">Nutrition Plan</Link> for today&apos;s schedule.
        </p>
      </motion.div>

      {/* Check-in call */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="apple-card-static p-8 mb-8"
      >
        <h3 className="label-sm mb-3 text-brand-bronze">Weekly Check-In</h3>
        <p className="font-body text-brand-cream/50 text-sm mb-6">
          Book your weekly check-in call with Emin to review progress and adjust your protocol.
        </p>
        <a
          href="https://calendly.com/admin-emsakyifitness/check-in-call"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Book Check-In Call
        </a>
      </motion.div>
    </PageWrapper>
  )
}
