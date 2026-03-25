import Sidebar from '@/components/portal/Sidebar'

const coachNav = [
  { label: 'Dashboard', href: '/coach/dashboard', icon: '◈' },
  { label: 'Clients', href: '/coach/clients', icon: '◆' },
]

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black">
      <Sidebar items={coachNav} role="Coach Portal" />
      <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
        <div className="max-w-[1200px] mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
