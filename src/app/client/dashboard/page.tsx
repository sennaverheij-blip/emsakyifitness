'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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
    <div>
      {/* Hero panel */}
      <div className="bg-brand-card border border-brand-slate rounded-lg p-8 mb-8">
        <h1 className="font-headline font-bold text-2xl mb-1">
          Welcome back, <span className="text-brand-bronze">{name}</span>.
        </h1>
        <p className="text-sm text-brand-cream/50 font-body mb-4">Week {week} of 16 — Phase {phase}: {phaseLabel}</p>
        <div className="w-full bg-brand-surface rounded-full h-2">
          <div className="bg-brand-bronze h-2 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-brand-cream/40 font-body mt-2">{week} / 16 weeks completed</p>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Log Today's Training", href: '/client/log', icon: '✎' },
          { label: "View Today's Meals", href: '/client/plans/nutrition', icon: '◆' },
          { label: 'Upload Progress Photo', href: '/client/progress', icon: '◉' },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="bg-brand-surface border border-brand-card rounded-lg p-5 hover:border-brand-bronze/30 hover:bg-brand-card transition-all group"
          >
            <span className="text-2xl block mb-3 group-hover:scale-110 transition-transform">{action.icon}</span>
            <span className="text-sm font-body text-brand-cream/70 group-hover:text-brand-cream transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Upcoming session */}
      <div className="bg-brand-card border border-brand-slate border-l-4 border-l-brand-bronze rounded-lg p-6 mb-8">
        <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-bronze mb-2">Your Protocol</h3>
        <p className="font-body text-brand-cream/70 text-sm">
          Check your <Link href="/client/plans/workout" className="text-brand-bronze hover:text-brand-gold">Workout Plan</Link> and <Link href="/client/plans/nutrition" className="text-brand-bronze hover:text-brand-gold">Nutrition Plan</Link> for today&apos;s schedule.
        </p>
      </div>
    </div>
  )
}
