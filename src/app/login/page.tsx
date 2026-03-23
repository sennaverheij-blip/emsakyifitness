'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError(res.error === 'CredentialsSignin' ? 'Invalid email or password' : res.error)
      setLoading(false)
      return
    }

    // Fetch session to get role, then redirect
    const session = await fetch('/api/auth/session').then(r => r.json())
    const role = session?.user?.role

    if (role === 'main-coach') router.push('/admin/dashboard')
    else if (role === 'coach') router.push('/coach/dashboard')
    else router.push('/client/dashboard')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-black flex-col justify-center items-center p-16 border-r border-brand-card">
        <div className="max-w-md">
          <div className="font-headline font-bold text-3xl tracking-widest uppercase mb-4">
            <span className="text-brand-bronze">EMSAKYI</span>FITNESS
          </div>
          <p className="font-accent italic text-xl text-brand-cream/60 mb-12">
            The Presence Protocol
          </p>
          <div className="space-y-6">
            {['Phase 1 — The Audit', 'Phase 2 — The Forge', 'Phase 3 — The Operating System'].map((phase, i) => (
              <div key={phase} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full border border-brand-bronze/40 flex items-center justify-center text-xs font-headline font-bold text-brand-bronze">
                  {i + 1}
                </div>
                <span className="text-sm text-brand-cream/50 font-body">{phase}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-brand-surface">
        <div className="w-full max-w-sm">
          <h1 className="font-headline font-bold text-2xl mb-2">Enter The Protocol</h1>
          <p className="text-sm text-brand-cream/50 font-body mb-8">
            Sign in to access your portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1.5">Email</label>
              <input
                type="email"
                className="brand-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1.5">Password</label>
              <input
                type="password"
                className="brand-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 font-body">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !mt-6"
            >
              {loading ? 'Signing in...' : 'Enter The Protocol'}
            </button>
          </form>

          <p className="mt-6 text-xs text-brand-cream/30 font-body text-center">
            First time? Your coach will send you an invite.
          </p>
        </div>
      </div>
    </div>
  )
}
