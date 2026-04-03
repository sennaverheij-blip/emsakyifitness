'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PageWrapper from '@/components/portal/PageWrapper'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clients').then(r => r.json()).then(data => {
      setClients(Array.isArray(data) ? data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const active = clients.filter(c => c.status !== 'INACTIVE')
  const avgCompliance = active.length > 0
    ? Math.round(active.reduce((a: number, c: any) => a + c.compliance, 0) / active.length)
    : 0
  const needsAttention = clients.filter(c => c.status === 'NEEDS ATTENTION')

  const stats = [
    { label: 'Total clients', value: String(clients.length) },
    { label: 'Active', value: String(active.length) },
    { label: 'Avg compliance', value: `${avgCompliance}%` },
    { label: 'Needs attention', value: String(needsAttention.length) },
  ]

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="font-headline font-bold text-2xl mb-1">Main Coach Dashboard</h1>
        <p className="text-sm text-brand-cream/30 font-body">
          {new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5 hover:border-brand-bronze/20 transition-all duration-300"
          >
            <div className="font-headline font-bold text-2xl text-brand-bronze">{loading ? '—' : s.value}</div>
            <div className="text-xs text-brand-cream/30 font-body mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {needsAttention.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-8">
          <h2 className="text-xs font-headline font-semibold uppercase tracking-wider text-red-400/70 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Needs Attention
          </h2>
          <div className="space-y-2">
            {needsAttention.map((c: any) => (
              <Link key={c.id} href={`/coach/clients/${c.id}`}
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-red-500/10 rounded-xl hover:border-red-500/25 hover:bg-white/[0.03] transition-all duration-200">
                <div>
                  <span className="font-headline font-semibold text-sm">{c.name}</span>
                  <span className="text-xs text-brand-cream/30 ml-2">
                    {c.daysSinceCheckIn !== null ? `No check-in for ${c.daysSinceCheckIn} days` : 'No check-ins'}
                  </span>
                </div>
                <span className="text-xs text-brand-bronze font-headline font-semibold">View →</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      <h2 className="text-xs font-headline font-semibold uppercase tracking-wider text-brand-cream/30 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Add New Client', href: '/admin/clients/new', icon: '+' },
          { label: 'View All Clients', href: '/admin/clients', icon: '◆' },
          { label: 'Manage Coaches', href: '/admin/coaches', icon: '◇' },
          { label: 'Content Library', href: '/admin/library', icon: '▤' },
        ].map((action, i) => (
          <motion.div key={action.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}>
            <Link href={action.href}
              className="block bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center hover:border-brand-bronze/20 hover:bg-white/[0.04] transition-all duration-300 group">
              <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform duration-200">{action.icon}</span>
              <span className="text-sm font-body text-brand-cream/50 group-hover:text-brand-cream/80 transition-colors">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  )
}
