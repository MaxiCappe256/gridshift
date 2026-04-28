'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type ClientFormData = {
  name: string;
  surname: string;
  age: number;
  phone?: string;
  planAmount: number;
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
  submitLabel = 'Guardar',
  onDelete,
  clientId,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    defaultValues: defaultValues,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

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
    };

    onSubmit(formattedData);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="h1 text-center mb-6">
        {clientId ? 'Editar cliente' : 'Crear cliente'}
      </h1>

      <form
        onSubmit={handleSubmit(handleInternalSubmit)}
        className="card card-pad w-full max-w-md md:w-[40vw] lg:w-[26vw] space-y-4"
      >
        {/* NAME */}
        <input
          {...register('name', { required: 'Nombre obligatorio' })}
          type="text"
          placeholder="Nombre..."
          className="input"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* SURNAME */}
        <input
          {...register('surname', { required: 'Apellido obligatorio' })}
          type="text"
          placeholder="Apellido..."
          className="input"
        />
        {errors.surname && (
          <p className="text-red-500 text-sm">{errors.surname.message}</p>
        )}

        {/* AGE */}
        <input
          type="number"
          placeholder="Edad..."
          {...register('age', {
            required: 'Edad obligatoria',
            valueAsNumber: true,
          })}
          className="input"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}

        {/* PHONE */}
        <input
          {...register('phone')}
          type="tel"
          placeholder="Teléfono (Opcional)..."
          className="input"
        />

        {/* PLAN */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Plan del cliente</label>
          <select
            {...register('planAmount', { required: true, valueAsNumber: true })}
            className="select"
          >
            <option value={25000}>Plan Básico ($25.000)</option>
            <option value={50000}>Plan Pro ($50.000)</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            {submitLabel}
          </button>

          {onDelete && clientId && (
            <button
              type="button"
              onClick={() => {
                if (
                  confirm('¿Estas seguro que deseas eliminar este cliente?')
                ) {
                  onDelete(clientId);
                  queryClient.invalidateQueries({ queryKey: ['clients'] });
                  router.push('/clients');
                }
              }}
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
