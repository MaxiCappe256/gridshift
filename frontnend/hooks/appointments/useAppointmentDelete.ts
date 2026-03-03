import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAppointmentDelete() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/appointments/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Turno eliminado correctamente");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error al eliminar el turno",
      );
    },
  });
}
