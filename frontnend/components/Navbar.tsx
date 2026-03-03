"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-200 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center relative">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="absolute font-bold top-4 left-6 sm:hidden text-2xl text-gray-700"
          >
            =
          </button>
        )}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute font-bold top-4 left-6 sm:hidden text-2xl text-gray-700"
          >
            X
          </button>
        )}

        <Link
          href="/"
          className="font-bold text-2xl text-gray-500 mb-4 sm:mb-0"
        >
          Aphild
        </Link>

        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col sm:flex sm:flex-row text-center mb-4 sm:mb-0 gap-8 font-medium`}
        >
          <li className="hover:underline">
            <Link href="/" onClick={() => setIsOpen(false)}>
              Turnos
            </Link>
          </li>
          <li className="hover:underline">
            <Link href="/clients" onClick={() => setIsOpen(false)}>
              Clientes
            </Link>
          </li>
        </ul>

        <div className={`${isOpen ? "block" : "hidden"} sm:block`}>
          <Link href="" className="text-red-500 underline font-semibold">
            Cerrar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
}
