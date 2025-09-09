import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/lib/sanity"

// Función para extraer texto plano del contenido de Sanity
function extractTextFromBody(body: any[]): string {
  if (!body || !Array.isArray(body)) return ""
  
  return body
    .filter((block) => block._type === 'block' && block.children)
    .map((block) => 
      block.children
        .filter((child: any) => child._type === 'span')
        .map((child: any) => child.text)
        .join('')
    )
    .join(' ')
    .slice(0, 200) + '...'
}

interface ArticleCardProps {
  article: {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string | null
    body?: any
    publishedAt: string
    country?: {
      _id: string
      name: string
      emoji?: string | null
    } | null
    featured?: boolean | null
    mainImage?: {
      asset: {
        _id: string
        url: string
      }
      alt?: string
    } | null
    category?: {
      _id: string
      title: string
      color: string
    } | null
    author?: {
      _id: string
      name: string
      image?: {
        asset: {
          url: string
        }
      }
    } | null
    tags?: Array<{
      _id: string
      title: string
      color: string
    }>
  }
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const cardSize = featured ? "md:col-span-2" : ""
  const imageHeight = featured ? "h-64" : "h-48"
  
  // Generar excerpt si no existe
  const displayExcerpt = article.excerpt || extractTextFromBody(article.body)

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${cardSize}`}>
      <Link href={`/article/${article.slug.current}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          {article.mainImage ? (
            <Image
              src={article.mainImage.asset.url || urlFor(article.mainImage).url()}
              alt={article.mainImage.alt || article.title}
              width={featured ? 800 : 400}
              height={featured ? 400 : 300}
              className={`w-full ${imageHeight} object-cover group-hover:scale-105 transition-transform duration-300`}
            />
          ) : (
            <div className={`w-full ${imageHeight} bg-gray-100 flex items-center justify-center`}>
              <span className="text-gray-500">Sin imagen</span>
            </div>
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            {article.category && (
              <Badge 
                variant="secondary" 
                className="text-white"
                style={{ backgroundColor: article.category.color }}
              >
                {article.category.title}
              </Badge>
            )}
            {(featured || article.featured) && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Destacado
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          <h3
            className={`font-playfair font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 text-gray-900 ${featured ? "text-2xl" : "text-xl"}`}
          >
            {article.title}
          </h3>
          <p className="text-gray-800 mb-4 line-clamp-3 text-pretty">{displayExcerpt}</p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString("es-ES")}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{article.country?.name || 'Sin país'}</span>
              </div>
            </div>
            {article.author && <span className="font-medium text-gray-900">{article.author.name}</span>}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
