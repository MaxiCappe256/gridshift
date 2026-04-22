interface DebtStatusBadgeProps {
  count: number;
}

export const DebtStatusBadge = ({ count }: DebtStatusBadgeProps) => {
  if (count === 0) {
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        AL DÍA
      </span>
    );
  }

  if (count === 1) {
    return (
      <span className="flex  items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">
        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
        DEBE 1 MES
      </span>
    );
  }

  return (
    <span className="flex  items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
      <span className="w-2 h-2 rounded-full bg-red-500"></span>
      MOROSO ({count})
    </span>
  );
};
