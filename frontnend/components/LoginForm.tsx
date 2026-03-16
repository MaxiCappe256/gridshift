"use client";

import { useLogin } from "@/hooks/auth/useLogin";
import { LoginDto } from "@/interfaces/auth.interface";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginDto>();

  const { mutate: loginMutate, isPending } = useLogin();

  const onSubmit = (data: LoginDto) => {
    loginMutate(data);
  };

  return (
    <form
      className="flex p-4 justify-center items-center w-full max-w-sm flex-col gap-4 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="email"
        placeholder="Email"
        className=" bg-white px-4 py-2 focus:outline-green-600 rounded-md w-full"
        {...register("email", { required: true })}
      />
      <input
        type="password"
        placeholder="Password"
        className="bg-white px-4 py-2 focus:outline-green-600 rounded-md w-full"
        {...register("password", { required: true })}
      />{" "}
      <button className="rounded-md px-4 py-2 bg-green-600 text-white cursor-pointer w-full">
        {isPending ? "Iniciando..." : "Iniciar session"}
      </button>
    </form>
  );
}
