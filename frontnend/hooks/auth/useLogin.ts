import { LoginDto, LoginResponse } from "@/interfaces/auth.interface";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginDto) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (res: LoginResponse) => {
      toast.success("Bienvenido");
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error al ingresar");
    },
  });
};
