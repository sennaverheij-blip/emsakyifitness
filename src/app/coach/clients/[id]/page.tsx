'use client'

import { useState } from 'react'

export default function ClientDetail() {
  const [tab, setTab] = useState<'overview' | 'progress' | 'plans' | 'checkins' | 'onboarding' | 'messages'>('overview')

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-bronze/10 border border-brand-bronze/30 flex items-center justify-center text-xl font-headline font-bold text-brand-bronze">
            M
          </div>
          <div>
            <h1 className="font-headline font-bold text-2xl">Marcus</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-headline font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-bronze/10 text-brand-bronze border border-brand-bronze/30">Phase 2</span>
              <span className="text-[10px] font-headline font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-surface text-brand-cream/50 border border-brand-slate">Week 6</span>
              <span className="text-[10px] font-headline font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-bronze/10 text-brand-bronze border border-brand-bronze/30">Elite</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary !py-2 !px-4 !text-xs">Send Message</button>
          <button className="btn-primary !py-2 !px-4 !text-xs">Schedule Call</button>
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Compliance this week', value: '92%' },
          { label: 'Last check-in', value: '2h ago' },
          { label: 'Streak', value: '12 days' },
          { label: 'Avg mood', value: '7.8' },
        ].map((s) => (
          <div key={s.label} className="bg-brand-card border border-brand-slate rounded-lg p-4">
            <div className="font-headline font-bold text-lg text-brand-bronze">{s.value}</div>
            <div className="text-xs text-brand-cream/40 font-body mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-brand-card overflow-x-auto">
        {(['overview', 'progress', 'plans', 'checkins', 'onboarding', 'messages'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 text-sm font-headline font-semibold uppercase tracking-wider transition-colors whitespace-nowrap capitalize ${
              tab === t ? 'text-brand-bronze border-b-2 border-brand-bronze' : 'text-brand-cream/40 hover:text-brand-cream/60'
            }`}>
            {t === 'checkins' ? 'Check-ins' : t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-brand-card border border-brand-slate rounded-lg p-6">
            <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-3">Current Plan Summary</h3>
            <p className="text-sm font-body text-brand-cream/70">Phase 2 — The Forge · Week 6 · Macros: 2,450 kcal / 185P / 260C / 78F</p>
          </div>

          <div className="bg-brand-card border border-brand-slate rounded-lg p-6">
            <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-3">Recent Check-ins (Last 7 Days)</h3>
            <div className="grid grid-cols-7 gap-2">
              {[8, 7, 9, 7, 8, null, null].map((mood, i) => (
                <div key={i} className={`aspect-square rounded flex items-center justify-center text-sm font-body ${
                  mood ? 'bg-brand-bronze/10 text-brand-bronze' : 'bg-brand-surface text-brand-cream/20'
                }`}>
                  {mood || '—'}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-card border border-brand-slate rounded-lg p-6">
            <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-3">Coach Notes (Private)</h3>
            <textarea className="brand-input resize-none" rows={3} placeholder="Add private notes about this client..." />
          </div>

          <div className="bg-brand-card border border-brand-slate rounded-lg p-6">
            <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-3">AI Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-secondary !py-2 !px-4 !text-xs">Generate Pre-Call Analysis</button>
              <button className="btn-secondary !py-2 !px-4 !text-xs">Regenerate Workout Plan</button>
              <button className="btn-secondary !py-2 !px-4 !text-xs">Regenerate Meal Plan</button>
            </div>
          </div>
        </div>
      )}

      {tab !== 'overview' && (
        <div className="bg-brand-card border border-brand-slate rounded-lg p-8 text-center">
          <p className="text-brand-cream/30 font-body text-sm">
            {tab.charAt(0).toUpperCase() + tab.slice(1)} tab — connect to database for live data
          </p>
        </div>
      )}
    </div>
  )
}
