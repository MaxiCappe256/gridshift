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
  onDelete: () => void;
};

export default function AppointmentForm({
  defaultValues,
  onSubmit,
  onDelete,
  submitLabel,
  lockDateTime,
  clientName,
}: Props) {
  const DAYS = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"] as const;

  const HOURS = [
    "07:00:00",
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "13:00:00",
  ] as const;

  // Corregimos la extracción de datos: entramos a .data del objeto {data, total}
  const { data: clientsResponse } = useClients();
  const clients = clientsResponse?.data || [];

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
        className="card card-pad w-[92vw] sm:w-[520px] space-y-4"
      >
        <div className="relative flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Cliente</label>

          {defaultValues?.clientId ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 font-semibold text-slate-900">
              {clientName || "Cargando..."}
              <input
                type="hidden"
                {...register("clientId", { valueAsNumber: true })}
              />
            </div>
          ) : (
            <>
              <input
                type="text"
                className="input"
                placeholder="Buscar cliente..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsOpen(true);
                }}
              />
              {isOpen && (
                <ul className="absolute top-full left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-(--shadow-lg) max-h-56 overflow-y-auto z-50">
                  {filteredClients.map((client) => (
                    <li
                      key={client.id}
                      onClick={() => {
                        setSearch(`${client.name} ${client.surname}`);
                        setValue("clientId", client.id, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                        setIsOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-emerald-50 cursor-pointer text-sm border-b border-slate-200/70 last:border-none"
                    >
                      <span className="font-semibold text-slate-900">
                        {client.name} {client.surname}
                      </span>
                    </li>
                  ))}
                  {filteredClients.length === 0 && (
                    <li className="px-4 py-3 text-slate-400 text-sm">
                      No se encontraron clientes
                    </li>
                  )}
                </ul>
              )}
              <input
                type="hidden"
                {...register("clientId", { valueAsNumber: true })}
              />
            </>
          )}
        </div>

        {/* DÍA */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Día</label>
          {lockDateTime ? (
            <input
              disabled
              className="input bg-slate-50 text-slate-500"
              {...register("day")}
            />
          ) : (
            <select
              {...register("day")}
              className="select"
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
          <label className="text-sm font-semibold text-slate-700">Hora</label>
          {lockDateTime ? (
            <input
              disabled
              className="input bg-slate-50 text-slate-500"
              {...register("hour")}
            />
          ) : (
            <select
              {...register("hour")}
              className="select"
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

        {/* BOTONES ADAPTABLES */}
        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            {submitLabel}
          </button>

          {/* !! asegura que no se renderice el 0 si la condición es falsa */}
          {!!defaultValues?.clientId && !!onDelete && (
            <button
              type="button"
              onClick={() => onDelete()}
              className="btn btn-danger w-full"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
