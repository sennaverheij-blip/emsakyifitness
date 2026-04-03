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
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-brand-black/80 backdrop-blur-xl border-r border-white/[0.06] min-h-screen fixed left-0 top-0 z-40">
        <div className="p-6 border-b border-white/[0.06]">
          <div className="font-headline font-bold text-sm tracking-[0.2em] uppercase">
            <span className="text-gradient-bronze">EMSAKYI</span>
            <span className="text-brand-cream/60">FITNESS</span>
          </div>
          <p className="text-[10px] text-brand-cream/25 font-body mt-1.5 uppercase tracking-[0.15em]">{role}</p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 mt-2">
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body transition-all duration-200 ${
                  active
                    ? 'bg-brand-bronze/[0.08] text-brand-bronze shadow-[inset_0_0_0_1px_rgba(201,169,97,0.15)]'
                    : 'text-brand-cream/50 hover:text-brand-cream/80 hover:bg-white/[0.03]'
                }`}
              >
                <span className={`text-base transition-transform duration-200 ${active ? 'scale-110' : ''}`}>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-bronze" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-brand-cream/30 hover:text-red-400/80 hover:bg-red-400/[0.04] transition-all duration-200"
          >
            <span className="text-base">↗</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-black/90 backdrop-blur-xl border-t border-white/[0.06] flex justify-around py-1.5 px-2">
        {items.slice(0, 5).map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-lg text-[10px] font-body transition-all ${
                active ? 'text-brand-bronze' : 'text-brand-cream/35'
              }`}
            >
              <span className={`text-lg transition-transform duration-200 ${active ? 'scale-110' : ''}`}>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
