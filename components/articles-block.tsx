import React from "react"
import { SectionHeader } from "@/components/section-header"
import { ArticleCard } from "@/components/article-card"
import { Post } from "@/lib/sanity"

interface ArticlesBlockProps {
  name: string
  icon: React.ElementType
  articles: Post[]
  link?: string
  linkLabel?: string
  featured?: boolean
}

export function ArticlesBlock({ name, icon, articles, link, linkLabel, featured = false }: ArticlesBlockProps) {
  return (
    <section className="mb-12">
      <SectionHeader
        name={name}
        icon={icon}
        link={link}
        linkLabel={linkLabel}
      />
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article: Post) => (
            <ArticleCard article={article} featured={featured} key={article._id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No hay artículos disponibles
        </div>
      )}
    </section>
  )
}

