"use client";

import { useClients } from "@/hooks/clients/useClients";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Client = {
  id: number;
  name: string;
  surname: string;
};

type AppointmentFormValues = {
  clientId: number;
  day: string;
  hour: string;
};

type Props = {
  defaultValues?: Partial<AppointmentFormValues>;
  onSubmit: (data: AppointmentFormValues) => void;
  submitLabel?: string;
  lockDateTime?: boolean;
  clientName?: string;
  onDelete: (id: number) => void;
};

export default function AppointmentForm({
  defaultValues,
  onSubmit,
  onDelete,
  submitLabel,
  lockDateTime,
  clientName,
}: Props) {
  const DAYS = [
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO",
    "DOMINGO",
  ] as const;

  const HOURS = [
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
    "20:00:00",
  ] as const;

  const { data: clients = [] } = useClients();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { register, setValue, handleSubmit, reset } =
    useForm<AppointmentFormValues>({
      defaultValues,
    });

  const filteredClients = clients.filter((client) =>
    `${client.name} ${client.surname}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // setear valores iniciales
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }

    if (clientName) {
      setSearch(clientName);
    }
  }, [defaultValues, reset, clientName]);

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border rounded-md shadow-lg gap-4 sm:gap-6 w-[80vw] sm:w-[30vw] p-4 bg-white"
      >
        <div className="relative flex flex-col gap-2">
          <label className="font-bold text-base text-gray-700">Cliente</label>

          {/* Si hay clientId inicial, mostramos el nombre fijo (EDICIÓN) */}
          {defaultValues?.clientId ? (
            <div className="p-3 border-2 rounded-md font-bold text-xl bg-gray-100 text-green-700 border-green-700">
              {clientName || "Cargando..."}
              <input type="hidden" {...register("clientId")} />
            </div>
          ) : (
            /* Si no hay clientId inicial, mostramos el buscador (NUEVO) */
            <>
              <input
                type="text"
                className="p-3 border rounded-md text-base outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsOpen(true);
                }}
              />
              {isOpen && (
                <ul className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-xl max-h-40 overflow-y-auto z-50">
                  {filteredClients.map((client) => (
                    <li
                      key={client.id}
                      onClick={() => {
                        setSearch(`${client.name} ${client.surname}`);
                        setValue("clientId", client.id);
                        setIsOpen(false);
                      }}
                      className="p-2 hover:bg-green-100 cursor-pointer text-sm border-b last:border-none"
                    >
                      {client.name} {client.surname}
                    </li>
                  ))}
                  {filteredClients.length === 0 && (
                    <li className="p-2 text-gray-400 text-sm">
                      No se encontraron clientes
                    </li>
                  )}
                </ul>
              )}
              <input type="hidden" {...register("clientId")} />
            </>
          )}
        </div>

        {/* DÍA */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-base text-gray-700">Día</label>
          {lockDateTime ? (
            <input
              disabled
              className="p-3 border rounded-md bg-gray-100 text-gray-500"
              {...register("day")}
            />
          ) : (
            <select
              {...register("day")}
              className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar día</option>
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* HORA */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-base text-gray-700">Hora</label>
          {lockDateTime ? (
            <input
              disabled
              className="p-3 border rounded-md bg-gray-100 text-gray-500"
              {...register("hour")}
            />
          ) : (
            <select
              {...register("hour")}
              className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar hora</option>
              {HOURS.map((hour) => (
                <option key={hour} value={hour}>
                  {hour.slice(0, 5)}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex gap-6 flex-col sm:flex-row">
          <button
            type="submit"
            className="bg-green-700 sm:w-[50%] px-4 py-2 cursor-pointer hover:bg-green-800 transition text-white rounded-lg text-md font-bold shadow-md active:scale-95"
          >
            {submitLabel}
          </button>

          {defaultValues?.clientId && onDelete && (
            <button
              type="button"
              onClick={() => {
                const appointmentId = (defaultValues as any).id;
                if (
                  appointmentId &&
                  confirm("¿Estás seguro de que querés borrar este turno?")
                ) {
                  onDelete(appointmentId);
                }
              }}
              className="bg-red-700 sm:w-[50%] px-4 py-2 cursor-pointer hover:bg-red-800 transition text-white  rounded-lg text-md font-bold shadow-md active:scale-95"
            >
              Eliminar Turno
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
