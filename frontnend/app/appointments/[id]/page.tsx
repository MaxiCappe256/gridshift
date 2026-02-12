'use client';
import { useAppointment } from '@/hooks/appointments/useAppointment';
import { useAppointmentUpdate } from '@/hooks/appointments/useAppointmentUpdate';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AppointmentForm from '@/components/AppointmentForm';

export default function EditAppointmentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const clientId = Number(searchParams.get('clientId'));
  const id = Number(params.id);

  const { data: appointment, isLoading } = useAppointment(id);
  const { mutate: updateAppointment, isPending } = useAppointmentUpdate(id);

  const client = appointment?.clients?.find((c) => c.id === clientId);

  if (isLoading || !appointment) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="h-screen overflow-y-hidden flex items-center justify-center">
      <div className="flex flex-col gap-5 justify-between items-center">
        <Link
          href="/"
          className="self-start mx-auto text-xl underline text-gray-500 hover:text-black transition"
        >
          Volver
        </Link>
        <h1 className="text-4xl font-bold underline text-center">
          Editar turno
        </h1>

        <AppointmentForm
          defaultValues={{
            clientId,
            day: appointment.day,
            hour: appointment.hour,
          }}
          onSubmit={({ day, hour }) => {
            updateAppointment({ day, hour });
          }}
          submitLabel={isPending ? 'Editando...' : 'Editar'}
          lockDateTime={false}
          clientName={client ? `${client.name} ${client.surname}` : ''}
        />
      </div>
    </div>
  );
}
