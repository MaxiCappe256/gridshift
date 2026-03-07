"use client";
import { useAppointment } from "@/hooks/appointments/useAppointment";
import { useAppointmentUpdate } from "@/hooks/appointments/useAppointmentUpdate";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import AppointmentForm from "@/components/AppointmentForm";
import { useAppointmentDelete } from "@/hooks/appointments/useAppointmentDelete";

export default function EditAppointmentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const clientId = Number(searchParams.get("clientId"));
  const id = Number(params.id);

  const { data: appointment, isLoading } = useAppointment(id);
  const { mutate: updateAppointment, isPending } = useAppointmentUpdate(id);
  const { mutate: deleteAppointment } = useAppointmentDelete();

  const client = appointment?.clients?.find((c: any) => c.id === clientId);

  if (isLoading || !appointment) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-4">
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
          onDelete={() => deleteAppointment(Number(id))}
          submitLabel={isPending ? "Editando..." : "Editar"}
          lockDateTime={false}
          clientName={client ? `${client.name} ${client.surname}` : ""}
        />
      </div>
    </div>
  );
}
