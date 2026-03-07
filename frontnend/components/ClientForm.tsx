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
  submitLabel,
  onDelete,
  clientId,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ClientFormData>({
    defaultValues: {
      paid: false,
    },
  });

  const paidValue = watch("paid");

  const handleInternalSubmit = (data: ClientFormData) => {
    const formattedData = {
      ...data,
      age: Number(data.age),
      ...(data.phone?.trim() ? { phone: data.phone } : {}),
    };
    onSubmit(formattedData);
  };

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-4">
        {clientId ? "Editar cliente" : "Crear cliente"}
      </h1>
      <form
        onSubmit={handleSubmit(handleInternalSubmit)}
        className="flex flex-col border rounded-md shadow-lg gap-6 w-full max-w-md md:w-[40vw] lg:w-[25vw] p-4 bg-white"
      >
        <input
          {...register("name", {
            required: "Nombre obligatorio",
          })}
          type="text"
          className="p-3 border rounded-md text-base outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Nombre..."
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <input
          {...register("surname", { required: "Apellido obligatorio" })}
          type="text"
          className="p-3 border rounded-md text-base outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Apellido..."
        />
        {errors.surname && (
          <p className="text-red-500">{errors.surname.message}</p>
        )}
        <input
          type="number"
          className="p-3 border rounded-md text-base outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Edad..."
          {...register("age", {
            required: "Edad obligatoria",
            valueAsNumber: true,
          })}
        />
        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        <input
          {...register("phone")}
          type="tel"
          className="p-3 border rounded-md text-base outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Telefono (Opcional)..."
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  value="true"
                  {...register("paid", { setValueAs: (v) => v === "true" })}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-green-600"
                />
                <div className="absolute w-3 h-3 bg-green-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                Pagó
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  value="false"
                  {...register("paid", { setValueAs: (v) => v === "true" })}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-red-600"
                />
                <div className="absolute w-3 h-3 bg-red-600 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="text-gray-700 font-medium group-hover:text-red-600 transition-colors">
                No pagó
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-between gap-5 sm:gap-10 items-center">
          <button
            type="submit"
            className="bg-green-700 w-full hover:scale-110 cursor-pointer hover:bg-green-800 transition text-white py-2 px-4 rounded-lg text-md"
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
              className="bg-red-700 w-full cursor-pointer hover:scale-110 hover:bg-red-800 transition text-white py-2 px-4 rounded-lg text-md"
            >
              Eliminar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
