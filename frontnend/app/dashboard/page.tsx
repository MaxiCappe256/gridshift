"use client";

import { useAppointments } from "@/hooks/appointments/useAppointments";
import { DAYS, HOURS } from "@/lib/calendar";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function HomePage() {
  const { data, isLoading, isError } = useAppointments();
  const appointments = data ?? [];
  const router = useRouter();

  if (isLoading) return <p className="p-6">Cargando turnos...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error al cargar los turnos</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="h1">Agenda semanal</h1>
          <p className="subtle">
            Click en una celda para crear un turno, o en un cliente para editar.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button
            onClick={() => router.push("/appointments/new")}
            className="btn btn-primary w-full sm:w-auto"
          >
            Agregar turno
          </button>

          <button
            onClick={() => router.push("/clients")}
            className="btn btn-ghost w-full sm:w-auto"
          >
            Ver clientes
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-6 text-sm">
              <div className="sticky left-0 z-20 bg-slate-50/90 backdrop-blur border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
                Hora
              </div>

              {DAYS.map((day) => (
                <div
                  key={day}
                  className="border-b border-slate-200 px-4 py-3 font-semibold text-center text-slate-700 bg-slate-50/90 backdrop-blur"
                >
                  {day}
                </div>
              ))}

              {HOURS.map((hour) => (
                <Fragment key={hour}>
                  <div className="sticky left-0 z-10 bg-white/80 backdrop-blur border-t border-slate-200 px-4 py-3 font-semibold text-slate-700">
                    {hour.slice(0, 5)}
                  </div>

                  {DAYS.map((day) => {
                    const cellAppointments = appointments.filter(
                      (a: any) => a.day === day && a.hour === hour,
                    );

                    return (
                      <div
                        key={`${day}-${hour}`}
                        className="border-t border-l border-slate-200/70 px-2.5 py-2.5 cursor-pointer transition-colors hover:bg-slate-50/70"
                        onClick={() => {
                          if (cellAppointments.length > 0) {
                            router.push(`/appointments/${cellAppointments[0].id}`);
                          } else {
                            router.push(`/appointments/new?day=${day}&hour=${hour}`);
                          }
                        }}
                      >
                        {cellAppointments.length > 0 ? (
                          <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                            {cellAppointments.map((appointment: any) =>
                              appointment.clients?.map((client: any) => (
                                <div
                                  key={`${appointment.id}-${client.id}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(
                                      `/appointments/${appointment.id}?clientId=${client.id}`,
                                    );
                                  }}
                                  className="rounded-xl border border-emerald-200/70 bg-emerald-600 text-white px-2.5 py-2 text-xs font-semibold text-center shadow-sm hover:brightness-[0.98] transition"
                                >
                                  {client.name} {client.surname}
                                </div>
                              )),
                            )}
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-slate-200 bg-white/40 px-3 py-2 text-xs text-slate-400 text-center">
                            +
                          </div>
                        )}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
