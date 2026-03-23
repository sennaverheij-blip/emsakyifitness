'use client'

import { useState } from 'react'

export default function ProgressPage() {
  const [tab, setTab] = useState<'photos' | 'measurements' | 'performance'>('photos')

  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-6">Progress</h1>

      <div className="flex gap-4 mb-8 border-b border-brand-card">
        {(['photos', 'measurements', 'performance'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 text-sm font-headline font-semibold uppercase tracking-wider transition-colors capitalize ${
              tab === t ? 'text-brand-bronze border-b-2 border-brand-bronze' : 'text-brand-cream/40 hover:text-brand-cream/60'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'photos' && (
        <div>
          {/* Upload */}
          <div className="border-2 border-dashed border-brand-slate rounded-lg p-8 text-center mb-8 hover:border-brand-bronze/40 transition-colors cursor-pointer">
            <input type="file" accept="image/*" className="hidden" id="photoUpload" />
            <label htmlFor="photoUpload" className="cursor-pointer">
              <span className="text-3xl block mb-2">📷</span>
              <p className="text-sm text-brand-cream/50 font-body">Tap to upload a progress photo</p>
              <p className="text-xs text-brand-cream/30 font-body mt-1">Front, back, or side — consistency is key</p>
            </label>
          </div>

          {/* Photo grid (demo) */}
          <h3 className="text-xs text-brand-cream/40 font-headline uppercase tracking-wider mb-3">Phase 2 — The Forge</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {['Week 4 · Front', 'Week 4 · Side', 'Week 2 · Front', 'Week 2 · Side', 'Week 1 · Front', 'Week 1 · Side'].map((label) => (
              <div key={label} className="aspect-[3/4] bg-brand-card border border-brand-slate rounded-lg flex flex-col items-center justify-center">
                <span className="text-2xl mb-2 opacity-20">◉</span>
                <span className="text-[10px] text-brand-cream/30 font-body">{label}</span>
              </div>
            ))}
          </div>

          <button className="btn-secondary !text-sm mt-6">Compare Side by Side</button>
        </div>
      )}

      {tab === 'measurements' && (
        <div className="max-w-lg">
          <p className="text-sm text-brand-cream/50 font-body mb-6">Log your measurements to track visual changes over time.</p>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {['Weight (kg)', 'Body Fat %', 'Neck (cm)', 'Shoulders (cm)', 'Chest (cm)', 'Waist (cm)', 'Hips (cm)', 'Left Arm (cm)', 'Right Arm (cm)', 'Left Thigh (cm)'].map((field) => (
                <div key={field}>
                  <label className="block text-xs text-brand-cream/50 font-body mb-1">{field}</label>
                  <input type="number" step="0.1" className="brand-input !py-2.5" placeholder="—" />
                </div>
              ))}
            </div>
            <button type="button" className="btn-primary !text-sm">Save Measurements</button>
          </form>
        </div>
      )}

      {tab === 'performance' && (
        <div className="max-w-lg">
          <p className="text-sm text-brand-cream/50 font-body mb-6">Track your key lifts and performance benchmarks.</p>
          <div className="space-y-4">
            {['Bench Press 1RM', 'Deadlift 1RM', 'Squat 1RM', 'Running Pace (1km)'].map((lift) => (
              <div key={lift} className="bg-brand-card border border-brand-slate rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-body text-sm text-brand-cream">{lift}</p>
                  <p className="text-xs text-brand-cream/40 font-body">Last: —</p>
                </div>
                <input type="number" step="0.5" className="brand-input !w-24 !py-2 text-center" placeholder="kg" />
              </div>
            ))}
            <button type="button" className="btn-primary !text-sm">Save Performance</button>
          </div>
        </div>
      )}
    </div>
  )
}
