import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      localStorage.removeItem("token");
      toast.success("Sesión cerrada");
      queryClient.clear(); // limpia cache
      router.replace("/");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.messae || "Error al cerrar sesion");
    },
  });
};
