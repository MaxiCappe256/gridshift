import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type Client = {
  id: number;
  name: string;
  surname: string;
  age: number;
  phone?: string;
  planAmount: number;
  paid: boolean;
};

export function useClient(id: string) {
  return useQuery<Client>({
    queryKey: ['client', id],
    queryFn: async () => {
      const res = await api.get(`/clients/${id}`);
      return res.data
    },
    enabled: !!id,
  })
}