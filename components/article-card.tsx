import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  article: {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    publishedAt: string
    country: string
    category: string
    mainImage?: {
      asset: { url: string }
      alt: string
    }
    author?: {
      name: string
    }
  }
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const cardSize = featured ? "md:col-span-2" : ""
  const imageHeight = featured ? "h-64" : "h-48"

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${cardSize}`}>
      <Link href={`/articulo/${article.slug.current}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          {article.mainImage ? (
            <Image
              src={article.mainImage.asset.url || "/placeholder.svg"}
              alt={article.mainImage.alt || article.title}
              width={featured ? 800 : 400}
              height={featured ? 400 : 300}
              className={`w-full ${imageHeight} object-cover group-hover:scale-105 transition-transform duration-300`}
            />
          ) : (
            <div className={`w-full ${imageHeight} bg-muted flex items-center justify-center`}>
              <span className="text-muted-foreground">Sin imagen</span>
            </div>
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {article.category}
            </Badge>
            {featured && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Destacado
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <h3
            className={`font-playfair font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 ${featured ? "text-2xl" : "text-xl"}`}
          >
            {article.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3 text-pretty">{article.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString("es-ES")}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{article.country}</span>
              </div>
            </div>
            {article.author && <span className="font-medium">{article.author.name}</span>}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
