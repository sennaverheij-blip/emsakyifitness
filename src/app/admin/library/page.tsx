'use client'

import { useState } from 'react'

export default function ContentLibrary() {
  const [tab, setTab] = useState<'exercises' | 'meals' | 'templates'>('exercises')

  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-6">Content Library</h1>

      <div className="flex gap-4 mb-8 border-b border-brand-card">
        {(['exercises', 'meals', 'templates'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 text-sm font-headline font-semibold uppercase tracking-wider transition-colors capitalize ${
              tab === t ? 'text-brand-bronze border-b-2 border-brand-bronze' : 'text-brand-cream/40'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'exercises' && (
        <div>
          <div className="flex gap-3 mb-6">
            <input className="brand-input flex-1" placeholder="Search exercises..." />
            <button className="btn-primary !text-sm !py-2.5">+ Add Exercise</button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Barbell Overhead Press', muscles: 'Shoulders, Triceps', equipment: 'Barbell' },
              { name: 'Weighted Pull-ups', muscles: 'Back, Biceps', equipment: 'Pull-up Bar, Belt' },
              { name: 'Back Squat', muscles: 'Quads, Glutes', equipment: 'Barbell, Rack' },
              { name: 'Romanian Deadlift', muscles: 'Hamstrings, Glutes', equipment: 'Barbell' },
              { name: 'Heavy Bag Work', muscles: 'Full Body, Cardio', equipment: 'Boxing Bag' },
            ].map((ex) => (
              <div key={ex.name} className="bg-brand-card border border-brand-slate rounded-lg p-4 flex items-center justify-between hover:border-brand-bronze/30 transition-colors">
                <div>
                  <p className="font-headline font-semibold text-sm">{ex.name}</p>
                  <p className="text-xs text-brand-cream/50 font-body">{ex.muscles} · {ex.equipment}</p>
                </div>
                <button className="text-xs text-brand-bronze hover:text-brand-gold font-headline font-semibold">Edit</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'meals' && (
        <div className="bg-brand-card border border-brand-slate rounded-lg p-8 text-center">
          <p className="text-brand-cream/30 font-body text-sm">Meal & Recipe Library — add meals that AI can reference for plan generation.</p>
          <button className="btn-primary !text-sm mt-4">+ Add Recipe</button>
        </div>
      )}

      {tab === 'templates' && (
        <div className="bg-brand-card border border-brand-slate rounded-lg p-8 text-center">
          <p className="text-brand-cream/30 font-body text-sm">Workout plan templates per phase — apply as starting point for new clients.</p>
          <button className="btn-primary !text-sm mt-4">+ Create Template</button>
        </div>
      )}
    </div>
  )
}
