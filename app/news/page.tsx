import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { Filter, Grid } from "lucide-react"
import { getAllPosts, getAllCategories, getAllCountries, Post, Category, Country } from "@/lib/sanity"

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Categories Filter */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-playfair text-xl font-bold mb-4 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Categorías
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Todas las categorías
                  </Button>
                  {categories.map((category: Category) => (
                    <Button 
                      key={category._id}
                      variant="ghost" 
                      className="w-full justify-start text-left"
                    >
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.title}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Countries Filter */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-playfair text-xl font-bold mb-4">Países</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    Todos los países
                  </Button>
                  {countries.map((country: Country) => (
                    <Button 
                      key={country._id}
                      variant="ghost" 
                      className="w-full justify-start text-left"
                    >
                      {country.emoji && <span className="mr-2">{country.emoji}</span>}
                      {country.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Grid className="h-5 w-5" />
                <span className="text-sm text-gray-600">
                  {allPosts.length} artículos encontrados
                </span>
              </div>
              <select className="px-3 py-2 border rounded-md text-sm">
                <option value="newest">Más reciente</option>
                <option value="oldest">Más antiguo</option>
                <option value="title">Título A-Z</option>
              </select>
            </div>

            {/* Articles Grid */}
            {allPosts && allPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allPosts.map((article: Post) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold mb-2">No hay artículos disponibles</h3>
                <p className="text-gray-600">
                  Aún no hay contenido publicado. Vuelve pronto para ver las últimas noticias.
                </p>
              </div>
            )}

            {/* Load More Button */}
            {allPosts && allPosts.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Cargar más artículos
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
