'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

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

  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-1">Main Coach Dashboard</h1>
      <p className="text-sm text-brand-cream/50 font-body mb-8">
        {new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total clients', value: String(clients.length) },
          { label: 'Active', value: String(active.length) },
          { label: 'Avg compliance', value: `${avgCompliance}%` },
          { label: 'Needs attention', value: String(needsAttention.length) },
        ].map((s) => (
          <div key={s.label} className="bg-brand-card border border-brand-slate rounded-lg p-5">
            <div className="font-headline font-bold text-2xl text-brand-bronze">{loading ? '—' : s.value}</div>
            <div className="text-xs text-brand-cream/40 font-body mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Needs attention */}
      {needsAttention.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-headline font-semibold uppercase tracking-wider text-red-400/80 mb-3 flex items-center gap-2">
            <span>⚠</span> Needs Attention
          </h2>
          <div className="space-y-2">
            {needsAttention.map((c: any) => (
              <Link key={c.id} href={`/coach/clients/${c.id}`}
                className="flex items-center justify-between p-4 bg-brand-card border border-red-500/20 rounded-lg hover:border-red-500/40 transition-colors">
                <div>
                  <span className="font-headline font-semibold text-sm">{c.name}</span>
                  <span className="text-xs text-brand-cream/40 ml-2">
                    {c.daysSinceCheckIn !== null ? `No check-in for ${c.daysSinceCheckIn} days` : 'No check-ins'}
                  </span>
                </div>
                <span className="text-xs text-brand-bronze font-headline font-semibold">View →</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <h2 className="text-xs font-headline font-semibold uppercase tracking-wider text-brand-cream/60 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/admin/clients/new" className="bg-brand-surface border border-brand-card rounded-lg p-5 text-center hover:border-brand-bronze/30 transition-colors group">
          <span className="text-2xl block mb-2">+</span>
          <span className="text-sm font-body text-brand-cream/70 group-hover:text-brand-cream">Add New Client</span>
        </Link>
        <Link href="/admin/clients" className="bg-brand-surface border border-brand-card rounded-lg p-5 text-center hover:border-brand-bronze/30 transition-colors group">
          <span className="text-2xl block mb-2">◆</span>
          <span className="text-sm font-body text-brand-cream/70 group-hover:text-brand-cream">View All Clients</span>
        </Link>
        <Link href="/admin/coaches" className="bg-brand-surface border border-brand-card rounded-lg p-5 text-center hover:border-brand-bronze/30 transition-colors group">
          <span className="text-2xl block mb-2">◇</span>
          <span className="text-sm font-body text-brand-cream/70 group-hover:text-brand-cream">Manage Coaches</span>
        </Link>
        <Link href="/admin/library" className="bg-brand-surface border border-brand-card rounded-lg p-5 text-center hover:border-brand-bronze/30 transition-colors group">
          <span className="text-2xl block mb-2">▤</span>
          <span className="text-sm font-body text-brand-cream/70 group-hover:text-brand-cream">Content Library</span>
        </Link>
      </div>
    </div>
  )
}
