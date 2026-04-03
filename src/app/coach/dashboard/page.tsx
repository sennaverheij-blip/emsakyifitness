'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PageWrapper from '@/components/portal/PageWrapper'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { motion } from 'framer-motion'

type Client = {
  id: string; name: string; compliance: number; status: string;
  lastCheckIn: string | null; daysSinceCheckIn: number | null;
  tier: string;
}

const statusBadge: Record<string, string> = {
  'ON TRACK': 'badge badge-success',
  'NEEDS ATTENTION': 'badge badge-warning',
  'INACTIVE': 'badge badge-neutral',
  'NEW': 'badge badge-bronze',
}

export default function CoachDashboard() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clients').then(r => r.json()).then(data => {
      setClients(Array.isArray(data) ? data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const formatDate = (d: string | null) => {
    if (!d) return 'Never'
    const days = Math.floor((Date.now() - new Date(d).getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    return `${days}d ago`
  }

  const activeClients = clients.filter(c => c.status !== 'INACTIVE')
  const avgCompliance = activeClients.length > 0
    ? Math.round(activeClients.reduce((a, c) => a + c.compliance, 0) / activeClients.length)
    : 0
  const needsAttention = clients.filter(c => c.status === 'NEEDS ATTENTION').length

  const stats = [
    { label: 'Active clients', value: String(activeClients.length) },
    { label: 'Avg compliance', value: `${avgCompliance}%` },
    { label: 'Needs attention', value: String(needsAttention) },
    { label: 'Total clients', value: String(clients.length) },
  ]

  return (
    <PageWrapper>
      {/* Hero with subtle aurora */}
      <div className="relative mb-16">
        <div className="absolute inset-0 opacity-30 pointer-events-none -z-10">
          <AuroraBackground className="h-full w-full" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="heading-lg">Your Clients</h1>
          <Link href="/admin/clients/new" className="btn-primary">
            + Add Client
          </Link>
        </div>
        <p className="label-sm font-body">
          {new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="apple-card"
          >
            <div className="font-headline font-bold text-3xl text-brand-bronze">{s.value}</div>
            <div className="label-sm mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Client table */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="apple-card-static animate-pulse h-16" />)}
        </div>
      ) : clients.length === 0 ? (
        <div className="apple-card-static p-12 text-center">
          <p className="text-brand-cream/30 font-body">No clients yet.</p>
        </div>
      ) : (
        <div className="apple-card-static !p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="apple-table">
              <thead>
                <tr>
                  <th className="text-left">Client</th>
                  <th className="text-center hidden sm:table-cell">Last Check-in</th>
                  <th className="text-center hidden md:table-cell">Compliance</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <td>
                      <Link href={`/coach/clients/${c.id}`} className="font-headline font-semibold hover:text-brand-bronze transition-colors">
                        {c.name || 'Unnamed'}
                      </Link>
                    </td>
                    <td className="text-center text-brand-cream/40 hidden sm:table-cell">{formatDate(c.lastCheckIn)}</td>
                    <td className="text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-white/[0.06] rounded-full h-1.5">
                          <div className="bg-brand-bronze h-1.5 rounded-full transition-all duration-500" style={{ width: `${c.compliance}%` }} />
                        </div>
                        <span className="text-xs text-brand-cream/40">{c.compliance}%</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className={statusBadge[c.status] || 'badge badge-neutral'}>
                        {c.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <Link href={`/coach/clients/${c.id}`} className="text-xs text-brand-bronze hover:text-brand-gold transition-colors font-headline font-semibold">
                        View →
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
