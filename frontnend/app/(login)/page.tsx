import LoginForm from "@/components/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-2 text-center">
        <p className="text-sm text-slate-600">
          Nos alegra verte otra vez
        </p>
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
          Iniciá sesión en{" "}
          <span className="text-emerald-700">Aphild</span>
        </h2>
        <p className="subtle">Accedé para continuar con tu agenda.</p>
      </div>

      <div className="mt-6 card card-pad">
        <LoginForm />
      </div>
    </div>
  );
}
