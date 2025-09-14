import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticlesContent } from "./articles-content"
import { getAllPosts, getAllCategories, getAllCountries } from "@/lib/sanity"

export default async function ArticlesPage() {
  const [allPosts, categories, countries] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllCountries()
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12 relative">
          {/* Gradient background behind header content */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-pink-500 to-secondary opacity-30 pointer-events-none rounded-lg" />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 relative z-10 text-primary">
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

