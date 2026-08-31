import ThemeToggle from "@/components/ThemeToggle";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex items-center justify-center px-4 py-10 relative">
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-4xl">
        <div className="grid md:grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 backdrop-blur shadow-[var(--shadow-lg)]">
          <div className="hidden md:flex flex-col justify-between p-8 sm:p-10 bg-gradient-to-b from-emerald-50 to-white dark:from-slate-950 dark:to-slate-900 relative border-b md:border-b-0 md:border-r border-slate-200/70 dark:border-slate-800">
            <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] [background-image:radial-gradient(#0f172a_1px,transparent_1px)] dark:[background-image:radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="relative space-y-4">
              <div className="inline-flex items-center gap-2 chip border-emerald-200/70 dark:border-emerald-800/70 bg-emerald-50/60 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Aphild
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Gym OS
              </div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Gestión simple,
                <br />
                ritmo de gimnasio.
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Agenda semanal, clientes y cobros en un solo lugar con una interfaz clara y rápida.
              </p>
            </div>

            <div className="relative pt-6 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Sistema activo y seguro</span>
            </div>
          </div>

          <div className="p-6 sm:p-10 flex items-center justify-center bg-white/50 dark:bg-slate-900/50">
            {children}
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Aphild · Panel de gestión
        </p>
      </div>
    </div>
  );
}
