import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Client = {
  name: string;
  surname: string;
  age: number;
  paid: boolean;
  planAmount: number
};

type UpdatedClientArgs = {
  id: string;
  data: Partial<Client>;
};

export function useClientUpdate() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<Client, any, UpdatedClientArgs>({
    //tipado
    //lo que retorna
    //el error
    //lo que recibe el mutate
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/clients/${id}`, data);
      return res.data;
    },
    onSuccess: (data, variables) => {
      toast.success("Usuario actualizado correctamente");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client", variables.id] });
      router.push("/clients");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
}
