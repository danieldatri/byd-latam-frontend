import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Extrae texto plano del body de Sanity (máx 200 caracteres)
export function extractTextFromBody(body: any[]): string {
  if (!body || !Array.isArray(body)) return "";
  return (
    body
      .filter((block) => block._type === "block" && block.children)
      .map((block) =>
        block.children
          .filter((child: any) => child._type === "span")
          .map((child: any) => child.text)
          .join("")
      )
      .join(" ")
      .slice(0, 200) + "..."
  );
}
