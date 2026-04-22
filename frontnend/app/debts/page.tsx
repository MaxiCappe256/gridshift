import { Suspense } from "react";
import { DebtsContent } from "./DebtsContent";

export default function DebtsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando...</div>}>
      <DebtsContent />
    </Suspense>
  );
}
