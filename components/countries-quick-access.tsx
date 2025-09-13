"use client"

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

interface Country {
  _id: string;
  name: string;
  slug: { current: string };
  emoji?: string;
}

interface RegionsQuickAccessProps {
  regions: Country[];
}

export function RegionsQuickAccess({ regions }: RegionsQuickAccessProps) {
  const fallback = [
    "México", "Brasil", "Argentina", "Chile", "Colombia", "Perú", "Uruguay"
  ];
  const isMobile = useIsMobile()
  const router = useRouter()

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (!value) return
    router.push(`/region/${value}`)
  }

  const hasRegions = regions && regions.length > 0

  return (
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="font-playfair text-xl font-bold mb-3">Región</h3>

      {isMobile ? (
        // Mobile: native select for compact, accessible navigation
        <select
          aria-label="Seleccionar región"
          onChange={handleSelect}
          className="w-full rounded-md border px-3 py-2 text-sm bg-white"
          defaultValue=""
        >
          <option value="" disabled>
            Selecciona una región
          </option>
          {hasRegions
            ? regions.map((region) => (
                <option key={region._id} value={region.slug.current}>
                  {region.emoji ? `${region.emoji} ` : ""}{region.name}
                </option>
              ))
            : fallback.map((region) => (
                <option key={region} value={region.toLowerCase()}>
                  {region}
                </option>
              ))}
        </select>
      ) : (
        // Desktop: the existing list view
        <div className="space-y-2">
          {hasRegions ? (
            regions.map((region) => (
              <a
                key={region._id}
                href={`/region/${region.slug.current}`}
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors py-1"
              >
                {region.emoji && <span>{region.emoji}</span>}
                {region.name}
              </a>
            ))
          ) : (
            fallback.map((region) => (
              <a
                key={region}
                href={`/region/${region.toLowerCase()}`}
                className="block text-sm hover:text-primary transition-colors py-1"
              >
                {region}
              </a>
            ))
          )}
        </div>
      )}
    </div>
  )
}
