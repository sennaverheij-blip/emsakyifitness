'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

type ClientData = {
  id: string; name: string; email: string; country: string | null;
  coach: { name: string } | null; tier: string;
  stats: {
    trainedDays: number; totalCheckIns: number; avgMood: number | null;
    avgEnergy: number | null; avgSleep: number | null;
    nutritionCompliance: number; streakDays: number;
  };
  moodTrend: { date: string; mood: number | null; energy: number | null; trained: boolean; nutrition: string | null; sleep: number | null }[];
  redFlags: string[];
  wins: string[];
  recentCheckIns: any[];
  onboarding: any;
}

export default function ClientDetail() {
  const { id } = useParams()
  const [client, setClient] = useState<ClientData | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'precall' | 'checkins' | 'onboarding'>('precall')
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [onboardingSending, setOnboardingSending] = useState(false)
  const [onboardingSent, setOnboardingSent] = useState(false)
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null)
  const [plansGenerating, setPlansGenerating] = useState(false)
  const [plansGenerated, setPlansGenerated] = useState(false)
  const [planStatus, setPlanStatus] = useState('')
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [planNotes, setPlanNotes] = useState('')
  const [planWeek, setPlanWeek] = useState('1')
  const [planPhase, setPlanPhase] = useState('1')

  useEffect(() => {
    fetch(`/api/clients/${id}`).then(r => r.json()).then(data => {
      if (data.error) setClient(null)
      else setClient(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [id])

  const generateAnalysis = async () => {
    setAiLoading(true)
    try {
      const res = await fetch('/api/ai/analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: id }),
      })
      const data = await res.json()
      setAiAnalysis(data.analysis || 'Could not generate analysis. Make sure ANTHROPIC_API_KEY is set.')
    } catch {
      setAiAnalysis('Failed to generate analysis. Check API configuration.')
    }
    setAiLoading(false)
  }

  const sendOnboarding = async () => {
    console.log('[ONBOARDING] Sending for client:', id)
    setOnboardingSending(true)
    try {
      const res = await fetch('/api/send-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: id }),
      })
      const data = await res.json()
      console.log('[ONBOARDING] Response:', data)
      if (data.success) {
        setOnboardingSent(true)
        setOnboardingUrl(data.onboardingUrl)
        alert(`Onboarding email sent to ${data.message?.split('to ')[1] || 'client'}`)
      } else {
        alert('Error: ' + (data.error || 'Unknown error'))
      }
    } catch (err) {
      console.error('[ONBOARDING] Error:', err)
      alert('Failed to send onboarding form. Check console for details.')
    }
    setOnboardingSending(false)
  }

  const generatePlan = async (planType: 'workout' | 'nutrition') => {
    setPlansGenerating(true)
    setPlanStatus(`Generating ${planType} plan... This takes ~20 seconds.`)

    try {
      const res = await fetch('/api/generate-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: id,
          week: parseInt(planWeek),
          phase: parseInt(planPhase),
          coachNotes: planNotes || undefined,
          type: planType,
        }),
      })
      const text = await res.text()
      let data
      try { data = JSON.parse(text) } catch {
        setPlanStatus(`Error: Server returned invalid response. It may have timed out.\n${text.substring(0, 200)}`)
        setPlansGenerating(false)
        return
      }
      if (data.success) {
        setPlanStatus(`${planType.charAt(0).toUpperCase() + planType.slice(1)} plan generated successfully!`)
      } else {
        setPlanStatus(`Error: ${data.error}`)
      }
    } catch (err: any) {
      setPlanStatus('Network error: ' + (err?.message || String(err)))
    }
    setPlansGenerating(false)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-brand-card border border-brand-slate rounded-lg p-8 animate-pulse h-24" />
        <div className="bg-brand-card border border-brand-slate rounded-lg p-8 animate-pulse h-48" />
      </div>
    )
  }

  if (!client) {
    return (
      <div className="text-center py-20">
        <h2 className="font-headline font-bold text-xl mb-2">Client not found</h2>
        <Link href="/admin/clients" className="text-brand-bronze text-sm">← Back to clients</Link>
      </div>
    )
  }

  const s = client.stats

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-bronze/20 to-brand-card border border-brand-bronze/30 flex items-center justify-center text-xl font-headline font-bold text-brand-bronze">
            {(client.name || '?')[0]}
          </div>
          <div>
            <h1 className="font-headline font-bold text-2xl">{client.name}</h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-brand-cream/40 font-body">{client.email}</span>
              {client.country && <span className="text-xs text-brand-cream/30">· {client.country}</span>}
              <span className={`text-[10px] font-headline font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                client.tier === 'elite' ? 'bg-brand-bronze/10 text-brand-bronze border border-brand-bronze/30' : 'bg-brand-surface text-brand-cream/50 border border-brand-slate'
              }`}>{client.tier}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={sendOnboarding} disabled={onboardingSending}
            style={{ position: 'relative', zIndex: 10 }}
            className="inline-flex items-center justify-center gap-2 bg-transparent text-brand-bronze font-headline font-semibold text-xs px-4 py-2.5 border-2 border-brand-bronze rounded-lg uppercase tracking-wide cursor-pointer transition-all duration-200 hover:bg-brand-bronze hover:text-brand-black">
            {onboardingSending ? 'Sending...' : onboardingSent ? 'Sent ✓' : 'Send Onboarding Form'}
          </button>
          <button type="button" onClick={() => setShowPlanForm(!showPlanForm)}
            style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(135deg, #C85A17, #D4AF37)', color: '#0A0A0A', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>
            {plansGenerated ? 'Plans Generated ✓' : 'Generate AI Plans'}
          </button>
          <button type="button" onClick={() => { setTab('precall'); generateAnalysis() }}
            style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(135deg, #C9A961, #D4AF37)', color: '#0A0A0A', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>
            Pre-Call Briefing
          </button>
        </div>
      </div>

      {/* Plan Generation Form */}
      {showPlanForm && (
        <div className="bg-brand-card border border-brand-bronze/30 rounded-lg p-6 mb-8">
          <h3 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-bronze mb-4">Generate AI Plans</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1.5">Week</label>
              <select className="brand-input" value={planWeek} onChange={e => setPlanWeek(e.target.value)}>
                {Array.from({ length: 16 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>Week {i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1.5">Phase</label>
              <select className="brand-input" value={planPhase} onChange={e => setPlanPhase(e.target.value)}>
                <option value="1">Phase 1 — The Audit</option>
                <option value="2">Phase 2 — The Forge</option>
                <option value="3">Phase 3 — The Operating System</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs text-brand-cream/50 font-body mb-1.5">
              Coach Notes <span className="text-brand-cream/30">(instructions for the AI — be specific)</span>
            </label>
            <textarea
              className="brand-input resize-none"
              rows={4}
              value={planNotes}
              onChange={e => setPlanNotes(e.target.value)}
              placeholder={"e.g. Focus on upper body hypertrophy this week. Client has a shoulder clicking issue — avoid overhead pressing. Increase protein to 200g. Client prefers training in the evening so structure carbs around that. No boxing."}
            />
          </div>
          {planStatus && (
            <div className="mb-4 p-4 bg-brand-surface rounded-lg border border-brand-slate">
              <p className="text-sm font-body text-brand-bronze">{planStatus}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => generatePlan('workout')} disabled={plansGenerating}
              style={{ background: 'linear-gradient(135deg, #C9A961, #D4AF37)', color: '#0A0A0A', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 600, fontSize: '14px', cursor: plansGenerating ? 'wait' : 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase' as const, opacity: plansGenerating ? 0.7 : 1 }}>
              {plansGenerating ? 'Generating...' : 'Generate Workout Plan'}
            </button>
            <button type="button" onClick={() => generatePlan('nutrition')} disabled={plansGenerating}
              style={{ background: 'linear-gradient(135deg, #C85A17, #D4AF37)', color: '#0A0A0A', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 600, fontSize: '14px', cursor: plansGenerating ? 'wait' : 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase' as const, opacity: plansGenerating ? 0.7 : 1 }}>
              {plansGenerating ? 'Generating...' : 'Generate Nutrition Plan'}
            </button>
            <button type="button" onClick={() => { setShowPlanForm(false); setPlanStatus('') }}
              style={{ background: 'transparent', color: '#F5F1E880', border: '1px solid #4A4A4A', padding: '12px 24px', borderRadius: '50px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {[
          { label: 'Trained', value: `${s.trainedDays}/${s.totalCheckIns > 0 ? s.totalCheckIns : '—'}`, sub: 'this week' },
          { label: 'Mood', value: s.avgMood !== null ? `${s.avgMood}` : '—', sub: 'avg' },
          { label: 'Energy', value: s.avgEnergy !== null ? `${s.avgEnergy}` : '—', sub: 'avg' },
          { label: 'Sleep', value: s.avgSleep !== null ? `${s.avgSleep}h` : '—', sub: 'avg' },
          { label: 'Nutrition', value: `${s.nutritionCompliance}/${s.totalCheckIns}`, sub: 'on plan' },
          { label: 'Streak', value: `${s.streakDays}`, sub: 'days' },
          { label: 'Check-ins', value: `${s.totalCheckIns}`, sub: 'last 7d' },
        ].map((stat) => (
          <div key={stat.label} className="bg-brand-card border border-brand-slate rounded-lg p-3 text-center">
            <div className="font-headline font-bold text-lg text-brand-bronze">{stat.value}</div>
            <div className="text-[10px] text-brand-cream/40 font-body uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-brand-card overflow-x-auto">
        {([
          ['precall', 'Pre-Call Overview'],
          ['checkins', 'Check-in History'],
          ['onboarding', 'Onboarding'],
        ] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`pb-3 px-1 text-sm font-headline font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
              tab === key ? 'text-brand-bronze border-b-2 border-brand-bronze' : 'text-brand-cream/40 hover:text-brand-cream/60'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {/* PRE-CALL OVERVIEW */}
      {tab === 'precall' && (
        <div className="space-y-6">
          {/* Red Flags & Wins */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-brand-card border border-brand-slate rounded-lg p-5">
              <h3 className="text-xs font-headline font-semibold uppercase tracking-wider text-red-400/80 mb-3 flex items-center gap-2">
                <span>⚠</span> Red Flags
              </h3>
              {client.redFlags.length > 0 ? (
                <ul className="space-y-2">
                  {client.redFlags.map((flag) => (
                    <li key={flag} className="text-sm font-body text-brand-cream/70 flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 shrink-0">•</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-brand-cream/40 font-body">No red flags this week</p>
              )}
            </div>

            <div className="bg-brand-card border border-brand-slate rounded-lg p-5">
              <h3 className="text-xs font-headline font-semibold uppercase tracking-wider text-green-400/80 mb-3 flex items-center gap-2">
                <span>✓</span> Wins to Acknowledge
              </h3>
              {client.wins.length > 0 ? (
                <ul className="space-y-2">
                  {client.wins.map((win) => (
                    <li key={win} className="text-sm font-body text-brand-cream/70 flex items-start gap-2">
                      <span className="text-green-400 mt-0.5 shrink-0">•</span>
                      {win}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-brand-cream/40 font-body">Keep building momentum</p>
              )}
            </div>
          </div>

          {/* Mood & Energy Trend */}
          <div className="bg-brand-card border border-brand-slate rounded-lg p-5">
            <h3 className="text-xs font-headline font-semibold uppercase tracking-wider text-brand-cream/60 mb-4">7-Day Trend</h3>
            {client.moodTrend.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="text-xs text-brand-cream/40 uppercase tracking-wider">
                      <th className="text-left pb-2">Day</th>
                      <th className="text-center pb-2">Mood</th>
                      <th className="text-center pb-2">Energy</th>
                      <th className="text-center pb-2">Sleep</th>
                      <th className="text-center pb-2">Trained</th>
                      <th className="text-center pb-2">Nutrition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-slate/30">
                    {client.moodTrend.map((day, i) => (
                      <tr key={i}>
                        <td className="py-2 text-brand-cream/60">{new Date(day.date).toLocaleDateString('en', { weekday: 'short', day: 'numeric' })}</td>
                        <td className="py-2 text-center">
                          <span className={`inline-block w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            (day.mood || 0) >= 7 ? 'bg-green-400/10 text-green-400' :
                            (day.mood || 0) >= 5 ? 'bg-brand-bronze/10 text-brand-bronze' :
                            'bg-red-400/10 text-red-400'
                          }`}>{day.mood || '—'}</span>
                        </td>
                        <td className="py-2 text-center">
                          <span className={`inline-block w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            (day.energy || 0) >= 7 ? 'bg-green-400/10 text-green-400' :
                            (day.energy || 0) >= 5 ? 'bg-brand-bronze/10 text-brand-bronze' :
                            'bg-red-400/10 text-red-400'
                          }`}>{day.energy || '—'}</span>
                        </td>
                        <td className="py-2 text-center text-brand-cream/50">{day.sleep ? `${day.sleep}h` : '—'}</td>
                        <td className="py-2 text-center">{day.trained ? <span className="text-green-400">✓</span> : <span className="text-brand-cream/20">✕</span>}</td>
                        <td className="py-2 text-center text-xs capitalize text-brand-cream/50">{day.nutrition || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-brand-cream/40 font-body">No check-in data yet</p>
            )}
          </div>

          {/* AI Pre-Call Analysis */}
          <div className="bg-brand-card border border-brand-slate rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-headline font-semibold uppercase tracking-wider text-brand-cream/60">AI Pre-Call Briefing</h3>
              <button onClick={generateAnalysis} disabled={aiLoading} className="btn-primary !py-2 !px-4 !text-xs">
                {aiLoading ? 'Generating...' : aiAnalysis ? 'Regenerate' : 'Generate Briefing'}
              </button>
            </div>
            {aiAnalysis ? (
              <div className="prose prose-sm prose-invert max-w-none text-brand-cream/70 font-body text-sm leading-relaxed whitespace-pre-wrap">
                {aiAnalysis}
              </div>
            ) : (
              <p className="text-sm text-brand-cream/40 font-body">
                Click &quot;Generate Briefing&quot; to get an AI-powered analysis of this client&apos;s last 7 days — including compliance trends, red flags, and talking points for your next call.
              </p>
            )}
          </div>

          {/* Coach Notes */}
          <div className="bg-brand-card border border-brand-slate rounded-lg p-5">
            <h3 className="text-xs font-headline font-semibold uppercase tracking-wider text-brand-cream/60 mb-3">Private Coach Notes</h3>
            <textarea className="brand-input resize-none" rows={3} placeholder="Add private notes before the call..." />
          </div>
        </div>
      )}

      {/* CHECK-IN HISTORY */}
      {tab === 'checkins' && (
        <div>
          {client.recentCheckIns.length > 0 ? (
            <div className="space-y-3">
              {client.recentCheckIns.map((ci: any) => (
                <div key={ci.id} className="bg-brand-card border border-brand-slate rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-headline font-semibold">
                      {new Date(ci.date).toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex gap-2">
                      {ci.mood && <span className="text-xs bg-brand-surface px-2 py-0.5 rounded text-brand-cream/50">Mood: {ci.mood}/10</span>}
                      {ci.energy && <span className="text-xs bg-brand-surface px-2 py-0.5 rounded text-brand-cream/50">Energy: {ci.energy}/10</span>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-body">
                    <div><span className="text-brand-cream/40">Trained:</span> <span className={ci.trained ? 'text-green-400' : 'text-brand-cream/50'}>{ci.trained ? 'Yes' : 'No'}</span></div>
                    <div><span className="text-brand-cream/40">Sleep:</span> <span className="text-brand-cream/70">{ci.sleepHours ? `${ci.sleepHours}h` : '—'}</span></div>
                    <div><span className="text-brand-cream/40">Nutrition:</span> <span className="text-brand-cream/70 capitalize">{ci.nutritionCompliance || '—'}</span></div>
                    <div><span className="text-brand-cream/40">Water:</span> <span className="text-brand-cream/70">{ci.waterMl ? `${(ci.waterMl / 1000).toFixed(1)}L` : '—'}</span></div>
                  </div>
                  {ci.notes && <p className="mt-3 text-sm text-brand-cream/50 font-body italic">&ldquo;{ci.notes}&rdquo;</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-brand-card border border-brand-slate rounded-lg p-8 text-center">
              <p className="text-brand-cream/40 font-body text-sm">No check-ins recorded yet</p>
            </div>
          )}
        </div>
      )}

      {/* ONBOARDING */}
      {tab === 'onboarding' && (
        <div className="bg-brand-card border border-brand-slate rounded-lg p-6">
          {client.onboarding ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] font-headline font-semibold uppercase tracking-wider px-2 py-1 rounded ${
                  client.onboarding.status === 'completed' ? 'bg-green-400/10 text-green-400 border border-green-400/30' :
                  'bg-brand-bronze/10 text-brand-bronze border border-brand-bronze/30'
                }`}>{client.onboarding.status}</span>
                {client.onboarding.submittedAt && (
                  <span className="text-xs text-brand-cream/40">Submitted {new Date(client.onboarding.submittedAt).toLocaleDateString()}</span>
                )}
              </div>
              {client.onboarding.extractedSummary ? (
                <pre className="text-sm text-brand-cream/60 font-body whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(JSON.parse(client.onboarding.extractedSummary), null, 2)}
                </pre>
              ) : client.onboarding.responsesJson ? (
                <pre className="text-sm text-brand-cream/60 font-body whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(JSON.parse(client.onboarding.responsesJson), null, 2)}
                </pre>
              ) : (
                <p className="text-sm text-brand-cream/40">Onboarding form sent but not yet completed.</p>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              {onboardingSent ? (
                <>
                  <div className="w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p className="text-green-400 font-headline font-semibold mb-2">Onboarding form sent!</p>
                  <p className="text-sm text-brand-cream/50 font-body mb-3">An email has been sent to {client.email}</p>
                  {onboardingUrl && (
                    <div className="bg-brand-surface rounded-lg p-3 mt-3">
                      <p className="text-xs text-brand-cream/40 font-body mb-1">Direct link (share manually if needed):</p>
                      <code className="text-xs text-brand-bronze break-all">{onboardingUrl}</code>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-brand-cream/40 font-body text-sm mb-4">No onboarding form sent yet</p>
                  <button type="button" onClick={sendOnboarding} disabled={onboardingSending}
                    style={{ position: 'relative', zIndex: 10, background: 'linear-gradient(135deg, #C9A961, #D4AF37)', color: '#0A0A0A', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>
                    {onboardingSending ? 'Sending...' : 'Send Onboarding Form'}
                  </button>
                  <p className="text-xs text-brand-cream/30 font-body mt-3">
                    This will send an email to {client.email} with a link to complete the onboarding questionnaire.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
