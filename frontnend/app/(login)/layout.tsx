export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white/70 backdrop-blur shadow-[var(--shadow-lg)]">
          <div className="hidden md:block p-8 bg-gradient-to-b from-emerald-50 to-white relative">
            <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative space-y-4">
              <div className="inline-flex items-center gap-2 chip border-emerald-200/70 bg-emerald-50/60 text-emerald-800">
                Aphild
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Gym OS
              </div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900">
                Gestión simple,
                <br />
                ritmo de gimnasio.
              </h1>
              <p className="text-slate-600">
                Agenda semanal, clientes y cobros en un solo lugar con una interfaz clara y rápida.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10 flex items-center justify-center">
            {children}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500">
          Aphild · Panel de gestión
        </p>
      </div>
    </div>
  );
}
