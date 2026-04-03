'use client'

import PageWrapper from '@/components/portal/PageWrapper'
import { motion } from 'framer-motion'

export default function CoachManagement() {
  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline font-bold text-2xl">Coach Management</h1>
        <button className="btn-primary !text-sm !py-2.5">+ Add Coach</button>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Emin', email: 'emin@emsakyifitness.com', clients: 8, role: 'Main Coach' },
          { name: 'Coach Demo', email: 'coach@emsakyifitness.com', clients: 4, role: 'Coach' },
        ].map((coach, i) => (
          <motion.div
            key={coach.email}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-bronze/15 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-bronze/[0.08] border border-brand-bronze/20 flex items-center justify-center text-lg font-headline font-bold text-brand-bronze">
                {coach.name[0]}
              </div>
              <div>
                <p className="font-headline font-semibold">{coach.name}</p>
                <p className="text-xs text-brand-cream/30 font-body">{coach.email}</p>
                <div className="flex gap-2 mt-1.5">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-brand-bronze/[0.06] text-brand-bronze border border-brand-bronze/20 font-headline font-semibold uppercase tracking-wider">
                    {coach.role}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-lg bg-white/[0.03] text-brand-cream/40 border border-white/[0.06]">
                    {coach.clients} clients
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary !py-2 !px-4 !text-xs">Assign Clients</button>
              <button className="btn-secondary !py-2 !px-4 !text-xs">Edit</button>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  )
}
