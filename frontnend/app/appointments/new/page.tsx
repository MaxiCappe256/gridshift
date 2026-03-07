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
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-4">
      <div className="flex flex-col gap-6 justify-center items-center w-full max-w-md">
        <Link
          href="/"
          className="text-xl underline text-gray-500 hover:text-black transition"
        >
          Volver
        </Link>
        <h1 className="text-4xl font-bold underline text-center">
          Crear turno
        </h1>

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
