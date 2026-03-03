"use client";
import AppointmentForm from "@/components/AppointmentForm";
import { useAppointmentsCreate } from "@/hooks/appointments/useAppointmentsCreate";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function NewAppointmentPage() {
  const params = useSearchParams();
  const day = params.get("day");
  const hour = params.get("hour");
  const isFromCalendar = Boolean(day && hour);
  const { mutate: createAppointment, isPending } = useAppointmentsCreate();

  return (
    /* flex-1 asegura que ocupe el espacio restante, y h-[70vh] centra el contenido
       sin forzar a que la página mida más que el viewport total */
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
