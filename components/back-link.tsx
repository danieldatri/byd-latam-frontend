"use client";
import { ArrowLeft } from "lucide-react";

export function BackLink() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
  className="mb-6 flex items-center gap-2 text-sm text-black hover:underline"
    >
      <ArrowLeft className="h-4 w-4" />
      Volver Atrás
    </button>
  );
}
