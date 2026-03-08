"use client";

import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      appointmentId,
      clientId,
    }: {
      appointmentId: number;
      clientId: number;
    }) => {
      const res = await api.patch(`/appointments/${appointmentId}`, {
        removeClientId: clientId,
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
