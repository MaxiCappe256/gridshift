"use client";

import { useParams, useRouter } from "next/navigation";
import { useClient } from "@/hooks/clients/useClient";
import ClientForm from "@/components/ClientForm";
import { api } from "@/lib/api";
import Link from "next/link";

export default function EditClientPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: client, isLoading, isError } = useClient(id as string);

  if (isLoading) return <p>Cargando cliente...</p>;
  if (isError || !client) return <p>Error al cargar cliente</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-4">
      <div className="w-full max-w-md">
        <Link
          href="/clients"
          className="block text-center w-full text-xl underline text-gray-500 hover:text-black transition mb-4"
        >
          Volver
        </Link>
        <ClientForm
          defaultValues={client}
          submitLabel="Guardar cambios"
          clientId={id as string}
          onSubmit={async (data) => {
            await api.patch(`/clients/${id}`, data);
            router.push("/clients");
          }}
          onDelete={async (clientId) => {
            await api.delete(`/clients/${clientId}`);
          }}
        />
      </div>
    </div>
  );
}
