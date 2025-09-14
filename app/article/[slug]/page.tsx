import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, MapPin, User } from "lucide-react"
import { BackLink } from "@/components/back-link"
import { getPostBySlug, urlFor } from "@/lib/sanity"
import { PortableTextRenderer } from "@/components/portable-text-renderer"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShareButtons } from "@/components/share-buttons"
import {Metadata} from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

interface ArticlePageProps {
  // params can be a promise-like type per Next's generated types; use any here
  params: any
}

// Utility to extract plain text from Portable Text blocks
function getBodyPreview(body: any, maxLength: number = 120): string {
    if (!Array.isArray(body)) return "";
    let text = "";
    for (const block of body) {
        if (block._type === "block" && Array.isArray(block.children)) {
            text += block.children.map((child: any) => child.text).join("");
            if (text.length >= maxLength) break;
        }
    }
    return text.slice(0, maxLength).trim();
}

export async function generateMetadata({ params }: { params: { slug: string } }) : Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};

    const imageUrl = post.mainImage?.asset
        ? urlFor(post.mainImage).width(1200).height(630).url()
        : `${BASE_URL}/placeholder.jpg`;

    return {
        title: post.title,
        description: post.excerpt || "",
        openGraph: {
            title: post.title,
            description: post.excerpt || "",
            url: `${BASE_URL}/article/${post.slug.current}`,
            siteName: "BYD Latam News",
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.mainImage?.alt || post.title,
                },
            ],
            locale: "es_ES",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt || "",
            images: [imageUrl],
        },
    };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Next requires awaiting params before accessing dynamic params properties
  const { slug } = (await params) as { slug: string }
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
  {/* Back link with icon */}
  <BackLink />

        <article>
          {/* Article Hero: text over low-opacity image */}
          <header className="relative mb-8 overflow-hidden rounded-xl border">

            <div className="relative p-6 md:p-10 bg-gradient-to-br from-background via-gray-100 to-gray-200/80">
              {/* Category badge above title, left aligned */}
              {post.categories && (
                <div className="mb- flex items-center">
                  <Badge
                    variant="secondary"
                    className="px-4 py-1 text-base font-semibold"
                    style={{ backgroundColor: post.categories?.color }}
                  >
                    {post.categories?.title}
                  </Badge>
                </div>
              )}

              <h1 className="font-playfair text-2xl md:text-4xl font-bold mb-6 text-gray-900">
                {post.title}
              </h1>

              {/* Tags below title, left aligned */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag: any) => (
                    <Badge
                      key={tag.title}
                      variant="outline"
                      style={{ borderColor: tag.color, color: tag.color }}
                    >
                      {tag.title}
                    </Badge>
                  ))}
                </div>
              )}

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

          {/* Share Buttons Section */}
          <ShareButtons
            url={`${BASE_URL}/article/${post.slug.current}`}
            title={post.title}
            description={getBodyPreview(post.body) || post.excerpt || post.title}
            image={post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : `${BASE_URL}/placeholder.jpg`}
          />

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
