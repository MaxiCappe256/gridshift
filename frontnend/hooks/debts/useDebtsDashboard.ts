"use client";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface DebtDashboardResponse {
  totalAmount: number;
  totalDebtors: number;
  debtorsDetail: any[];
  totalPages: number;
  currentPage: number;
}

export function useDebtsDashboard(
  page: number = 1,
  limit: number = 10,
  term: string = "",
) {
  return useQuery({
    queryKey: ["debts", page, limit, term],
    queryFn: async () => {
      const res = await api.get<DebtDashboardResponse>(
        "/payments/dashboard/debts",
        {
          params: { page, limit, term: term || undefined },
        },
      );
      return res.data;
    },
  });
}
