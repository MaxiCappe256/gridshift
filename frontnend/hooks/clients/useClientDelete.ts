import { api } from "@/lib/api";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


type Client = {
  id: number;
  name: string;
  surname: string;
  age: number;
  phone?: string;
  paid: boolean;
}

export function useClientDelete() {

  const queryClient = useQueryClient();

  return useMutation<Client, Error, string>({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/clients/${id}`)
      return res.data
    },
    onSuccess: (data) => {
      toast.success('Cliente eliminado correctamente')
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}