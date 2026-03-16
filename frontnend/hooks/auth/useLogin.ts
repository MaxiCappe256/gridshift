"use client";

import { LoginDto, LoginResponse } from "@/interfaces/auth.interface";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: LoginDto): Promise<LoginResponse> => {
      const response = await api.post("/auth/login", data, {
        withCredentials: true,
      });
      return response.data;
    },

    onSuccess: () => {
      toast.success("Bienvenido!");
      setTimeout(() => {
        // El 'window.location.replace' es la clave para que el middleware
        // reciba las cookies frescas de Railway
        window.location.replace("/dashboard");
      }, 400);
    },

    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Error al iniciar sesion");
    },
  });
};
