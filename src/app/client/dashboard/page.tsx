'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ClientDashboard() {
  const { data: session } = useSession()
  const name = session?.user?.name || 'Athlete'

  return (
    <div>
      {/* Hero panel */}
      <div className="bg-brand-card border border-brand-slate rounded-lg p-8 mb-8">
        <h1 className="font-headline font-bold text-2xl mb-1">
          Welcome back, <span className="text-brand-bronze">{name}</span>.
        </h1>
        <p className="text-sm text-brand-cream/50 font-body mb-4">Week 6 of 16 — The Forge Phase</p>
        <div className="w-full bg-brand-surface rounded-full h-2">
          <div className="bg-brand-bronze h-2 rounded-full transition-all duration-700" style={{ width: '37.5%' }} />
        </div>
        <p className="text-xs text-brand-cream/40 font-body mt-2">6 / 16 weeks completed</p>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Log Today's Training", href: '/client/log', icon: '✎' },
          { label: "View Today's Meals", href: '/client/plans/nutrition', icon: '◆' },
          { label: 'Upload Progress Photo', href: '/client/progress', icon: '◉' },
          { label: 'Message Coach', href: '/client/messages', icon: '✉' },
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

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Sessions this week', value: '3 / 4', color: 'text-brand-bronze' },
          { label: 'Avg calories', value: '2,340', color: 'text-brand-cream' },
          { label: 'Check-in streak', value: '12 days', color: 'text-brand-bronze' },
          { label: 'Weekly mood', value: '7.8', color: 'text-brand-cream' },
        ].map((stat) => (
          <div key={stat.label} className="bg-brand-card border border-brand-slate rounded-lg p-5">
            <div className={`font-headline font-bold text-xl ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-brand-cream/40 font-body mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming session */}
      <div className="bg-brand-card border border-brand-slate border-l-4 border-l-brand-bronze rounded-lg p-6 mb-8">
        <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-bronze mb-2">Next 1-on-1 Call</h3>
        <p className="font-body text-brand-cream">Wednesday, 26 March — 19:00 CET</p>
        <p className="text-sm text-brand-cream/50 font-body mt-1">
          Come ready to discuss: your energy levels, training compliance, and one win from the week.
        </p>
        <a href="#" className="inline-block mt-3 text-sm text-brand-bronze font-headline font-semibold hover:text-brand-gold transition-colors">
          Join Zoom Call →
        </a>
      </div>

      {/* Recent coach feedback */}
      <div className="bg-brand-surface border border-brand-card rounded-lg p-6">
        <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-3">Latest from your coach</h3>
        <p className="font-body text-sm text-brand-cream/70 leading-relaxed">
          &ldquo;Great work on increasing your bench volume this week. I&apos;ve noticed your sleep has been inconsistent — let&apos;s discuss a wind-down protocol on our next call. Keep the momentum going.&rdquo;
        </p>
        <Link href="/client/messages" className="inline-block mt-3 text-xs text-brand-bronze font-body hover:text-brand-gold transition-colors">
          Read full note →
        </Link>
      </div>
    </div>
  )
}
