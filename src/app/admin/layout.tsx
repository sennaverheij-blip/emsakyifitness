import Sidebar from '@/components/portal/Sidebar'

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: '◈' },
  { label: 'All Clients', href: '/admin/clients', icon: '◆' },
  { label: 'Coaches', href: '/admin/coaches', icon: '◇' },
  { label: 'Library', href: '/admin/library', icon: '▤' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-black relative">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,97,0.03)_0%,_transparent_60%)] pointer-events-none" />
      <Sidebar items={adminNav} role="Main Coach" />
      <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0 relative">
        <div className="max-w-[1200px] mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
