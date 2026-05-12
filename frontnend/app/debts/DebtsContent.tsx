'use client';

import { Pagination } from '@/components/Pagination';
import { useDebtsDashboard } from '@/hooks/debts/useDebtsDashboard';
import { usePaymentMakeAsPaid } from '@/hooks/payments/usePaymentMakeAsPaid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function DebtsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  const [isOpen, setIsOpen] = useState(false);
  const [paymentDebt, setPaymentDebt] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

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
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="h1">Deudas</h1>
          <p className="subtle">Control de morosidad y cobros pendientes.</p>
        </div>

        <div className="w-full lg:w-auto">
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input lg:w-[360px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="kpi">
          <div>
            <p className="text-sm font-semibold text-slate-700">Total deudores</p>
            <p className="subtle">Clientes con pagos vencidos</p>
          </div>
          <strong className="text-red-600">{dashboard.totalDebtors}</strong>
        </div>

        <div className="kpi">
          <div>
            <p className="text-sm font-semibold text-slate-700">Total deuda</p>
            <p className="subtle">Monto acumulado con interés</p>
          </div>
          <strong className="text-slate-900">${dashboard.totalAmount}</strong>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="h2">Lista de deudores</h2>
          <span className="chip">
            Página <span className="font-extrabold text-slate-900">{currentPage}</span> /{" "}
            {dashboard.totalPages}
          </span>
        </div>

        {dashboard.debtorsDetail.length === 0 ? (
          <div className="card card-pad text-center">
            <p className="text-slate-700 font-semibold text-lg">No hay deudas pendientes</p>
            <p className="subtle mt-1">Buen trabajo: el gimnasio está al día.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Periodo</th>
                  <th>Monto</th>
                  <th className="text-right">Acción</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.debtorsDetail.map((payment: any) => (
                  <tr key={payment.id}>
                    <td className="font-semibold text-slate-900">
                      {payment.client.name}
                    </td>
                    <td className="text-slate-600">
                      <span className="chip bg-slate-50">
                        {payment.month}/{payment.year}
                      </span>
                    </td>
                    <td>
                      <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                        ${payment.amountWithInterest}
                      </span>
                    </td>

                    <td className="text-right">
                      <button
                        disabled={isPending}
                        onClick={() => handleClickCargue(payment)}
                        className="btn btn-danger"
                      >
                        Cobrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } fixed inset-0 bg-slate-950/50 items-center justify-center p-4`}
      >
        <div className="w-full max-w-md card card-pad">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="h2">Confirmar cobro</p>
              <p className="subtle mt-1">
                Se marcará el pago como abonado.
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-700 hover:bg-white transition"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
              <span className="text-slate-600">Cliente</span>
              <span className="font-semibold text-slate-900">
                {paymentDebt?.client.name}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
              <span className="text-slate-600">Mes</span>
              <span className="font-semibold text-slate-900">{paymentDebt?.month}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
              <span className="text-slate-600">Monto</span>
              <span className="font-semibold text-slate-900">
                ${paymentDebt?.amountWithInterest}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mt-6 gap-3">
            <button onClick={() => setIsOpen(false)} className="btn btn-ghost w-full">
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
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? 'Cobrando...' : 'Cobrar'}
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
