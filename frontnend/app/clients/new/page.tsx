"use client";
import ClientForm from "@/components/ClientForm";
import { useClientCreate } from "@/hooks/clients/useClientCreate";
import Link from "next/link";

export default function NewClientPage() {
  const { mutate: createClient, isPending } = useClientCreate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-4">
      <div className="flex flex-col gap-4 items-center">
        {" "}
        <Link
          href="/clients"
          className="self-start mx-auto text-xl underline text-gray-500 hover:text-black transition"
        >
          Volver
        </Link>
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
