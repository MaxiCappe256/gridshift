'use client';
import ClientForm from '@/components/ClientForm';
import { useClientCreate } from '@/hooks/clients/useClientCreate';
import Link from 'next/link';

export default function NewClientPage() {
  const { mutate: createClient, isPending } = useClientCreate();

  return (
    <div className="h-screen overflow-y-hidden flex items-center justify-center">
      <div className="flex flex-col gap-5 justify-between items-center">
        <Link
          href="/clients"
          className="self-start mx-auto text-xl underline text-gray-500 hover:text-black transition"
        >
          Volver
        </Link>
        <h1 className="text-4xl font-bold underline text-center">
          Crear Cliente
        </h1>
        <ClientForm
          onSubmit={(data) => {
            createClient(data);
          }}
          submitLabel={isPending ? 'Creando...' : 'Crear'}
        />
      </div>
    </div>
  );
}
