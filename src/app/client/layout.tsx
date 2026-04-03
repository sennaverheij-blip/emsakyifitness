import Sidebar from '@/components/portal/Sidebar'

const clientNav = [
  { label: 'Dashboard', href: '/client/dashboard', icon: '◈' },
  { label: 'My Plans', href: '/client/plans', icon: '◆' },
  { label: 'Log Today', href: '/client/log', icon: '✎' },
  { label: 'Progress', href: '/client/progress', icon: '◉' },
  { label: 'Settings', href: '/client/settings', icon: '⚙' },
]

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,97,0.03)_0%,_transparent_60%)] pointer-events-none" />
      <Sidebar items={clientNav} role="Client Portal" />
      <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0 relative">
        <div className="max-w-[1200px] mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
