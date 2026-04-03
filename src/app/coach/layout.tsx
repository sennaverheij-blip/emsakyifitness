import Sidebar from '@/components/portal/Sidebar'

const coachNav = [
  { label: 'Dashboard', href: '/coach/dashboard', icon: '◈' },
  { label: 'Clients', href: '/coach/clients', icon: '◆' },
  { label: 'Settings', href: '/coach/settings', icon: '⚙' },
]

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,97,0.03)_0%,_transparent_60%)] pointer-events-none" />
      <Sidebar items={coachNav} role="Coach Portal" />
      <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0 relative">
        <div className="max-w-[1200px] mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
