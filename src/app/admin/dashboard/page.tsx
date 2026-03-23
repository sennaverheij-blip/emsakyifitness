export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-headline font-bold text-2xl mb-1">Main Coach Dashboard</h1>
      <p className="text-sm text-brand-cream/50 font-body mb-8">Overview of your entire operation.</p>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total active clients', value: '12' },
          { label: 'Avg compliance', value: '84%' },
          { label: 'Calls this week', value: '8' },
          { label: 'Graduation-ready (P3)', value: '3' },
        ].map((s) => (
          <div key={s.label} className="bg-brand-card border border-brand-slate rounded-lg p-5">
            <div className="font-headline font-bold text-2xl text-brand-bronze">{s.value}</div>
            <div className="text-xs text-brand-cream/40 font-body mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Coach performance */}
      <div className="bg-brand-card border border-brand-slate rounded-lg p-6 mb-8">
        <h2 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-4">Coach Performance</h2>
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="text-xs text-brand-cream/40 uppercase tracking-wider border-b border-brand-slate">
              <th className="text-left pb-3">Coach</th>
              <th className="text-center pb-3">Clients</th>
              <th className="text-center pb-3">Avg Compliance</th>
              <th className="text-center pb-3">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-slate/50">
            <tr>
              <td className="py-3 font-headline font-semibold">Emin (You)</td>
              <td className="py-3 text-center text-brand-cream/60">8</td>
              <td className="py-3 text-center text-brand-bronze">88%</td>
              <td className="py-3 text-center text-brand-cream/50">Just now</td>
            </tr>
            <tr>
              <td className="py-3 font-headline font-semibold">Coach Demo</td>
              <td className="py-3 text-center text-brand-cream/60">4</td>
              <td className="py-3 text-center text-brand-bronze">79%</td>
              <td className="py-3 text-center text-brand-cream/50">3h ago</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Add New Client', href: '#' },
          { label: 'Assign Client', href: '#' },
          { label: 'Send Bulk Message', href: '#' },
          { label: 'Review Onboarding', href: '#' },
        ].map((a) => (
          <a key={a.label} href={a.href} className="bg-brand-surface border border-brand-card rounded-lg p-5 text-center hover:border-brand-bronze/30 transition-colors">
            <span className="text-sm font-body text-brand-cream/70">{a.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
