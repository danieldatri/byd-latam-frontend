import * as React from "react"
import {Footer} from "@/components/footer"
import {AdBanner} from "@/components/ad-banner"
import {HeroBanner} from "@/components/hero-banner"
import {Button} from "@/components/ui/button"
import {RegionsQuickAccess} from "@/components/countries-quick-access"
import {Newspaper, TrendingUp} from "lucide-react"
import {getAllCountries, getAllPosts, getFeaturedPosts, Post} from "@/lib/sanity"
import {ArticlesBlock} from "@/components/articles-block"

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
      {/* <Header /> removed, now handled globally in layout.tsx */}
      {/* Hero Banner Ad */}
      <div className="container mx-auto px-4 py-2">
        <AdBanner size="banner" />
      </div>

      <main className="container mx-auto px-4 py-2">
        {/* Hero Section */}
        <HeroBanner />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Articles */}
            <ArticlesBlock
              name="Destacados"
              icon={TrendingUp}
              articles={featuredArticles}
              featured
            />
            {/* Latest News */}
            <ArticlesBlock
              name="Últimas Noticias"
              icon={Newspaper}
              articles={recentNonFeatured}
              link="/articles"
              linkLabel="Ver todas"
            />
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
