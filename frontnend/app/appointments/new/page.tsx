'use client';
import AppointmentForm from '@/components/AppointmentForm';
import { useAppointmentsCreate } from '@/hooks/appointments/useAppointmentsCreate';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function NewAppointmentPage() {
  const params = useSearchParams();

  const day = params.get('day');
  const hour = params.get('hour');

  const isFromCalendar = Boolean(day && hour);

  const { mutate: createAppointment, isPending } = useAppointmentsCreate();

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
          Crear turno
        </h1>

        <AppointmentForm
          defaultValues={{
            day: day ?? '',
            hour: hour ?? '',
          }}
          onSubmit={(data) => {
            createAppointment(data);
          }}
          submitLabel={isPending ? 'Creando...' : 'Crear'}
          lockDateTime={isFromCalendar}
        />
      </div>
    </div>
  );
}
