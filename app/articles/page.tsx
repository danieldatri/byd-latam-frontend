import { Footer } from "@/components/footer"
import { ArticlesContent } from "./articles-content"
import { getAllPosts, getAllCategories, getAllCountries } from "@/lib/sanity"
import * as React from "react";

export default async function ArticlesPage() {
  const [allPosts, categories, countries] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllCountries()
  ])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 relative">
          {/* Gradient background behind header content */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-red-400 to-gray-50 opacity-30 rounded-lg pointer-events-none" />
          <h1 className="font-playfair text-2xl md:text-4xl font-bold mb-6 text-gray-900">
            Todos los Artículos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
            Mantente informado con las últimas novedades de BYD en Latinoamérica
          </p>
        </div>

        {/* Filters and Articles Grid */}
        <ArticlesContent allPosts={allPosts} categories={categories} countries={countries} />
      </main>
      <Footer />
    </div>
  )
}
