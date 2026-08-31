import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "@/interfaces/plan.interface";

export function usePlans() {
  return useQuery<Plan[]>({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await api.get("/plans");
      return res.data;
    },
  });
}
