'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Client = {
  id: string; name: string; compliance: number; status: string;
  lastCheckIn: string | null; daysSinceCheckIn: number | null;
  tier: string;
}

const statusColors: Record<string, string> = {
  'ON TRACK': 'text-green-400 bg-green-400/10 border-green-400/30',
  'NEEDS ATTENTION': 'text-brand-orange bg-brand-orange/10 border-brand-orange/30',
  'INACTIVE': 'text-brand-slate bg-brand-slate/10 border-brand-slate/30',
  'NEW': 'text-brand-bronze bg-brand-bronze/10 border-brand-bronze/30',
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

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-headline font-bold text-2xl">Your Clients</h1>
        <Link href="/admin/clients/new" className="btn-primary !py-2.5 !px-5 !text-sm">
          + Add Client
        </Link>
      </div>
      <p className="text-sm text-brand-cream/50 font-body mb-8">
        {new Date().toLocaleDateString('en', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active clients', value: String(activeClients.length) },
          { label: 'Avg compliance', value: `${avgCompliance}%` },
          { label: 'Needs attention', value: String(needsAttention) },
          { label: 'Total clients', value: String(clients.length) },
        ].map((s) => (
          <div key={s.label} className="bg-brand-card border border-brand-slate rounded-lg p-5">
            <div className="font-headline font-bold text-xl text-brand-bronze">{s.value}</div>
            <div className="text-xs text-brand-cream/40 font-body mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Client roster */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="bg-brand-card border border-brand-slate rounded-lg p-6 animate-pulse h-16" />)}
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-brand-card border border-brand-slate rounded-lg p-12 text-center">
          <p className="text-brand-cream/40 font-body">No clients yet.</p>
        </div>
      ) : (
        <div className="bg-brand-card border border-brand-slate rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-brand-slate text-xs text-brand-cream/40 uppercase tracking-wider">
                  <th className="text-left p-4">Client</th>
                  <th className="text-center p-4 hidden sm:table-cell">Last Check-in</th>
                  <th className="text-center p-4 hidden md:table-cell">Compliance</th>
                  <th className="text-center p-4">Status</th>
                  <th className="text-right p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-slate/50">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-brand-surface/50 transition-colors">
                    <td className="p-4">
                      <Link href={`/coach/clients/${c.id}`} className="font-headline font-semibold hover:text-brand-bronze transition-colors">
                        {c.name || 'Unnamed'}
                      </Link>
                    </td>
                    <td className="p-4 text-center text-brand-cream/50 hidden sm:table-cell">{formatDate(c.lastCheckIn)}</td>
                    <td className="p-4 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-brand-surface rounded-full h-1.5">
                          <div className="bg-brand-bronze h-1.5 rounded-full" style={{ width: `${c.compliance}%` }} />
                        </div>
                        <span className="text-xs text-brand-cream/50">{c.compliance}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] font-headline font-semibold uppercase tracking-wider px-2 py-1 rounded border ${statusColors[c.status] || statusColors['INACTIVE']}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/coach/clients/${c.id}`} className="text-xs text-brand-bronze hover:text-brand-gold transition-colors font-headline font-semibold">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
