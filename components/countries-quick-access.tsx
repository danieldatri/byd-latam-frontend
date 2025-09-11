import React from "react";

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

  return (
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="font-playfair text-xl font-bold mb-3">Región</h3>
      <div className="space-y-2">
        {regions && regions.length > 0 ? (
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
    </div>
  );
}
