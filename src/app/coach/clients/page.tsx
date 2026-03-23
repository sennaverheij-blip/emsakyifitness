'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CoachClients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/clients').then(r => r.json()).then(data => {
      setClients(Array.isArray(data) ? data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="animate-pulse bg-brand-card rounded-lg h-48" />

  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-6">My Clients</h1>
      <div className="space-y-3">
        {clients.map((c: any) => (
          <Link key={c.id} href={`/coach/clients/${c.id}`}
            className="flex items-center justify-between p-5 bg-brand-card border border-brand-slate rounded-lg hover:border-brand-bronze/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-bronze/10 border border-brand-bronze/30 flex items-center justify-center text-sm font-headline font-bold text-brand-bronze">
                {(c.name || '?')[0]}
              </div>
              <div>
                <p className="font-headline font-semibold text-sm group-hover:text-brand-bronze transition-colors">{c.name}</p>
                <p className="text-xs text-brand-cream/40">{c.email} · {c.tier}</p>
              </div>
            </div>
            <span className="text-xs text-brand-bronze font-headline font-semibold">View →</span>
          </Link>
        ))}
        {clients.length === 0 && (
          <div className="bg-brand-card border border-brand-slate rounded-lg p-8 text-center">
            <p className="text-brand-cream/40 font-body text-sm">No clients assigned yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
