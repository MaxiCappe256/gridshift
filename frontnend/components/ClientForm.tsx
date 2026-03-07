"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type ClientFormData = {
  name: string;
  surname: string;
  age: number;
  phone?: string;
  paid: boolean;
};

type Props = {
  defaultValues?: ClientFormData;
  onSubmit: (data: ClientFormData) => void;
  submitLabel?: string;
  onDelete?: (id: string) => void;
  clientId?: string;
};

export default function ClientForm({
  defaultValues,
  onSubmit,
  submitLabel = "Guardar",
  onDelete,
  clientId,
}: Props) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    defaultValues: defaultValues || { paid: false },
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const paidValue = watch("paid");

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleInternalSubmit = (data: ClientFormData) => {
    const formattedData = {
      ...data,
      age: Number(data.age),
      ...(data.phone?.trim() ? { phone: data.phone } : {}),
      paid: String(data.paid) === "true",
    };

    onSubmit(formattedData);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-4">
        {clientId ? "Editar cliente" : "Crear cliente"}
      </h1>

      <form
        onSubmit={handleSubmit(handleInternalSubmit)}
        className="flex flex-col border rounded-md shadow-lg gap-6 w-full max-w-md md:w-[40vw] lg:w-[25vw] p-4 bg-white"
      >
        {/* NAME */}
        <input
          {...register("name", { required: "Nombre obligatorio" })}
          type="text"
          placeholder="Nombre..."
          className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* SURNAME */}
        <input
          {...register("surname", { required: "Apellido obligatorio" })}
          type="text"
          placeholder="Apellido..."
          className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.surname && (
          <p className="text-red-500 text-sm">{errors.surname.message}</p>
        )}

        {/* AGE */}
        <input
          type="number"
          placeholder="Edad..."
          {...register("age", {
            required: "Edad obligatoria",
            valueAsNumber: true,
          })}
          className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}

        {/* PHONE */}
        <input
          {...register("phone")}
          type="tel"
          placeholder="Teléfono (Opcional)..."
          className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500"
        />
        {/* PAID */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium ml-1">
            Estado de pago
          </label>
          <select
            {...register("paid")}
            value={String(paidValue)}
            className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="true">Pagó</option>
            <option value="false">No pagó</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-5">
          <button
            type="submit"
            className="bg-green-700 w-full hover:scale-105 hover:bg-green-800 transition text-white py-2 rounded-lg"
          >
            {submitLabel}
          </button>

          {onDelete && clientId && (
            <button
              type="button"
              onClick={() => {
                if (
                  confirm("¿Estas seguro que deseas eliminar este cliente?")
                ) {
                  onDelete(clientId);
                  queryClient.invalidateQueries({ queryKey: ["clients"] });
                  router.push("/clients");
                }
              }}
              className="bg-red-700 w-full hover:scale-105 hover:bg-red-800 transition text-white py-2 rounded-lg"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
