import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { AdBanner } from "@/components/ad-banner"
import { HeroBanner } from "@/components/hero-banner"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

export default function HomePage() {
  // Mock data - will be replaced with Sanity CMS data
  const featuredArticles = [
    {
      _id: "1",
      title: "BYD lanza su nueva línea de vehículos eléctricos en México",
      slug: { current: "byd-nueva-linea-mexico" },
      excerpt:
        "La compañía china presenta tres nuevos modelos que prometen revolucionar el mercado mexicano de vehículos eléctricos con tecnología de punta y precios competitivos.",
      publishedAt: "2024-01-15T10:00:00Z",
      country: "México",
      category: "Lanzamientos",
      mainImage: {
        asset: { url: "/byd-electric-car-launch-mexico.jpg" },
        alt: "BYD vehículos eléctricos México",
      },
      author: { name: "Carlos Mendoza" },
    },
    {
      _id: "2",
      title: "Expansión de BYD en Brasil: Nueva planta de producción",
      slug: { current: "byd-expansion-brasil-planta" },
      excerpt:
        "BYD anuncia la construcción de su segunda planta de producción en Brasil, lo que aumentará significativamente su capacidad de manufactura en Sudamérica.",
      publishedAt: "2024-01-14T15:30:00Z",
      country: "Brasil",
      category: "Industria",
      mainImage: {
        asset: { url: "/byd-factory-brazil-construction.jpg" },
        alt: "Planta BYD Brasil",
      },
      author: { name: "Ana Silva" },
    },
    {
      _id: "3",
      title: "BYD Argentina: Récord de ventas en el primer trimestre",
      slug: { current: "byd-argentina-record-ventas" },
      excerpt:
        "Los vehículos eléctricos de BYD alcanzan cifras históricas en Argentina, consolidando su posición como líder en el mercado de movilidad sostenible.",
      publishedAt: "2024-01-13T09:15:00Z",
      country: "Argentina",
      category: "Ventas",
      mainImage: {
        asset: { url: "/byd-sales-record-argentina.jpg" },
        alt: "Ventas BYD Argentina",
      },
      author: { name: "Roberto García" },
    },
  ]

  const latestNews = [
    {
      _id: "4",
      title: "BYD Chile inaugura nuevos centros de servicio",
      slug: { current: "byd-chile-centros-servicio" },
      excerpt: "La red de servicios de BYD se expande en Chile con la apertura de cinco nuevos centros especializados.",
      publishedAt: "2024-01-12T14:20:00Z",
      country: "Chile",
      category: "Servicios",
      author: { name: "María López" },
    },
    {
      _id: "5",
      title: "Tecnología de baterías BYD: Innovación en Colombia",
      slug: { current: "byd-baterias-colombia" },
      excerpt: "BYD presenta su nueva tecnología de baterías de larga duración en el mercado colombiano.",
      publishedAt: "2024-01-11T11:45:00Z",
      country: "Colombia",
      category: "Tecnología",
      author: { name: "Diego Herrera" },
    },
    {
      _id: "6",
      title: "BYD Perú: Alianza estratégica con distribuidores locales",
      slug: { current: "byd-peru-alianza-distribuidores" },
      excerpt:
        "BYD fortalece su presencia en Perú mediante acuerdos con los principales distribuidores automotrices del país.",
      publishedAt: "2024-01-10T16:30:00Z",
      country: "Perú",
      category: "Negocios",
      author: { name: "Carmen Vega" },
    },
    {
      _id: "7",
      title: "BYD Uruguay: Primeros vehículos eléctricos llegan al mercado",
      slug: { current: "byd-uruguay-primeros-vehiculos" },
      excerpt: "Uruguay recibe los primeros modelos de BYD, marcando el inicio de la era eléctrica en el país.",
      publishedAt: "2024-01-09T12:15:00Z",
      country: "Uruguay",
      category: "Lanzamientos",
      author: { name: "Fernando Rodríguez" },
    },
  ]

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
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-3xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  Destacados
                </h2>
                <Button variant="outline" asChild>
                  <a href="/noticias">
                    Ver todas <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <ArticleCard article={featuredArticles[0]} featured />
                </div>
                <ArticleCard article={featuredArticles[1]} />
                <ArticleCard article={featuredArticles[2]} />
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="font-playfair text-3xl font-bold mb-6">Últimas Noticias</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestNews.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
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

              {/* Countries Quick Access */}
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-playfair text-xl font-bold mb-3">Países</h3>
                <div className="space-y-2">
                  {["México", "Brasil", "Argentina", "Chile", "Colombia", "Perú", "Uruguay"].map((country) => (
                    <a
                      key={country}
                      href={`/pais/${country.toLowerCase()}`}
                      className="block text-sm hover:text-primary transition-colors py-1"
                    >
                      {country}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
