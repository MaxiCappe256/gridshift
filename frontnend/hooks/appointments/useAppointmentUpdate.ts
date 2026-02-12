import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from 'sonner'

export function useAppointmentUpdate(id: number) {

  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post(`/appointment/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      toast.success("Turno actualizado correctamente")
      queryClient.invalidateQueries({ queryKey: ['appointment', id] })
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.push('/')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    }

  })
}