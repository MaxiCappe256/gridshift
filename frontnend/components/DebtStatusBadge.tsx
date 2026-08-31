interface DebtStatusBadgeProps {
  count: number;
}

export const DebtStatusBadge = ({ count }: DebtStatusBadgeProps) => {
  if (count === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold tracking-tight">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        AL DÍA
      </span>
    );
  }

  if (count === 1) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-extrabold tracking-tight">
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        DEBE 1 MES
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 dark:border-red-800 bg-red-50/70 dark:bg-red-950/60 text-red-800 dark:text-red-300 text-xs font-extrabold tracking-tight">
      <span className="w-2 h-2 rounded-full bg-red-500"></span>
      MOROSO ({count})
    </span>
  );
};
