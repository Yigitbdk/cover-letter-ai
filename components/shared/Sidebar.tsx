'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '⊞' },
  { href: '/generate', label: 'New Application', icon: '✦' },
]

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-4 z-50 md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300"
        style={{ 
          backgroundColor: '#f97316',
          left: open ? '210px' : '16px'
        }}
        onClick={() => setOpen(!open)}
      >
        <span className="text-white text-lg">{open ? '✕' : '☰'}</span>
      </button>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 flex flex-col z-40 transition-transform duration-300 md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: '#1a1614', borderRight: '1px solid #2d2420' }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: '#2d2420' }}>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: '#f97316' }}
            >
              C
            </div>
            <span className="font-semibold text-white">Cover Craft</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: isActive ? '#f97316' : 'transparent',
                  color: isActive ? '#ffffff' : '#9c8880',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t" style={{ borderColor: '#2d2420' }}>
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg mb-2"
            style={{ backgroundColor: '#2d2420' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: '#f97316' }}
            >
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="w-full text-left px-3 py-2 text-xs rounded-lg transition-all duration-200 hover:bg-red-500/10"
            style={{ color: '#9c8880' }}
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}