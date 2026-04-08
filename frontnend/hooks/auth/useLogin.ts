import { LoginDto, LoginResponse } from "@/interfaces/auth.interface";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginDto) => {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      setTimeout(() => {
        toast.success("Bienvenido!");
        router.push("/dashboard");
      }, 100);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error al ingresar");
    },
  });
};
