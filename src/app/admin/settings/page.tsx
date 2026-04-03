'use client'

import PasswordChange from '@/components/portal/PasswordChange'
import PageWrapper from '@/components/portal/PageWrapper'

export default function AdminSettings() {
  return (
    <PageWrapper>
      <div className="max-w-2xl">
        <h1 className="font-headline font-bold text-2xl mb-6">System Settings</h1>

        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/40 mb-4">Automation Rules</h2>
            <div className="space-y-3">
              {[
                { label: 'Notify coach when client misses check-in for 3 days', enabled: true },
                { label: 'Remind client of upcoming call (24h before)', enabled: true },
                { label: 'Send re-engagement message after 7 days inactivity', enabled: true },
                { label: 'Flag client when compliance drops below 60% for 5 days', enabled: false },
              ].map((rule) => (
                <label key={rule.label} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl cursor-pointer hover:bg-white/[0.04] transition-colors">
                  <span className="text-sm font-body text-brand-cream/60 pr-4">{rule.label}</span>
                  <input type="checkbox" defaultChecked={rule.enabled} className="w-5 h-5 accent-[#C9A961] rounded" />
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="font-headline font-semibold text-sm uppercase tracking-wider text-brand-cream/40 mb-4">API Keys</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-brand-cream/40 font-body mb-1">Anthropic API Key (for AI generation)</label>
                <input className="brand-input" type="password" placeholder="sk-ant-..." />
              </div>
              <div>
                <label className="block text-xs text-brand-cream/40 font-body mb-1">Calendly URL</label>
                <input className="brand-input" placeholder="https://calendly.com/..." />
              </div>
            </div>
          </div>

          <PasswordChange />

          <button className="btn-primary">Save Settings</button>
        </div>
      </div>
    </PageWrapper>
  )
}
