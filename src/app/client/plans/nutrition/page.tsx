'use client'

import { useState } from 'react'

const macros = { calories: 2450, protein: 185, carbs: 260, fats: 78 }
const logged = { calories: 1820, protein: 142, carbs: 195, fats: 58 }

const meals = [
  {
    type: 'Breakfast', name: 'Protein Oats with Berries',
    macros: { calories: 520, protein: 38, carbs: 62, fats: 14 },
    ingredients: ['80g oats', '1 scoop whey protein', '150g mixed berries', '15g almond butter', '200ml almond milk'],
    prep: 'Cook oats with almond milk. Stir in whey protein. Top with berries and almond butter.',
  },
  {
    type: 'Lunch', name: 'Grilled Chicken & Sweet Potato Bowl',
    macros: { calories: 680, protein: 52, carbs: 72, fats: 18 },
    ingredients: ['200g chicken breast', '200g sweet potato', '100g broccoli', '50g brown rice', '1 tbsp olive oil', 'Spices to taste'],
    prep: 'Grill chicken with spices. Roast sweet potato. Steam broccoli. Cook rice. Assemble bowl with olive oil drizzle.',
  },
  {
    type: 'Dinner', name: 'Salmon with Quinoa & Greens',
    macros: { calories: 720, protein: 48, carbs: 58, fats: 32 },
    ingredients: ['180g salmon fillet', '100g quinoa (dry)', '100g spinach', '100g asparagus', '1 tbsp olive oil', 'Lemon juice'],
    prep: 'Pan-sear salmon. Cook quinoa. Sauté spinach and asparagus in olive oil. Plate with lemon.',
  },
  {
    type: 'Snacks', name: 'Greek Yoghurt & Protein Shake',
    macros: { calories: 530, protein: 47, carbs: 68, fats: 14 },
    ingredients: ['200g Greek yoghurt', '1 banana', '30g granola', '1 scoop whey protein', '300ml water'],
    prep: 'Mix yoghurt with granola and sliced banana. Shake protein with water.',
  },
]

const groceryList = {
  Proteins: ['Chicken breast (400g)', 'Salmon fillet (360g)', 'Whey protein (2 scoops/day)'],
  Produce: ['Mixed berries (300g)', 'Broccoli (200g)', 'Spinach (200g)', 'Asparagus (200g)', 'Banana (2)', 'Sweet potato (400g)', 'Lemon (1)'],
  'Grains & Carbs': ['Oats (160g)', 'Brown rice (100g)', 'Quinoa (200g)', 'Granola (60g)'],
  Dairy: ['Greek yoghurt (400g)', 'Almond milk (400ml)'],
  'Pantry & Oils': ['Olive oil', 'Almond butter', 'Spices'],
}

export default function NutritionPlan() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const [tab, setTab] = useState<'meals' | 'grocery'>('meals')

  const pct = (val: number, target: number) => Math.min((val / target) * 100, 100)

  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-2">Nutrition Plan</h1>
      <p className="text-sm text-brand-cream/50 font-body mb-6">Phase 2 — The Forge · Week 6 · Monday</p>

      {/* Macro overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Calories', val: logged.calories, target: macros.calories, unit: 'kcal' },
          { label: 'Protein', val: logged.protein, target: macros.protein, unit: 'g' },
          { label: 'Carbs', val: logged.carbs, target: macros.carbs, unit: 'g' },
          { label: 'Fats', val: logged.fats, target: macros.fats, unit: 'g' },
        ].map((m) => (
          <div key={m.label} className="bg-brand-card border border-brand-slate rounded-lg p-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs text-brand-cream/50 font-body">{m.label}</span>
              <span className="text-xs text-brand-cream/40 font-body">{m.val} / {m.target}{m.unit}</span>
            </div>
            <div className="w-full bg-brand-surface rounded-full h-1.5">
              <div className="bg-brand-bronze h-1.5 rounded-full transition-all" style={{ width: `${pct(m.val, m.target)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-brand-card">
        {(['meals', 'grocery'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 px-1 text-sm font-headline font-semibold uppercase tracking-wider transition-colors ${
              tab === t ? 'text-brand-bronze border-b-2 border-brand-bronze' : 'text-brand-cream/40 hover:text-brand-cream/60'
            }`}
          >
            {t === 'meals' ? "Today's Meals" : 'Grocery List'}
          </button>
        ))}
      </div>

      {tab === 'meals' ? (
        <div className="space-y-3">
          {meals.map((meal, i) => (
            <div key={meal.type} className="bg-brand-card border border-brand-slate rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div>
                  <span className="text-xs text-brand-bronze font-headline font-semibold uppercase tracking-wider">{meal.type}</span>
                  <p className="font-body text-sm text-brand-cream mt-0.5">{meal.name}</p>
                  <p className="text-xs text-brand-cream/40 font-body mt-1">
                    {meal.macros.calories} kcal · {meal.macros.protein}P · {meal.macros.carbs}C · {meal.macros.fats}F
                  </p>
                </div>
                <span className={`text-brand-cream/40 transition-transform ${expanded === i ? 'rotate-180' : ''}`}>▾</span>
              </button>

              {expanded === i && (
                <div className="border-t border-brand-slate p-5 space-y-4">
                  <div>
                    <h4 className="text-xs text-brand-cream/50 font-body uppercase tracking-wider mb-2">Ingredients</h4>
                    <ul className="space-y-1">
                      {meal.ingredients.map((ing) => (
                        <li key={ing} className="text-sm font-body text-brand-cream/70 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-bronze rounded-full shrink-0" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs text-brand-cream/50 font-body uppercase tracking-wider mb-2">Prep</h4>
                    <p className="text-sm font-body text-brand-cream/60">{meal.prep}</p>
                  </div>
                  <button className="btn-secondary !py-2 !px-4 !text-xs">Swap this meal</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groceryList).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs text-brand-bronze font-headline font-semibold uppercase tracking-wider mb-3">{category}</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <label key={item} className="flex items-center gap-3 p-3 bg-brand-card border border-brand-slate rounded cursor-pointer hover:border-brand-bronze/30 transition-colors">
                    <input type="checkbox" className="w-4 h-4 accent-[#C9A961] rounded" />
                    <span className="text-sm font-body text-brand-cream/70">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="btn-secondary !text-sm">Copy List to Clipboard</button>
        </div>
      )}
    </div>
  )
}
