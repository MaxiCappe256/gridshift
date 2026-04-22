"use client";

import { Pagination } from "@/components/Pagination";
import { useDebtsDashboard } from "@/hooks/debts/useDebtsDashboard";
import { usePaymentMakeAsPaid } from "@/hooks/payments/usePaymentMakeAsPaid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function DebtsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [isOpen, setIsOpen] = useState(false);
  const [paymentDebt, setPaymentDebt] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // timmer para no mandar cada consulta cuando el cliente escribe una letra . 1 letra 1 consulta . !!! !== !!!
  useEffect(() => {
    // crear funcion que setea el term a los 500ms
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    // si el usuario escribe antes de los 500ms limpia el temp anterior
    return () => clearTimeout(handler);

    // se ejecuta cada vez que el cliente escribe, osea cada vez que cambia el searchTerm
  }, [searchTerm]);

  const { mutate: carguePayment, isPending } = usePaymentMakeAsPaid();
  const {
    data: dashboard,
    isLoading,
    isError,
  } = useDebtsDashboard(currentPage, 10, debouncedTerm);

  const handleClickCargue = (payment: any) => {
    setPaymentDebt(payment);
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleChangePage = (newPage: number) => {
    router.push(`/debts?page=${newPage}`);
  };

  if (isLoading)
    return (
      <div className="mt-20 text-center">Cargando deudores del cliente</div>
    );
  if (isError || !dashboard)
    return (
      <div className="mt-20 text-center text-red-500">
        Error al cargar el dashboard
      </div>
    );

  return (
    <div className="mt-5">
      <div className="flex flex-col md:flex-row text-center md:text-left items-center gap-4 md:gap-20">
        <div className="bg-red-300 p-5 rounded-md w-full md:w-auto">
          <p>
            Total Deudores:{" "}
            <span className="font-bold">{dashboard.totalDebtors}</span>
          </p>
        </div>

        <div className="bg-green-300 p-5 rounded-md w-full md:w-auto">
          <p>
            Total deuda:{" "}
            <span className="font-bold">${dashboard.totalAmount}</span>
          </p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center mb-5">
          <h3>Lista de deudores:</h3>

          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-400 focus:outline-green-600"
          />
        </div>

        {dashboard.debtorsDetail.length === 0 ? (
          <p className="mt-10 text-center text-gray-500 text-2xl">
            No hay deudas pendientes
          </p>
        ) : (
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Mes</th>
                <th className="p-2">Monto</th>
                <th className="p-2 text-right">Accion</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.debtorsDetail.map((payment: any) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="p-2">{payment.client.name}</td>
                  <td className="p-2">
                    {payment.month}/{payment.year}
                  </td>
                  <td className="p-2 text-red-500">${payment.amount}</td>

                  <td className="p-2 text-right">
                    <button
                      disabled={isPending}
                      onClick={() => handleClickCargue(payment)}
                      className="cursor-pointer bg-red-600 hover:bg-red-800 transition-all px-3 py-1 rounded-md text-white"
                    >
                      Cobrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } fixed inset-0 bg-black/40 items-center justify-center`}
      >
        <div className="bg-white p-10 text-xl rounded-md flex items-center justify-center flex-col">
          <p>
            Deseas cobrarle a{" "}
            <span className="font-bold">{paymentDebt?.client.name}</span>?
          </p>
          <p className="mt-2">
            Mes: <span className="font-bold">{paymentDebt?.month}</span>
          </p>
          <p className="mt-2">
            Monto: $<span className="font-bold">{paymentDebt?.amount}</span>
          </p>

          <div className="flex mt-5  gap-5">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="bg-red-600 hover:bg-red-800 transition-all cursor-pointer px-4 py-2 rounded-md text-white"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (paymentDebt) {
                  carguePayment(paymentDebt.id, {
                    onSuccess: () => {
                      setIsOpen(false);
                    },
                  });
                }
              }}
              className="bg-green-600 hover:bg-green-800 transition-all cursor-pointer px-4 py-2 rounded-md text-white"
            >
              {isPending ? "Cobrando..." : "Cobrar"}
            </button>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={dashboard.totalPages}
        onPageChange={handleChangePage}
        isLoading={isLoading}
      />
    </div>
  );
}
