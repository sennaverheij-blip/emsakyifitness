export default function SettingsPage() {
  return (
    <div className="max-w-lg">
      <h1 className="font-headline font-bold text-2xl mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="bg-brand-card border border-brand-slate rounded-lg p-6">
          <h2 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1">Name</label>
              <input className="brand-input" defaultValue="Marcus" />
            </div>
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1">Email</label>
              <input className="brand-input" defaultValue="client@demo.com" disabled />
            </div>
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1">Country</label>
              <input className="brand-input" defaultValue="Netherlands" />
            </div>
          </div>
        </div>

        <div className="bg-brand-card border border-brand-slate rounded-lg p-6">
          <h2 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/60 mb-4">Preferences</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1">Units</label>
              <select className="brand-input">
                <option>Metric (kg, cm)</option>
                <option>Imperial (lbs, in)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-brand-cream/50 font-body mb-1">Check-in reminder</label>
              <select className="brand-input">
                <option>Daily at 20:00</option>
                <option>Daily at 21:00</option>
                <option>Off</option>
              </select>
            </div>
          </div>
        </div>

        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  )
}
