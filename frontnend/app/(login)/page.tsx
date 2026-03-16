import LoginForm from "@/components/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <div className="space-y-4 bg-slate-100 p-4 rounded-md shadow-md">
      <p className="underline text-center">Nos alegra verte otra vez, Hernán</p>
      <h1 className="text-2xl text-center font-bold">
        Inicia sesión en{" "}
        <span className="underline text-green-700 mb-4">Aphild</span> <br />
        para continuar.
      </h1>
      <LoginForm />
    </div>
  );
}
