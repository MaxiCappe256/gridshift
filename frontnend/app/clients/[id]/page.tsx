'use client';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppointment } from '@/hooks/appointments/useAppointment';
import AppointmentForm from '@/components/AppointmentForm';
import { useAppointmentUpdate } from '@/hooks/appointments/useAppointmentUpdate';

export default function EditClientPage() {
  const router = useRouter();

  // id del turno
  const { id } = useParams();
  const serachParams = useSearchParams();
  // id del turno convertido a number
  const appointmentId = Number(id);
  // id del cliente
  const clientId = Number(serachParams.get('clientId'));

  const { data: appointment } = useAppointment(appointmentId);
  const { mutate: updateAppointment } = useAppointmentUpdate(appointmentId);

  // buscamos el cliente en el turno
  const selectedClient = appointment?.clients?.find((c) => c.id === clientId);

  if (!selectedClient) return <p>Cargando...</p>;
  if (!appointment) return <p>Cargando...</p>;

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
          Editar Cliente
        </h1>
        <AppointmentForm
          defaultValues={{
            day: appointment.day,
            hour: appointment.hour,
            clientId: clientId,
          }}
          onSubmit={({ day, hour }) => {
            updateAppointment({ day, hour });
          }}
          submitLabel="Editar"
          lockDateTime={false}
          clientName={`${selectedClient.name} ${selectedClient.surname}`}
        />
      </div>
    </div>
  );
}

// type Props = {
//   defaultValues?: Partial<AppointmentFormValues>;
//   onSubmit: (data: AppointmentFormValues) => void;
//   submitLabel?: string;
//   lockDateTime?: boolean;
// };
