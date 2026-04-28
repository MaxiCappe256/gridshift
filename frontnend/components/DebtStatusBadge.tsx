interface DebtStatusBadgeProps {
  count: number;
}

export const DebtStatusBadge = ({ count }: DebtStatusBadgeProps) => {
  if (count === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50/70 text-emerald-800 text-xs font-extrabold tracking-tight">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        AL DÍA
      </span>
    );
  }

  if (count === 1) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 bg-amber-50/70 text-amber-800 text-xs font-extrabold tracking-tight">
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        DEBE 1 MES
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 bg-red-50/70 text-red-800 text-xs font-extrabold tracking-tight">
      <span className="w-2 h-2 rounded-full bg-red-500"></span>
      MOROSO ({count})
    </span>
  );
};
