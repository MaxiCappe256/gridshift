import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plan, UpdatePlanPayload } from "@/interfaces/plan.interface";

type UpdatePlanArgs = {
  id: number;
  data: UpdatePlanPayload;
};

export function usePlanUpdate() {
  const queryClient = useQueryClient();

  return useMutation<Plan, any, UpdatePlanArgs>({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/plans/${id}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Precio de ${data.name} actualizado a $${data.price.toLocaleString("es-AR")}`);
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message;
      const errorText = Array.isArray(msg) ? msg.join(", ") : msg || "Error al actualizar el plan";
      toast.error(errorText);
    },
  });
}
