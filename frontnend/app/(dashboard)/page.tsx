"use client";

import { useAppointments } from "@/hooks/appointments/useAppointments";
import { DAYS, HOURS } from "@/lib/calendar";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function HomePage() {
  const { data = [], isLoading, isError } = useAppointments();
  const router = useRouter();

  if (isLoading) return <p className="p-6">Cargando turnos...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error al cargar los turnos</p>;

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-4xl text-center sm:text-left mb-5 font-bold underline">
          Agenda semanal
        </h1>

        <div className="flex gap-6">
          <button
            onClick={() => router.push("/appointments/new")}
            className="bg-green-700 w-[50%] sm:w-auto text-center cursor-pointer hover:scale-110 hover:bg-green-800 transition text-white py-2 px-4 rounded-lg text-lg"
          >
            Agregar Turno
          </button>

          <button
            onClick={() => router.push("/clients")}
            className="bg-slate-500 w-[50%] sm:w-auto text-center cursor-pointer hover:scale-110 hover:bg-slate-800 transition text-white py-2 px-4 rounded-lg text-lg"
          >
            Ver Clientes
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px] bg-white rounded-xl shadow-md">
          <div className="grid grid-cols-6 border text-sm">
            <div className="border p-3 font-bold bg-gray-50">Hora</div>

            {DAYS.map((day) => (
              <div
                key={day}
                className="border p-3 font-bold text-center bg-gray-50"
              >
                {day}
              </div>
            ))}

            {HOURS.map((hour) => (
              <Fragment key={hour}>
                <div className="border p-3 font-semibold bg-gray-50">
                  {hour.slice(0, 5)}
                </div>

                {DAYS.map((day) => {
                  const appointment = data.find(
                    (a: any) => a.day === day && a.hour === hour,
                  );

                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="border p-2 cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => {
                        if (appointment) {
                          router.push(`/appointments/${appointment.id}`);
                        } else {
                          router.push(
                            `/appointments/new?day=${day}&hour=${hour}`,
                          );
                        }
                      }}
                    >
                      {appointment && (
                        <div className="space-y-1 max-h-24 overflow-y-auto">
                          {appointment.clients?.map((client: any) => (
                            <div
                              key={client.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/appointments/${appointment.id}?clientId=${client.id}`,
                                );
                              }}
                              className="bg-green-700 hover:bg-green-800 transition text-white text-xs p-2 rounded text-center"
                            >
                              {client.name} {client.surname}
                            </div>
                          ))}
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
  );
}
