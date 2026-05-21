'use client';

import { useRoutines } from '@/hooks/routines/useRoutines';
import { Routine, RoutineKind, RoutineObjective } from '@/interfaces/Routine';
import Link from 'next/link';
import { useState } from 'react';

const objectiveLabel: Record<RoutineObjective, string> = {
  MUSCLE_GAIN: 'Ganancia muscular',
  FAT_LOSS: 'Descenso de grasa',
  STRENGTH: 'Fuerza',
  GENERAL_FITNESS: 'Acondicionamiento general',
};

export default function RoutinePage() {
  const { data: routines } = useRoutines();

  const [search, setSearch] = useState('');

  const [kindFilter, setKindFilter] = useState<'ALL' | RoutineKind>('ALL');

  const [objectiveFilter, setObjectiveFilter] = useState<
    'ALL' | RoutineObjective
  >('ALL');

  const [statusFilter, setStatusFilter] = useState<
    'ALL' | 'ACTIVE' | 'INACTIVE'
  >('ALL');

  const routinesFiltered = (routines ?? []).filter((routine: Routine) => {
    const matchesSearch = routine.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesKind =
      kindFilter === 'ALL' ? true : routine.kind === kindFilter;

    const matchesObjective =
      objectiveFilter === 'ALL' ? true : routine.objective === objectiveFilter;

    const matchesStatus =
      statusFilter === 'ALL'
        ? true
        : statusFilter === 'ACTIVE'
          ? routine.isActive
          : !routine.isActive;

    return matchesSearch && matchesKind && matchesObjective && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="h1">Rutinas</h1>
          <p className="subtle">Gestioná rutinas estándar y personalizadas.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Link
            href="/routines/new"
            className="btn btn-primary w-full sm:w-auto"
          >
            Nueva rutina
          </Link>
        </div>
      </div>

      <div className="card card-pad">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
            placeholder="Buscar rutina..."
          />

          <select
            value={kindFilter}
            onChange={(e) =>
              setKindFilter(e.target.value as 'ALL' | RoutineKind)
            }
            className="select"
          >
            <option value="ALL">Todos los tipos</option>
            <option value="STANDARD">Estándar</option>
            <option value="CUSTOM">Personalizada</option>
          </select>

          <select
            value={objectiveFilter}
            onChange={(e) =>
              setObjectiveFilter(e.target.value as 'ALL' | RoutineObjective)
            }
            className="select"
          >
            <option value="ALL">Todos los objetivos</option>
            <option value="MUSCLE_GAIN">Ganancia muscular</option>
            <option value="FAT_LOSS">Descenso de grasa</option>
            <option value="STRENGTH">Fuerza</option>
            <option value="GENERAL_FITNESS">Acondicionamiento general</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')
            }
            className="select"
          >
            <option value="ALL">Todos los estados</option>
            <option value="ACTIVE">Activas</option>
            <option value="INACTIVE">Inactivas</option>
          </select>
        </div>
      </div>

      {!routinesFiltered.length ? (
        <div className="card card-pad text-center">
          <p className="text-slate-700 font-semibold">
            No se encontraron rutinas
          </p>
          <p className="subtle mt-1">
            Conectá esta vista a tus hooks para empezar a listar datos reales.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 list-none items-stretch">
          {routinesFiltered.map((routine: Routine) => (
            <li key={routine.id} className="card card-hover h-full">
              <div className="card-pad h-full flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-display text-lg font-bold text-slate-900 leading-snug">
                    {routine.name}
                  </h2>

                  <span
                    className={`chip ${
                      routine.kind === 'STANDARD'
                        ? 'border-sky-200 bg-sky-50 text-sky-800'
                        : 'border-violet-200 bg-violet-50 text-violet-800'
                    }`}
                  >
                    {routine.kind === 'STANDARD' ? 'Estándar' : 'Personalizada'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="subtle">Objetivo</p>
                  <p className="text-slate-700 font-medium text-right">
                    {objectiveLabel[routine.objective]}
                  </p>

                  <p className="subtle">Frecuencia</p>
                  <p className="text-slate-700 font-medium text-right">
                    {routine.frequencyPerWeek} días / semana  
                  </p>

                  <p className="subtle">Ejercicios</p>
                  <p className="text-slate-700 font-medium text-right">
                    {routine.exercises?.length ?? 0}
                  </p>

                  <p className="subtle">Estado</p>
                  <p className="text-right">
                    <span
                      className={`chip ${
                        routine.isActive
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-slate-100 text-slate-700'
                      }`}
                    >
                      {routine.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                  </p>
                </div>

                <div className="pt-3 mt-auto border-t border-slate-200/70 flex gap-2">
                  <Link
                    href={`/routines/${routine.id}`}
                    className="btn btn-ghost w-full"
                  >
                    Ver detalle
                  </Link>
                  <button type="button" className="btn btn-primary w-full">
                    Editar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
