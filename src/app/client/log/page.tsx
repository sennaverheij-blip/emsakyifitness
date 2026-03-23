'use client'

import { useState } from 'react'

export default function DailyLog() {
  const [submitted, setSubmitted] = useState(false)
  const [mood, setMood] = useState(7)
  const [energy, setEnergy] = useState(7)
  const [sleep, setSleep] = useState('7')
  const [trained, setTrained] = useState(true)
  const [compliance, setCompliance] = useState('full')
  const [water, setWater] = useState(2.5)
  const [notes, setNotes] = useState('')

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-full border-2 border-brand-bronze flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-brand-bronze" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="font-headline font-bold text-2xl mb-2">Check-in submitted</h2>
        <p className="text-sm text-brand-cream/50 font-body">Your coach will review this before your next call. Keep it up.</p>
      </div>
    )
  }

  const moodEmojis = ['😴', '😞', '😐', '🙂', '😊', '😄', '💪', '🔥', '⚡', '🏆']

  return (
    <div className="max-w-2xl">
      <h1 className="font-headline font-bold text-2xl mb-2">Daily Check-in</h1>
      <p className="text-sm text-brand-cream/50 font-body mb-8">5 minutes. Honest answers. That&apos;s all it takes.</p>

      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-10">
        {/* Mood & Energy */}
        <section>
          <h2 className="font-headline font-semibold text-lg mb-4">How&apos;s your day?</h2>

          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm font-body text-brand-cream/60 mb-2">
                <span>Mood</span>
                <span className="text-lg">{moodEmojis[mood - 1]} {mood}/10</span>
              </label>
              <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(+e.target.value)}
                className="w-full h-1.5 bg-brand-surface rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-bronze [&::-webkit-slider-thumb]:cursor-pointer" />
            </div>

            <div>
              <label className="flex justify-between text-sm font-body text-brand-cream/60 mb-2">
                <span>Energy level</span>
                <span>{energy}/10</span>
              </label>
              <input type="range" min="1" max="10" value={energy} onChange={(e) => setEnergy(+e.target.value)}
                className="w-full h-1.5 bg-brand-surface rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-bronze [&::-webkit-slider-thumb]:cursor-pointer" />
            </div>

            <div>
              <label className="block text-sm font-body text-brand-cream/60 mb-2">Sleep (hours)</label>
              <input type="number" step="0.5" min="0" max="14" value={sleep} onChange={(e) => setSleep(e.target.value)}
                className="brand-input !w-32" />
            </div>

            <div>
              <label className="block text-sm font-body text-brand-cream/60 mb-2">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                className="brand-input resize-none" placeholder="Anything on your mind today..." />
            </div>
          </div>
        </section>

        {/* Training */}
        <section>
          <h2 className="font-headline font-semibold text-lg mb-4">Training</h2>
          <div className="flex gap-3 mb-4">
            {[true, false].map((val) => (
              <button key={String(val)} type="button" onClick={() => setTrained(val)}
                className={`px-6 py-3 rounded font-body text-sm transition-all ${
                  trained === val
                    ? 'bg-brand-bronze/10 border border-brand-bronze text-brand-bronze'
                    : 'bg-brand-surface border border-brand-slate text-brand-cream/50'
                }`}>
                {val ? 'Yes, I trained' : 'Rest day'}
              </button>
            ))}
          </div>
        </section>

        {/* Nutrition */}
        <section>
          <h2 className="font-headline font-semibold text-lg mb-4">Nutrition</h2>

          <div className="mb-4">
            <label className="block text-sm font-body text-brand-cream/60 mb-2">Did you follow your meal plan?</label>
            <div className="flex gap-3">
              {(['full', 'partial', 'off-plan'] as const).map((val) => (
                <button key={val} type="button" onClick={() => setCompliance(val)}
                  className={`px-4 py-2 rounded text-sm font-body capitalize transition-all ${
                    compliance === val
                      ? 'bg-brand-bronze/10 border border-brand-bronze text-brand-bronze'
                      : 'bg-brand-surface border border-brand-slate text-brand-cream/50'
                  }`}>
                  {val === 'off-plan' ? 'Off-plan' : val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-body text-brand-cream/60 mb-2">
              <span>Water intake</span>
              <span>{water}L</span>
            </label>
            <input type="range" min="0" max="4" step="0.25" value={water} onChange={(e) => setWater(+e.target.value)}
              className="w-full h-1.5 bg-brand-surface rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-bronze [&::-webkit-slider-thumb]:cursor-pointer" />
          </div>
        </section>

        <button type="submit" className="btn-primary w-full sm:w-auto">
          Submit Today&apos;s Check-in
        </button>
      </form>
    </div>
  )
}
