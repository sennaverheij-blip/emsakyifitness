'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PageWrapper from '@/components/portal/PageWrapper'
import { motion } from 'framer-motion'
import { AuroraBackground } from '@/components/ui/aurora-background'

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
      {/* Hero with Aurora */}
      <div className="relative rounded-3xl overflow-hidden mb-16">
        <AuroraBackground className="opacity-40 absolute inset-0" />
        <div className="relative z-10 py-16 px-8">
          <h1 className="heading-lg">Main Coach Dashboard</h1>
          <p className="label-sm mt-2">
            {new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="apple-card-static p-8"
          >
            <div className="stat-number font-headline font-bold text-4xl text-brand-bronze">
              {loading ? '—' : s.value}
            </div>
            <div className="label-sm mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Needs Attention */}
      {needsAttention.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-16">
          <h2 className="heading-md mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400/80">Needs Attention</span>
          </h2>
          <div className="space-y-3">
            {needsAttention.map((c: any) => (
              <Link key={c.id} href={`/coach/clients/${c.id}`}
                className="apple-card flex items-center justify-between p-6 border-red-500/10 hover:border-red-500/25">
                <div>
                  <span className="font-headline font-semibold">{c.name}</span>
                  <span className="text-sm text-brand-cream/30 ml-3">
                    {c.daysSinceCheckIn !== null ? `No check-in for ${c.daysSinceCheckIn} days` : 'No check-ins'}
                  </span>
                </div>
                <span className="text-sm text-brand-bronze font-headline font-semibold">View &rarr;</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="label-sm mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Add New Client', href: '/admin/clients/new', icon: '+' },
            { label: 'View All Clients', href: '/admin/clients', icon: '◆' },
            { label: 'Manage Coaches', href: '/admin/coaches', icon: '◇' },
            { label: 'Content Library', href: '/admin/library', icon: '▤' },
          ].map((action, i) => (
            <motion.div key={action.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}>
              <Link href={action.href}
                className="apple-card block p-8 text-center group">
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-200">{action.icon}</span>
                <span className="text-sm font-body text-brand-cream/50 group-hover:text-brand-cream/80 transition-colors">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
