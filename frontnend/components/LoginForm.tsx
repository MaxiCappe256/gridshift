"use client";

import { useLogin } from "@/hooks/auth/useLogin";
import { LoginDto } from "@/interfaces/auth.interface";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDto>();

  const { mutate: loginMutate, isPending } = useLogin();

  const onSubmit = (data: LoginDto) => {
    loginMutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      className="flex justify-center items-stretch w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Email
        </label>
        <input
          type="email"
          placeholder="Email..."
          className="input"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs font-medium">Email requerido</span>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="Contraseña..."
          className="input"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs font-medium">Contraseña requerida</span>
        )}
      </div>

      <button
        disabled={isPending}
        className="btn btn-primary w-full mt-2 py-3 shadow-md shadow-emerald-500/20"
      >
        {isPending ? "Iniciando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
