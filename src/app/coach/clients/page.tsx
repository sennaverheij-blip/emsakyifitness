'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PageWrapper from '@/components/portal/PageWrapper'
import { motion } from 'framer-motion'

export default function CoachClients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clients').then(r => r.json()).then(data => {
      setClients(Array.isArray(data) ? data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="space-y-3">
      {[1,2,3].map(i => <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 animate-pulse h-20" />)}
    </div>
  )

  return (
    <PageWrapper>
      <h1 className="font-headline font-bold text-2xl mb-6">My Clients</h1>
      <div className="space-y-3">
        {clients.map((c: any, i: number) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.3 }}>
            <Link href={`/coach/clients/${c.id}`}
              className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-brand-bronze/20 hover:bg-white/[0.04] transition-all duration-200 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-bronze/[0.08] border border-brand-bronze/20 flex items-center justify-center text-sm font-headline font-bold text-brand-bronze">
                  {(c.name || '?')[0]}
                </div>
                <div>
                  <p className="font-headline font-semibold text-sm group-hover:text-brand-bronze transition-colors">{c.name}</p>
                  <p className="text-xs text-brand-cream/30">{c.email} · {c.tier}</p>
                </div>
              </div>
              <span className="text-xs text-brand-bronze font-headline font-semibold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
            </Link>
          </motion.div>
        ))}
        {clients.length === 0 && (
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 text-center">
            <p className="text-brand-cream/30 font-body text-sm">No clients assigned yet</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
