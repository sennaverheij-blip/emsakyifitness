export default function AllClients() {
  const clients = [
    { name: 'Marcus', coach: 'Emin', phase: 2, week: 6, status: 'ON TRACK', tier: 'Elite', country: 'NL' },
    { name: 'James', coach: 'Emin', phase: 2, week: 4, status: 'ON TRACK', tier: 'Elite', country: 'UK' },
    { name: 'Daniel', coach: 'Emin', phase: 1, week: 2, status: 'NEEDS ATTENTION', tier: 'Elite', country: 'US' },
    { name: 'Thomas', coach: 'Coach Demo', phase: 3, week: 14, status: 'ON TRACK', tier: 'Elite', country: 'DE' },
    { name: 'Alex', coach: 'Coach Demo', phase: 1, week: 1, status: 'INACTIVE', tier: 'Community', country: 'NL' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline font-bold text-2xl">All Clients</h1>
        <button className="btn-primary !text-sm !py-2.5">+ Add Client</button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input className="brand-input !w-64" placeholder="Search clients..." />
        <select className="brand-input !w-40">
          <option>All Coaches</option>
          <option>Emin</option>
          <option>Coach Demo</option>
        </select>
        <select className="brand-input !w-40">
          <option>All Phases</option>
          <option>Phase 1</option>
          <option>Phase 2</option>
          <option>Phase 3</option>
        </select>
      </div>

      <div className="bg-brand-card border border-brand-slate rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-brand-slate text-xs text-brand-cream/40 uppercase tracking-wider">
                <th className="text-left p-4">Client</th>
                <th className="text-left p-4">Coach</th>
                <th className="text-center p-4">Phase</th>
                <th className="text-center p-4">Tier</th>
                <th className="text-center p-4">Country</th>
                <th className="text-center p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-slate/50">
              {clients.map((c) => (
                <tr key={c.name} className="hover:bg-brand-surface/50 transition-colors">
                  <td className="p-4 font-headline font-semibold">{c.name}</td>
                  <td className="p-4 text-brand-cream/60">{c.coach}</td>
                  <td className="p-4 text-center text-brand-cream/60">{c.phase}</td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded ${c.tier === 'Elite' ? 'bg-brand-bronze/10 text-brand-bronze' : 'bg-brand-surface text-brand-cream/50'}`}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="p-4 text-center text-brand-cream/50">{c.country}</td>
                  <td className="p-4 text-center text-xs font-headline uppercase tracking-wider text-brand-cream/50">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
