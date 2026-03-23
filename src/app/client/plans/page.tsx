import Link from 'next/link'

export default function PlansIndex() {
  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-6">My Plans</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/client/plans/workout" className="brand-card hover:border-brand-bronze/40 transition-all group block">
          <h2 className="font-headline font-semibold text-lg mb-2 group-hover:text-brand-bronze transition-colors">Workout Plan</h2>
          <p className="text-sm text-brand-cream/50 font-body">View your weekly training schedule, exercises, and session details.</p>
        </Link>
        <Link href="/client/plans/nutrition" className="brand-card hover:border-brand-bronze/40 transition-all group block">
          <h2 className="font-headline font-semibold text-lg mb-2 group-hover:text-brand-bronze transition-colors">Nutrition Plan</h2>
          <p className="text-sm text-brand-cream/50 font-body">Today&apos;s meals, macro targets, grocery list, and meal swaps.</p>
        </Link>
      </div>
    </div>
  )
}
