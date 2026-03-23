'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Client = {
  id: string; name: string; email: string; country: string | null;
  coach: { id: string; name: string } | null; tier: string;
  compliance: number; status: string; lastCheckIn: string | null;
  daysSinceCheckIn: number | null; onboardingStatus: string;
}

const statusColors: Record<string, string> = {
  'ON TRACK': 'text-green-400 bg-green-400/10 border-green-400/30',
  'NEEDS ATTENTION': 'text-brand-orange bg-brand-orange/10 border-brand-orange/30',
  'INACTIVE': 'text-brand-slate bg-brand-slate/10 border-brand-slate/30',
  'NEW': 'text-brand-bronze bg-brand-bronze/10 border-brand-bronze/30',
}

export default function AllClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/clients').then(r => r.json()).then(data => {
      setClients(Array.isArray(data) ? data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = clients.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (d: string | null) => {
    if (!d) return 'Never'
    const days = Math.floor((Date.now() - new Date(d).getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline font-bold text-2xl">All Clients</h1>
        <Link href="/admin/clients/new" className="btn-primary !text-sm !py-2.5">
          + Add Client
        </Link>
      </div>

      <div className="mb-6">
        <input
          className="brand-input !w-full md:!w-80"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-brand-card border border-brand-slate rounded-lg p-6 animate-pulse h-16" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-brand-card border border-brand-slate rounded-lg p-12 text-center">
          <p className="text-brand-cream/40 font-body">No clients found.</p>
          <Link href="/admin/clients/new" className="btn-primary !text-sm mt-4 inline-flex">+ Add Your First Client</Link>
        </div>
      ) : (
        <div className="bg-brand-card border border-brand-slate rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-brand-slate text-xs text-brand-cream/40 uppercase tracking-wider">
                  <th className="text-left p-4">Client</th>
                  <th className="text-left p-4 hidden md:table-cell">Coach</th>
                  <th className="text-center p-4 hidden sm:table-cell">Tier</th>
                  <th className="text-center p-4 hidden lg:table-cell">Compliance</th>
                  <th className="text-center p-4 hidden sm:table-cell">Last Check-in</th>
                  <th className="text-center p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-slate/50">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-brand-surface/50 transition-colors cursor-pointer group">
                    <td className="p-4">
                      <Link href={`/coach/clients/${c.id}`} className="block">
                        <span className="font-headline font-semibold group-hover:text-brand-bronze transition-colors">{c.name || 'Unnamed'}</span>
                        <span className="block text-xs text-brand-cream/40">{c.email}</span>
                      </Link>
                    </td>
                    <td className="p-4 text-brand-cream/60 hidden md:table-cell">{c.coach?.name || '—'}</td>
                    <td className="p-4 text-center hidden sm:table-cell">
                      <span className={`text-[10px] px-2 py-0.5 rounded ${c.tier === 'elite' ? 'bg-brand-bronze/10 text-brand-bronze' : c.tier === 'unassigned' ? 'bg-red-500/10 text-red-400' : 'bg-brand-surface text-brand-cream/50'}`}>
                        {c.tier}
                      </span>
                    </td>
                    <td className="p-4 text-center hidden lg:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-brand-surface rounded-full h-1.5">
                          <div className="bg-brand-bronze h-1.5 rounded-full" style={{ width: `${c.compliance}%` }} />
                        </div>
                        <span className="text-xs text-brand-cream/50">{c.compliance}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-brand-cream/50 text-xs hidden sm:table-cell">{formatDate(c.lastCheckIn)}</td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] font-headline font-semibold uppercase tracking-wider px-2 py-1 rounded border ${statusColors[c.status] || statusColors['INACTIVE']}`}>
                        {c.status}
                      </span>
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
