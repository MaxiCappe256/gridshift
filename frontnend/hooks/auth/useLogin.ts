import { LoginDto, LoginResponse } from "@/interfaces/auth.interface";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ApiErrorResponse = {
  message?: string;
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginDto): Promise<LoginResponse> => {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      localStorage.setItem("userFullName", res.fullName);
      setTimeout(() => {
        toast.success("Bienvenido!");
        router.push("/dashboard");
      }, 100);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || "Error al ingresar");
    },
  });
};
