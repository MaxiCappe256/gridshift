'use client';

import { useLogout } from '@/hooks/auth/useLogout';
import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';

type UserTokenPayload = {
  email?: string;
  firstName?: string;
  fullName?: string;
  given_name?: string;
  family_name?: string;
  lastName?: string;
  name?: string;
  surname?: string;
};

const decodeTokenPayload = (token: string): UserTokenPayload | null => {
  try {
    const payload = token.split('.')[1];

    if (!payload) {
      return null;
    }

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    );

    return JSON.parse(decoded) as UserTokenPayload;
  } catch {
    return null;
  }
};

const formatUserName = (payload: UserTokenPayload | null) => {
  if (!payload) {
    return '';
  }

  const firstName = payload.firstName ?? payload.given_name ?? payload.name;
  const lastName = payload.lastName ?? payload.family_name ?? payload.surname;

  if (firstName && lastName) {
    return `${lastName}, ${firstName}`;
  }

  return payload.fullName ?? payload.name ?? payload.email ?? '';
};

const getStoredUserFullName = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const storedFullName = localStorage.getItem('userFullName');

  if (storedFullName) {
    return storedFullName;
  }

  const token = localStorage.getItem('token');

  return token ? formatUserName(decodeTokenPayload(token)) : '';
};

const subscribeToUserFullName = () => () => {};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userFullName = useSyncExternalStore(
    subscribeToUserFullName,
    getStoredUserFullName,
    () => '',
  );
  const pathname = usePathname();

  const { mutate: logoutMutate, isPending } = useLogout();

  const navItems = [
    { href: '/dashboard', label: 'Turnos' },
    { href: '/clients', label: 'Clientes' },
    { href: '/debts', label: 'Deudas' },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="border-b border-slate-200/70 bg-white/70 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.05)]">
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="sm:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-700 shadow-sm hover:bg-white transition"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="text-lg leading-none font-bold">
                {isOpen ? '×' : '≡'}
              </span>
            </button>

            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2"
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                <span className="font-display text-lg font-extrabold text-slate-900">
                  A
                </span>
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-slate-900">
                Aphild
              </span>
              <span className="hidden md:inline-flex chip border-emerald-200/70 bg-emerald-50/60 text-emerald-800">
                Gym OS
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3.5 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {userFullName && (
              <span className="max-w-48 truncate rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                {userFullName}
              </span>
            )}
            <button
              className="btn btn-danger cursor-pointer"
              onClick={() => logoutMutate()}
              disabled={isPending}
            >
              {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div
          className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-200 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container-page pb-4">
            <div className="card card-pad">
              <div className="grid gap-2">
                {navItems.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== '/dashboard' &&
                      pathname?.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {userFullName && (
                  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                    {userFullName}
                  </div>
                )}

                <button
                  className="btn btn-danger mt-2"
                  onClick={() => logoutMutate()}
                  disabled={isPending}
                >
                  {isPending ? 'Cerrando sesión...' : 'Cerrar sesión'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
