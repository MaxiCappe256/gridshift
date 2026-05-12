"use client";

import { DebtStatusBadge } from "@/components/DebtStatusBadge";
import { useClients } from "@/hooks/clients/useClients";
import Link from "next/link";
import { useState } from "react";

export default function ClientsPage() {
  const { data, isLoading, isError } = useClients();

  const [search, setSearch] = useState("");

  const clients = data?.data?.filter((client) =>
    `${client.name} ${client.surname}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  if (isLoading) return <p className="p-6">Cargando clientes...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error al cargar los clientes </p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="h1">Clientes</h1>
          <p className="subtle">
            Total: <span className="font-semibold text-slate-700">{data?.total}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input sm:w-[360px]"
          />
          <Link href="/clients/new" className="btn btn-primary w-full sm:w-auto">
            Crear cliente
          </Link>
          <Link href="/dashboard" className="btn btn-ghost w-full sm:w-auto">
            Volver
          </Link>
        </div>
      </div>

      {!clients?.length ? (
        <div className="card card-pad text-center">
          <p className="text-slate-600 font-semibold">No hay clientes…</p>
          <p className="subtle mt-1">Creá tu primer cliente para empezar a agendar.</p>
        </div>
      ) : (
        <ul className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {clients?.map((client: any) => {
            return (
              <li key={client.id} className="card card-hover">
                <Link className="block card-pad" href={`/clients/${client.id}`}>
                  <div className="flex flex-col gap-3">
                    <p className="font-display text-xl font-extrabold tracking-tight text-slate-900 leading-snug whitespace-normal wrap-break-word">
                      {client.name} {client.surname}
                    </p>

                    <div className="w-fit max-w-full">
                      <DebtStatusBadge count={client.debtCount} />
                    </div>

                    <p className="subtle">Ficha del cliente</p>

                    <div className="pt-3 mt-1 border-t border-slate-200/70 flex items-center justify-between text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Ver detalles
                      </span>
                      <span className="text-slate-400">→</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
