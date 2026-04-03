'use client'

import { useEffect, useState } from 'react'
import PasswordChange from '@/components/portal/PasswordChange'

export default function CoachSettings() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(data => {
      if (data.name) setName(data.name)
      if (data.email) setEmail(data.email)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch('/api/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const data = await res.json()
      setMsg(data.success ? 'Saved!' : (data.error || 'Failed to save'))
    } catch {
      setMsg('Network error.')
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="max-w-lg"><div className="bg-brand-card border border-brand-slate rounded-lg p-6 animate-pulse h-48" /></div>
  }

  return (
    <div className="max-w-lg">
      <h1 className="font-headline font-bold text-2xl mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="bg-brand-card border border-brand-slate rounded-lg p-6">
          <h2 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1">Name</label>
              <input className="brand-input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1">Email</label>
              <input className="brand-input" value={email} disabled />
            </div>
          </div>
        </div>

        <PasswordChange />

        {msg && (
          <p className={`text-sm font-body ${msg.includes('error') || msg.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>{msg}</p>
        )}

        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
