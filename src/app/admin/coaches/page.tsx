export default function CoachManagement() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-headline font-bold text-2xl">Coach Management</h1>
        <button className="btn-primary !text-sm !py-2.5">+ Add Coach</button>
      </div>

      <div className="space-y-4">
        {[
          { name: 'Emin', email: 'emin@emsakyifitness.com', clients: 8, role: 'Main Coach' },
          { name: 'Coach Demo', email: 'coach@emsakyifitness.com', clients: 4, role: 'Coach' },
        ].map((coach) => (
          <div key={coach.email} className="bg-brand-card border border-brand-slate rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-bronze/10 border border-brand-bronze/30 flex items-center justify-center text-lg font-headline font-bold text-brand-bronze">
                {coach.name[0]}
              </div>
              <div>
                <p className="font-headline font-semibold">{coach.name}</p>
                <p className="text-xs text-brand-cream/50 font-body">{coach.email}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-bronze/10 text-brand-bronze border border-brand-bronze/30 font-headline font-semibold uppercase tracking-wider">
                    {coach.role}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-brand-surface text-brand-cream/50 border border-brand-slate">
                    {coach.clients} clients
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary !py-2 !px-4 !text-xs">Assign Clients</button>
              <button className="btn-secondary !py-2 !px-4 !text-xs">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
