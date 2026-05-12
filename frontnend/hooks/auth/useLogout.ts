import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ApiErrorResponse = {
  messae?: string;
  message?: string;
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userFullName");
      toast.success("Sesión cerrada");
      queryClient.clear(); // limpia cache
      router.replace("/");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.messae ||
          "Error al cerrar sesion",
      );
    },
  });
};
