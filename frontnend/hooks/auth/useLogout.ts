"use client";

import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },

    onSuccess: () => {
      toast.success("Sesión cerrada");
      router.replace("/");
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error al cerrar sesión");
    },
  });
};
