'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

type NavItem = { label: string; href: string; icon: string }

export default function Sidebar({ items, role }: { items: NavItem[]; role: string }) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-brand-black border-r border-brand-card min-h-screen fixed left-0 top-0 z-40">
        <div className="p-6 border-b border-brand-card">
          <div className="font-headline font-bold text-sm tracking-widest uppercase">
            <span className="text-brand-bronze">EMSAKYI</span>FITNESS
          </div>
          <p className="text-[10px] text-brand-cream/30 font-body mt-1 uppercase tracking-wider">{role}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded text-sm font-body transition-all ${
                  active
                    ? 'bg-brand-bronze/10 text-brand-bronze border-l-2 border-brand-bronze'
                    : 'text-brand-cream/60 hover:text-brand-cream hover:bg-brand-surface'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-brand-card">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-body text-brand-cream/40 hover:text-red-400 hover:bg-brand-surface transition-all"
          >
            <span>↗</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-black border-t border-brand-card flex justify-around py-2">
        {items.slice(0, 5).map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-body ${
                active ? 'text-brand-bronze' : 'text-brand-cream/40'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
