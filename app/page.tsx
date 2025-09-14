import * as React from "react"
import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import {ArticleCard} from "@/components/article-card"
import {AdBanner} from "@/components/ad-banner"
import {HeroBanner} from "@/components/hero-banner"
import {Button} from "@/components/ui/button"
import {RegionsQuickAccess} from "@/components/countries-quick-access"
import {ArrowRight, Newspaper, TrendingUp} from "lucide-react"
import {getAllCountries, getAllPosts, getFeaturedPosts, Post} from "@/lib/sanity"

export default async function HomePage() {
  // Obtener datos reales de Sanity
  const [featuredArticles, allPosts, countries] = await Promise.all([
    getFeaturedPosts(),
    getAllPosts(),
    getAllCountries()
  ])

  // Filtrar artículos recientes (excluyendo los destacados)
  const recentNonFeatured = allPosts
    .filter((article: Post) => !article.featured)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner size="banner" />
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <HeroBanner />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Articles */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6 col-span-2 relative">
                {/* Gradient background behind h2 */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-pink-500 to-secondary opacity-30 rounded-lg pointer-events-none" />
                <h2 className="font-playfair text-3xl font-bold flex items-center gap-2 relative z-10 text-primary">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  Destacados
                </h2>
                <Button variant="outline" asChild>
                  <a href="/articles">
                    Ver todas <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              {featuredArticles && featuredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredArticles.map((article: Post) => (
                    <ArticleCard article={article} featured key={article._id} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No hay artículos destacados disponibles
                </div>
              )}
            </section>

            {/* Latest News */}
            <section>
              <div className="mb-6 relative">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-pink-500 to-secondary opacity-30 rounded-lg pointer-events-none" />
                <h2 className="font-playfair text-3xl font-bold flex items-center gap-2 relative z-10 text-primary">
                  <Newspaper className="h-8 w-8 text-primary" />
                  Últimas Noticias
                </h2>
              </div>
              {recentNonFeatured && recentNonFeatured.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentNonFeatured.map((article: Post) => (
                    <ArticleCard article={article} key={article._id} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No hay noticias recientes disponibles
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Sidebar Ad */}
              <AdBanner size="sidebar" />

              {/* Newsletter */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-playfair text-xl font-bold mb-3">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Recibe las últimas noticias de BYD directamente en tu email.
                </p>
                <div className="space-y-3">
                  <input type="email" placeholder="Tu email" className="w-full px-3 py-2 border rounded-md text-sm" />
                  <Button className="w-full" size="sm">
                    Suscribirse
                  </Button>
                </div>
              </div>

              {/* Regions Quick Access */}
              <RegionsQuickAccess regions={countries} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
