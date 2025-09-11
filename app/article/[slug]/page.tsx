import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, ArrowLeft, User } from "lucide-react"
import { getPostBySlug, urlFor } from "@/lib/sanity"
import { PortableTextRenderer } from "@/components/portable-text-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <article>
          {/* Article Hero: text over low-opacity image */}
          <header className="relative mb-8 overflow-hidden rounded-xl border">

            <div className="relative p-6 md:p-10 bg-gradient-to-br from-background via-gray-100 to-gray-200/80">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.category && (
                  <Badge
                    variant="secondary"
                    className="text-white"
                    style={{ backgroundColor: post.category.color }}
                  >
                    {post.category.title}
                  </Badge>
                )}
                {post.tags?.map((tag: any) => (
                  <Badge
                    key={tag.title}
                    variant="outline"
                    style={{ borderColor: tag.color, color: tag.color }}
                  >
                    {tag.title}
                  </Badge>
                ))}
              </div>

              <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-900">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="flex items-center gap-1">
                    {post.country?.emoji && <span>{post.country.emoji}</span>}
                    {post.country?.name || 'Sin país'}
                  </span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Por {post.author.name}</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Intro/Excerpt below hero */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8 text-justify">
              {post.excerpt}
            </p>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {post.body && <PortableTextRenderer content={post.body} />}
          </div>

          {/* Author Bio */}
          {post.author && post.author.bio && (
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(80).height(80).url()}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sobre {post.author.name}</h3>
                  <PortableTextRenderer content={post.author.bio} />
                </div>
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  )
}
