import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsContent } from "./news-content"
import { getAllPosts, getAllCategories, getAllCountries } from "@/lib/sanity"

export default async function NewsPage() {
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
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Todas las Noticias
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mantente informado con las últimas noticias de BYD en Latinoamérica
          </p>
        </div>

        {/* Filters and Articles Grid */}
        <NewsContent allPosts={allPosts} categories={categories} countries={countries} />
      </main>
      <Footer />
    </div>
  )
}
