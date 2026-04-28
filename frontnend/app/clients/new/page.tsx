"use client";
import ClientForm from "@/components/ClientForm";
import { useClientCreate } from "@/hooks/clients/useClientCreate";
import Link from "next/link";

export default function NewClientPage() {
  const { mutate: createClient, isPending } = useClientCreate();

  return (
    <div className="space-y-6">
      <Link href="/clients" className="btn btn-ghost w-fit">
        ← Volver
      </Link>

      <div className="text-center space-y-1">
        <h1 className="h1">Nuevo cliente</h1>
        <p className="subtle">Completá los datos para empezar a agendar.</p>
      </div>

      <div className="flex justify-center">
        <ClientForm
          onSubmit={(data) => {
            createClient(data);
          }}
          submitLabel={isPending ? "Creando..." : "Crear"}
        />
      </div>
    </div>
  );
}
