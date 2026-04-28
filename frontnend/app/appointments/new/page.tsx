"use client";
export const dynamic = "force-dynamic";

import AppointmentForm from "@/components/AppointmentForm";
import { useAppointmentsCreate } from "@/hooks/appointments/useAppointmentsCreate";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function NewAppointmentPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Content />
    </Suspense>
  );
}

function Content() {
  const params = useSearchParams();
  const day = params.get("day");
  const hour = params.get("hour");
  const isFromCalendar = Boolean(day && hour);
  const { mutate: createAppointment, isPending } = useAppointmentsCreate();

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="btn btn-ghost w-fit">
        ← Volver
      </Link>

      <div className="text-center space-y-1">
        <h1 className="h1">Crear turno</h1>
        <p className="subtle">
          {isFromCalendar ? "Turno preseleccionado desde la agenda." : "Elegí cliente, día y horario."}
        </p>
      </div>

      <div className="flex justify-center">
        <AppointmentForm
          defaultValues={{
            day: day ?? "",
            hour: hour ?? "",
          }}
          onSubmit={(data) => {
            createAppointment(data);
          }}
          submitLabel={isPending ? "Creando..." : "Crear"}
          lockDateTime={isFromCalendar}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}
