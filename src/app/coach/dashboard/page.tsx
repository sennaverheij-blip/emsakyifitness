'use client'

const demoClients = [
  { name: 'Marcus', phase: 2, week: 6, lastCheckIn: '2h ago', compliance: 92, status: 'ON TRACK' },
  { name: 'James', phase: 2, week: 4, lastCheckIn: '5h ago', compliance: 85, status: 'ON TRACK' },
  { name: 'Daniel', phase: 1, week: 2, lastCheckIn: '3 days', compliance: 60, status: 'NEEDS ATTENTION' },
  { name: 'Thomas', phase: 3, week: 14, lastCheckIn: '1h ago', compliance: 96, status: 'ON TRACK' },
  { name: 'Alex', phase: 1, week: 1, lastCheckIn: 'Never', compliance: 0, status: 'INACTIVE' },
]

const statusColors: Record<string, string> = {
  'ON TRACK': 'text-brand-bronze bg-brand-bronze/10 border-brand-bronze/30',
  'NEEDS ATTENTION': 'text-brand-orange bg-brand-orange/10 border-brand-orange/30',
  'CALL DUE': 'text-brand-gold bg-brand-gold/10 border-brand-gold/30',
  'INACTIVE': 'text-brand-slate bg-brand-slate/10 border-brand-slate/30',
}

export default function CoachDashboard() {
  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-1">Your Clients</h1>
      <p className="text-sm text-brand-cream/50 font-body mb-8">Week of 24 March 2026</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active clients', value: '4' },
          { label: 'Avg compliance', value: '83%' },
          { label: 'Calls this week', value: '3' },
          { label: 'Pending check-ins', value: '2' },
        ].map((s) => (
          <div key={s.label} className="bg-brand-card border border-brand-slate rounded-lg p-5">
            <div className="font-headline font-bold text-xl text-brand-bronze">{s.value}</div>
            <div className="text-xs text-brand-cream/40 font-body mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Client roster */}
      <div className="bg-brand-card border border-brand-slate rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-brand-slate text-xs text-brand-cream/40 uppercase tracking-wider">
                <th className="text-left p-4">Client</th>
                <th className="text-center p-4">Phase</th>
                <th className="text-center p-4">Week</th>
                <th className="text-center p-4 hidden sm:table-cell">Last Check-in</th>
                <th className="text-center p-4 hidden md:table-cell">Compliance</th>
                <th className="text-center p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-slate/50">
              {demoClients.map((c) => (
                <tr key={c.name} className="hover:bg-brand-surface/50 transition-colors">
                  <td className="p-4 font-headline font-semibold">{c.name}</td>
                  <td className="p-4 text-center text-brand-cream/60">{c.phase}</td>
                  <td className="p-4 text-center text-brand-cream/60">{c.week}</td>
                  <td className="p-4 text-center text-brand-cream/50 hidden sm:table-cell">{c.lastCheckIn}</td>
                  <td className="p-4 text-center hidden md:table-cell">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-brand-surface rounded-full h-1.5">
                        <div className="bg-brand-bronze h-1.5 rounded-full" style={{ width: `${c.compliance}%` }} />
                      </div>
                      <span className="text-xs text-brand-cream/50">{c.compliance}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] font-headline font-semibold uppercase tracking-wider px-2 py-1 rounded border ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <a href="#" className="text-xs text-brand-bronze hover:text-brand-gold transition-colors font-headline font-semibold">
                      View →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today's agenda */}
      <div className="mt-8">
        <h2 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-4">Today&apos;s Calls</h2>
        <div className="space-y-3">
          {[
            { client: 'Marcus', time: '19:00', zoom: '#' },
            { client: 'Thomas', time: '20:00', zoom: '#' },
          ].map((call) => (
            <div key={call.client} className="bg-brand-card border border-brand-slate border-l-4 border-l-brand-bronze rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-headline font-semibold text-sm">{call.client}</p>
                <p className="text-xs text-brand-cream/50 font-body">{call.time} CET</p>
              </div>
              <a href={call.zoom} className="text-xs text-brand-bronze hover:text-brand-gold font-headline font-semibold">
                Join Call →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
