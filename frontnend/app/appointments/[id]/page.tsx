"use client";

import { useAppointment } from "@/hooks/appointments/useAppointment";
import { useAppointmentUpdate } from "@/hooks/appointments/useAppointmentUpdate";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppointmentForm from "@/components/AppointmentForm";
import { useRemoveClient } from "@/hooks/appointments/useRemoveClient";

export default function EditAppointmentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const clientId = Number(searchParams.get("clientId"));
  const id = Number(params.id);

  const { data: appointment, isLoading } = useAppointment(id);
  const { mutate: updateAppointment, isPending } = useAppointmentUpdate(id);
  const { mutate: removeClient } = useRemoveClient();

  const client = appointment?.clients?.find((c: any) => c.id === clientId);

  if (isLoading || !appointment) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="btn btn-ghost w-fit">
        ← Volver
      </Link>

      <div className="text-center space-y-1">
        <h1 className="h1">Editar turno</h1>
        <p className="subtle">Actualizá el cliente, día u horario.</p>
      </div>

      <div className="flex justify-center">
        <AppointmentForm
          defaultValues={{
            clientId,
            day: appointment.day,
            hour: appointment.hour,
          }}
          onSubmit={({ day, hour }) => {
            updateAppointment({ day, hour });
          }}
          onDelete={() => {
            if (!clientId) return;

            if (confirm("¿Eliminar cliente de este turno?")) {
              removeClient({
                appointmentId: id,
                clientId: clientId,
              });

              router.push("/dashboard");
            }
          }}
          submitLabel={isPending ? "Editando..." : "Editar"}
          lockDateTime={false}
          clientName={client ? `${client.name} ${client.surname}` : ""}
        />
      </div>
    </div>
  );
}
