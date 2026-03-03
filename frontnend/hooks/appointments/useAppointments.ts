"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await api.get("/appointments");
      console.log("Desde el hook ", res.data.data);
      return res.data.data;
    },
  });
}
