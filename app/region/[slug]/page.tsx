import * as React from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/article-card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { getPostsByCountry, getAllCountries, Post, Country } from "@/lib/sanity";
import { RegionsQuickAccess } from "@/components/countries-quick-access";
import type { Metadata } from "next";

interface RegionPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const countries = await getAllCountries();
  const country = countries.find((c: Country) => c.slug.current === params.slug);
  if (!country) {
    return {
      title: "BYD Latam News - Región no encontrada",
    };
  }
  return {
    title: `BYD Latam News - Noticias de ${country.name}`,
    description: `Todas las noticias y actualizaciones de BYD en ${country.name}.`,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const countries = await getAllCountries();
  const country = countries.find((c: Country) => c.slug.current === params.slug);

  if (!country) {
    notFound();
  }

  const posts = await getPostsByCountry(params.slug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Region Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                {country.emoji && <span className="text-4xl">{country.emoji}</span>}
                <h1 className="font-playfair text-4xl md:text-5xl font-bold">
                  BYD en {country.name}
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Todas las noticias y actualizaciones de BYD en {country.name}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <MapPin className="h-5 w-5 text-primary" />
                <Badge variant="outline" className="text-primary border-primary">
                  {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
                </Badge>
              </div>
            </div>
            {/* Articles */}
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((article: Post) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">{country.emoji || "🌎"}</div>
                <h3 className="text-xl font-semibold mb-2">
                  No hay artículos disponibles para esta región
                </h3>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <RegionsQuickAccess regions={countries} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
