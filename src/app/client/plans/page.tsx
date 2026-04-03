'use client'

import Link from 'next/link'
import PageWrapper from '@/components/portal/PageWrapper'
import { motion } from 'framer-motion'

export default function PlansIndex() {
  return (
    <PageWrapper>
      <h1 className="font-headline font-bold text-2xl mb-6">My Plans</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { href: '/client/plans/workout', title: 'Workout Plan', desc: 'View your weekly training schedule, exercises, and session details.', icon: '◆' },
          { href: '/client/plans/nutrition', title: 'Nutrition Plan', desc: "Today's meals, macro targets, grocery list, and meal swaps.", icon: '◇' },
        ].map((plan, i) => (
          <motion.div
            key={plan.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Link href={plan.href}
              className="block bg-white/[0.02] border border-white/[0.06] border-l-4 border-l-brand-bronze rounded-2xl p-6 hover:border-brand-bronze/20 hover:bg-white/[0.04] transition-all duration-300 group">
              <span className="text-2xl block mb-3">{plan.icon}</span>
              <h2 className="font-headline font-semibold text-lg mb-2 group-hover:text-brand-bronze transition-colors">{plan.title}</h2>
              <p className="text-sm text-brand-cream/40 font-body">{plan.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  )
}
