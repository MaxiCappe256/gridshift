import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Appointment = {
  day: string;
  hour: string;
  clientId: number;
}

export function useAppointmentsCreate() {

  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Appointment) => {
      const res = await api.post('/appointments', data)
      return res.data
    },
    onSuccess: () => {
      toast.success("Turno creado correctamente")
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      router.push('/')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message)
    }
  })
}