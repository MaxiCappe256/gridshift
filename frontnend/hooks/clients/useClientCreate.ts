import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ClientFormData = {
  name: string;
  surname: string;
  age: number;
  phone?: string;
  paid?: boolean;
}

export function useClientCreate<Client>() {

  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newClient: ClientFormData) => {
      const res = await api.post('/clients', newClient)
      return res.data
    },
    onSuccess: () => {
      toast.success("Cliente creado correctamente")
      // Limpiamos la caché de 'clients' para que la lista se actualice
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      router.push('/clients')
    },
    onError: (error: any) => {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
  })
}