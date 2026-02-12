import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useAppointment(id: number) {
  return useQuery({
    queryKey: ['appointment', id],
    queryFn: async () => {
      const res = await api.get(`/appointments/${id}`)
      return res.data
    },
    enabled: !!id
  })
}