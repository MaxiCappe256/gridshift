"use client";

import { useParams, useRouter } from "next/navigation";
import { useClient } from "@/hooks/clients/useClient";
import ClientForm from "@/components/ClientForm";
import { api } from "@/lib/api";
import Link from "next/link";
import { useClientUpdate } from "@/hooks/clients/useClientUpdate";

export default function EditClientPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: client, isLoading, isError } = useClient(id as string);
  const { mutateAsync: updateClient } = useClientUpdate();

  if (isLoading) return <p>Cargando cliente...</p>;
  if (isError || !client) return <p>Error al cargar cliente</p>;

  return (
    <div className="space-y-6">
      <Link href="/clients" className="btn btn-ghost w-fit">
        ← Volver
      </Link>
      <div className="w-full max-w-md mx-auto">
        <ClientForm
          defaultValues={client}
          submitLabel="Guardar cambios"
          clientId={id as string}
          onSubmit={async (data) => {
            await updateClient({
              id: id as string,
              data: data,
            });
          }}
          onDelete={async (clientId) => {
            await api.delete(`/clients/${clientId}`);
          }}
        />
      </div>
    </div>
  );
}
