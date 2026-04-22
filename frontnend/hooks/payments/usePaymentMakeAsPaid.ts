import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePaymentMakeAsPaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.patch(`/payments/${id}/pay`);
      await new Promise((r) => setTimeout(r, 1000));
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["debts"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cobro realizado correctamente");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Error al cobrar";
      toast.error(message);
    },
  });
}
