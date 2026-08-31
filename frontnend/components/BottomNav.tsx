'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      label: 'Turnos',
      icon: (active: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? '2.3' : '1.8'}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 transition-transform duration-200"
        >
          <rect width="18" height="18" x="3" y="4" rx="3" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      ),
    },
    {
      href: '/clients',
      label: 'Clientes',
      icon: (active: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? '2.3' : '1.8'}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 transition-transform duration-200"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      href: '/debts',
      label: 'Deudas',
      icon: (active: boolean) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={active ? '2.3' : '1.8'}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 transition-transform duration-200"
        >
          <rect width="20" height="14" x="2" y="5" rx="3" />
          <line x1="2" x2="22" y1="10" y2="10" />
          <circle cx="7" cy="15" r="1" />
          <path d="M12 15h5" />
        </svg>
      ),
    },
  ] as const;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40">
      <div className="border-t border-slate-200/80 dark:border-slate-800/90 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.5)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <nav className="flex items-center justify-around gap-1 max-w-md mx-auto">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-2xl transition-all duration-200 active:scale-95 select-none ${
                  active
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/15'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.icon(active)}
                <span
                  className={`text-[11px] mt-1 tracking-tight font-semibold transition-colors ${
                    active ? 'font-bold' : ''
                  }`}
                >
                  {item.label}
                </span>
                {active && (
                  <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-emerald-500 ring-2 ring-emerald-400/40" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
