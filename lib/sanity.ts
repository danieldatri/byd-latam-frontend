import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries for news articles
export const articlesQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    country,
    featured,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      title,
      color
    },
    author->{
      name,
      image
    },
    tags[]->{
      title,
      color
    }
  }
`

export const featuredArticlesQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    country,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      title,
      color
    },
    author->{
      name,
      image
    }
  }
`

export const articleBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    country,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      title,
      color
    },
    author->{
      name,
      image,
      bio,
      social
    },
    tags[]->{
      title,
      color
    }
  }
`

export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

export const tagsQuery = `
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

export const authorsQuery = `
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    bio,
    image,
    social
  }
`

export const postsByCountryQuery = `
  *[_type == "post" && country == $country] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    country,
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      title,
      color
    },
    author->{
      name,
      image
    }
  }
`
