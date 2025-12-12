'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserProfile } from '@/lib/auth'

interface AdminSidebarProps {
  user: UserProfile
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Posts', href: '/admin/posts', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { name: 'Events', href: '/admin/events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Publications', href: '/admin/publications', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Users', href: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', roles: ['super_admin'] },
    { name: 'Shop', href: '/admin/shop', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', badge: 'Soon', roles: ['super_admin', 'shop_admin'] },
    { name: 'Discussions', href: '/admin/discussions', icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z', badge: 'Soon', roles: ['super_admin', 'discussion_admin'] },
  ]

  const visibleNav = navigation.filter(item => 
    !item.roles || item.roles.includes(user.role)
  )

  return (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/admin" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Kamil Admin</h1>
            <p className="text-gray-400 text-xs">Management Portal</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {visibleNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group
                ${isActive 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-800'
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <span className="ml-auto text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 px-4 py-3 bg-slate-800 rounded-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user.full_name?.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">{user.full_name || 'Admin'}</p>
            <p className="text-gray-400 text-xs capitalize">{user.role.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}