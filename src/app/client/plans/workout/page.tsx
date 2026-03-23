'use client'

import { useState } from 'react'

const demoWeek = [
  { day: 'Monday', type: 'Upper Strength + Boxing', status: 'completed',
    exercises: [
      { name: 'Barbell Overhead Press', sets: 4, reps: '6-8', rest: '120s', notes: 'Controlled descent' },
      { name: 'Weighted Pull-ups', sets: 4, reps: '6-8', rest: '120s', notes: 'Full ROM' },
      { name: 'Incline DB Press', sets: 3, reps: '8-10', rest: '90s', notes: 'Squeeze at top' },
      { name: 'Cable Face Pulls', sets: 3, reps: '12-15', rest: '60s', notes: 'External rotation focus' },
      { name: 'Boxing Rounds', sets: 5, reps: '3 min', rest: '60s', notes: 'Focus on jab-cross combos' },
    ],
  },
  { day: 'Tuesday', type: 'Active Recovery', status: 'scheduled', exercises: [] },
  { day: 'Wednesday', type: 'Lower Power + Core', status: 'scheduled',
    exercises: [
      { name: 'Back Squat', sets: 5, reps: '5', rest: '180s', notes: 'Below parallel' },
      { name: 'Romanian Deadlift', sets: 4, reps: '8', rest: '120s', notes: 'Hamstring stretch at bottom' },
      { name: 'Walking Lunges', sets: 3, reps: '12/leg', rest: '90s', notes: 'Controlled pace' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '12', rest: '60s', notes: 'No swing' },
      { name: 'Plank Variations', sets: 3, reps: '45s', rest: '45s', notes: 'Side + front' },
    ],
  },
  { day: 'Thursday', type: 'Rest Day', status: 'rest', exercises: [] },
  { day: 'Friday', type: 'Push Hypertrophy', status: 'scheduled',
    exercises: [
      { name: 'Flat Barbell Bench', sets: 4, reps: '8-10', rest: '120s', notes: 'Arch, retract scapula' },
      { name: 'Seated DB Shoulder Press', sets: 4, reps: '8-10', rest: '90s', notes: 'Full lockout' },
      { name: 'Cable Crossovers', sets: 3, reps: '12-15', rest: '60s', notes: 'Squeeze contraction' },
      { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '45s', notes: 'Slow negative' },
      { name: 'Tricep Dips', sets: 3, reps: '10-12', rest: '90s', notes: 'Weighted if possible' },
    ],
  },
  { day: 'Saturday', type: 'Conditioning + Boxing', status: 'scheduled',
    exercises: [
      { name: 'Heavy Bag Work', sets: 8, reps: '2 min', rest: '30s', notes: 'Power shots' },
      { name: 'Kettlebell Swings', sets: 4, reps: '15', rest: '45s', notes: 'Hip snap' },
      { name: 'Battle Ropes', sets: 4, reps: '30s', rest: '30s', notes: 'Alternating' },
      { name: 'Farmers Walk', sets: 3, reps: '40m', rest: '60s', notes: 'Heavy as possible' },
    ],
  },
  { day: 'Sunday', type: 'Rest Day', status: 'rest', exercises: [] },
]

export default function WorkoutPlan() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-headline font-bold text-2xl">Workout Plan</h1>
          <p className="text-sm text-brand-cream/50 font-body">Phase 2 — The Forge · Week 6</p>
        </div>
      </div>

      <div className="space-y-3">
        {demoWeek.map((day, i) => (
          <div key={day.day} className="bg-brand-card border border-brand-slate rounded-lg overflow-hidden">
            <button
              onClick={() => day.exercises.length > 0 && setExpanded(expanded === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  day.status === 'completed' ? 'bg-green-500' :
                  day.status === 'rest' ? 'bg-brand-slate' : 'bg-brand-bronze'
                }`} />
                <div>
                  <span className="font-headline font-semibold text-sm">{day.day}</span>
                  <span className="text-brand-cream/50 mx-2">—</span>
                  <span className="text-sm text-brand-cream/70 font-body">{day.type}</span>
                </div>
              </div>
              {day.exercises.length > 0 && (
                <span className={`text-brand-cream/40 transition-transform ${expanded === i ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              )}
            </button>

            {expanded === i && day.exercises.length > 0 && (
              <div className="border-t border-brand-slate p-5">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="text-brand-cream/40 text-xs uppercase tracking-wider">
                      <th className="text-left pb-3">Exercise</th>
                      <th className="text-center pb-3">Sets</th>
                      <th className="text-center pb-3">Reps</th>
                      <th className="text-center pb-3 hidden sm:table-cell">Rest</th>
                      <th className="text-left pb-3 hidden md:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-slate/50">
                    {day.exercises.map((ex) => (
                      <tr key={ex.name} className="text-brand-cream/80">
                        <td className="py-3 pr-4 font-medium">{ex.name}</td>
                        <td className="py-3 text-center text-brand-bronze">{ex.sets}</td>
                        <td className="py-3 text-center">{ex.reps}</td>
                        <td className="py-3 text-center hidden sm:table-cell text-brand-cream/50">{ex.rest}</td>
                        <td className="py-3 hidden md:table-cell text-brand-cream/40 text-xs">{ex.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
