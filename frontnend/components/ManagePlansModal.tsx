'use client';

import { useState, useEffect } from 'react';
import { usePlans } from '@/hooks/plans/usePlans';
import { usePlanUpdate } from '@/hooks/plans/usePlanUpdate';
import { Plan } from '@/interfaces/plan.interface';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ManagePlansModal({ isOpen, onClose }: Props) {
  const { data: plans, isLoading, isError, refetch } = usePlans();
  const { mutateAsync: updatePlan, isPending } = usePlanUpdate();

  // Local state for editing prices per plan
  const [editedPrices, setEditedPrices] = useState<Record<number, number>>({});
  const [savingPlanId, setSavingPlanId] = useState<number | null>(null);

  useEffect(() => {
    if (plans) {
      const initialPrices: Record<number, number> = {};
      plans.forEach((plan) => {
        initialPrices[plan.id] = plan.price;
      });
      setEditedPrices(initialPrices);
    }
  }, [plans]);

  if (!isOpen) return null;

  const handlePriceChange = (id: number, val: string) => {
    const numeric = parseInt(val, 10);
    setEditedPrices((prev) => ({
      ...prev,
      [id]: isNaN(numeric) ? 0 : numeric,
    }));
  };

  const handleSavePlan = async (plan: Plan) => {
    const newPrice = editedPrices[plan.id];
    if (!newPrice || newPrice <= 0) {
      return;
    }

    try {
      setSavingPlanId(plan.id);
      await updatePlan({
        id: plan.id,
        data: {
          price: newPrice,
          updateExistingClients: true,
        },
      });
    } finally {
      setSavingPlanId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                ⚙️
              </span>
              <h2 className="h2">Precios de los Planes</h2>
            </div>
            <p className="subtle mt-1">
              Modificá las tarifas vigentes. Al guardar, se actualizará automáticamente la cuota de todos los clientes de ese plan.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 text-slate-700 dark:text-slate-200 transition text-lg font-bold leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          {isLoading && (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 font-medium">
              Cargando planes disponibles...
            </div>
          )}

          {isError && (
            <div className="py-8 text-center text-red-500 space-y-2">
              <p>No se pudieron cargar los planes.</p>
              <button
                onClick={() => refetch()}
                className="btn btn-ghost text-xs py-1.5 px-3"
              >
                Reintentar
              </button>
            </div>
          )}

          {plans && plans.length > 0 && (
            <div className="grid gap-4">
              {plans.map((plan) => {
                const currentPrice = plan.price;
                const localPrice = editedPrices[plan.id] ?? currentPrice;
                const hasChanged = localPrice !== currentPrice;
                const isSaving = savingPlanId === plan.id;

                return (
                  <div
                    key={plan.id}
                    className={`rounded-2xl border p-5 transition-all ${
                      hasChanged
                        ? 'border-emerald-400 dark:border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 ring-2 ring-emerald-200 dark:ring-emerald-900'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 dark:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                            {plan.name}
                          </span>
                          <span className="chip text-[11px] py-0.5 px-2 font-mono uppercase bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                            {plan.code}
                          </span>
                        </div>
                        {plan.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {plan.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 w-fit shadow-xs">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>
                          <strong>{plan.clientCount ?? 0}</strong> clientes activos
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Precio mensual (ARS)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 dark:text-slate-500">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="500"
                            value={localPrice || ''}
                            onChange={(e) =>
                              handlePriceChange(plan.id, e.target.value)
                            }
                            className="input bg-white dark:bg-slate-900 pl-8 font-semibold text-slate-900 dark:text-slate-100 text-base"
                            placeholder="Monto..."
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSavePlan(plan)}
                        disabled={!hasChanged || isSaving || isPending || localPrice <= 0}
                        className="btn btn-primary sm:w-auto self-end"
                      >
                        {isSaving ? 'Guardando...' : hasChanged ? 'Actualizar precio' : 'Guardado'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost w-full sm:w-auto"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
