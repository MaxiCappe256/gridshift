import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

type Client = {
  id: number;
  name: string;
  surname: string;
  age: number;
  phone?: string;
  paid: boolean;
};

type ClientsResponse = {
  data: Client[];
  total: number;
};

export function useClients() {
  return useQuery<ClientsResponse>({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await api.get("/clients");

      return res.data;
    },
  });
}
