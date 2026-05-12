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
      className="flex justify-center items-stretch w-full flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">Email</label>
      <input
        type="email"
        placeholder="Email"
        className="input"
        {...register("email", { required: true })}
      />
      {errors.email && (
        <span className="text-red-500 text-sm">Email requerido</span>
      )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">Contraseña</label>
      <input
        type="password"
        placeholder="Password"
        className="input"
        {...register("password", { required: true })}
      />{" "}
      {errors.password && (
        <span className="text-red-500 text-sm">Password requerido</span>
      )}
      </div>
      <button
        disabled={isPending}
        className="btn btn-primary w-full mt-1"
      >
        {isPending ? "Iniciando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
