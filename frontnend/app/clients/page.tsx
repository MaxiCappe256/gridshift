'use client';

import { useClients } from '@/hooks/clients/useClients';
import Link from 'next/link';

export default function ClientsPage() {
  const { data, isLoading, isError } = useClients();
  if (isLoading) return <p className="p-6">Cargando clientes...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error al cargar los clientes </p>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold underline">Clientes</h1>
        <div className="flex justify-between items-center gap-4">
          <Link
            href="/clients/new"
            className="bg-green-700 cursor-pointer hover:scale-110 hover:bg-green-800 transition text-white py-2 px-4 rounded-lg text-lg"
          >
            Crear Cliente
          </Link>
          <Link
            href="/"
            className="bg-slate-700 cursor-pointer hover:scale-110 hover:bg-slate-800 transition text-white py-2 px-4 rounded-lg text-lg"
          >
            Volver
          </Link>
        </div>
      </div>

      {!data?.length ? (
        <p className="text-red-500 mt-5">No hay clientes...</p>
      ) : (
        <ul className="list-none mt-4 grid grid-cols-4 gap-3">
          {data?.map((client: any) => (
            <li
              key={client.id}
              className="border p-4 rounded font-bold text-center flex flex-col"
            >
              <Link
                className="hover:underline hover:scale-105 transition-all"
                href={`/clients/${client.id}`}
              >
                <strong className="">
                  {client.name}, {client.surname}
                </strong>
              </Link>
              {client.paid ? (
                <span className="text-green-600 font-semibold">Pagó</span>
              ) : (
                <span className="text-red-600 font-semibold">No pagó</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
