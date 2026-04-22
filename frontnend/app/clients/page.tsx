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
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-4xl sm:text-left text-center mb-5 font-bold underline">
          Clientes
        </h1>

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md mb-4 w-full max-w-md"
        />
        <div className="flex justify-between items-center gap-4">
          <Link
            href="/clients/new"
            className="bg-green-700 w-[50%] sm:w-auto text-center cursor-pointer hover:scale-110 hover:bg-green-800 transition text-white py-2 px-4 rounded-lg text-lg"
          >
            Crear Cliente
          </Link>
          <Link
            href="/"
            className="bg-slate-700 w-[50%] sm:w-auto text-center cursor-pointer hover:scale-110 hover:bg-slate-800 transition text-white py-2 px-4 rounded-lg text-lg"
          >
            Volver
          </Link>
        </div>
      </div>

      <h3 className="mt-4 text-2xl">
        Total clientes:<span className="font-bold"> {data?.total}</span>{" "}
      </h3>

      {!clients?.length ? (
        <p className="text-red-500 mt-5">No hay clientes...</p>
      ) : (
        <ul className="list-none mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients?.map((client: any) => (
            <li
              key={client.id}
              className="border p-2 rounded-xl shadow-sm bg-white font-bold text-center flex flex-col justify-center gap-2 hover:shadow-md transition-shadow"
            >
              <Link
                className="hover:underline hover:scale-105 transition-all"
                href={`/clients/${client.id}`}
              >
                <strong className="">
                  {client.name}, {client.surname}
                </strong>

                <div className="flex items-center justify-center">
                  <DebtStatusBadge count={client.debtCount} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
