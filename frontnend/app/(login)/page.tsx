import LoginForm from "@/components/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Nos alegra verte otra vez
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Iniciá sesión en{" "}
          <span className="text-emerald-600 dark:text-emerald-400">Aphild</span>
        </h2>
        <p className="subtle">Accedé para continuar con tu agenda.</p>
      </div>

      <LoginForm />
    </div>
  );
}
