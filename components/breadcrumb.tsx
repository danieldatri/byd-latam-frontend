"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BreadcrumbProps {
  postTitle: string;
}

export function Breadcrumb({ postTitle }: BreadcrumbProps) {
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReferrer(document.referrer);
    }
  }, []);

  function getReferrerLabel(url: string) {
    if (url.includes("/country/")) return "País";
    if (url.includes("/articles/")) return "Artículo";
    if (url.includes("/article/")) return "Artículo"; // legacy
    if (url.includes("/articles")) return "Artículos";
    if (url.includes("/news")) return "Artículos"; // legacy
    return "Inicio";
  }

  function getReferrerHref(url: string) {
    try {
      const u = new URL(url);
      return u.pathname;
    } catch {
      return "/";
    }
  }

  return (
    <nav className="mb-6 flex items-center text-sm text-gray-500 gap-2" aria-label="Breadcrumb">
      <Link href="/" className="hover:underline text-gray-500">Inicio</Link>
      <span>/</span>
      {referrer ? (
        <>
          <Link href={getReferrerHref(referrer)} className="hover:underline text-gray-500">
            {getReferrerLabel(referrer)}
          </Link>
          <span>/</span>
        </>
      ) : null}
      <span className="text-gray-900 font-semibold">{postTitle}</span>
    </nav>
  );
}
