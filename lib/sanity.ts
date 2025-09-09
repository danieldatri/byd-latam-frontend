import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
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
    body,
    publishedAt,
    country->{
      _id,
      name,
      emoji
    },
    featured,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      _id,
      title,
      color
    },
    author->{
      _id,
      name,
      image {
        asset->{
          url
        }
      }
    },
    tags[]->{
      _id,
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
    body,
    publishedAt,
    country->{
      _id,
      name,
      emoji
    },
    featured,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      _id,
      title,
      color
    },
    author->{
      _id,
      name,
      image {
        asset->{
          url
        }
      }
    }
  }
`

export const articleBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    country->{
      _id,
      name,
      emoji
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      _id,
      title,
      color
    },
    author->{
      _id,
      name,
      image {
        asset->{
          url
        }
      },
      bio
    },
    tags[]->{
      _id,
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
    image {
      asset->{
        url
      }
    }
  }
`

export const postsByCountryQuery = `
  *[_type == "post" && country->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    country->{
      _id,
      name,
      emoji
    },
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    category->{
      _id,
      title,
      color
    },
    author->{
      _id,
      name,
      image {
        asset->{
          url
        }
      }
    }
  }
`

// Query para obtener todos los países
export const countriesQuery = `
  *[_type == "country"] | order(name asc) {
    _id,
    name,
    slug,
    emoji
  }
`

// Funciones para obtener datos con fallback
export async function getAllPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id") {
    return []
  }
  return await client.fetch(articlesQuery)
}

export async function getFeaturedPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id") {
    return []
  }
  return await client.fetch(featuredArticlesQuery)
}

export async function getPostBySlug(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id") {
    return null
  }
  return await client.fetch(articleBySlugQuery, { slug })
}

export async function getAllCategories() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id") {
    return []
  }
  return await client.fetch(categoriesQuery)
}

export async function getAllAuthors() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id") {
    return []
  }
  return await client.fetch(authorsQuery)
}

export async function getAllCountries() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id") {
    return []
  }
  return await client.fetch(countriesQuery)
}

export async function getPostsByCountry(country: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id") {
    return []
  }
  return await client.fetch(postsByCountryQuery, { slug: country })
}

// Types para TypeScript
export interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string | null
  body?: any // Contenido de bloques de Sanity
  publishedAt: string
  country?: {
    _id: string
    name: string
    emoji?: string | null
  } | null
  featured?: boolean | null
  featuredImage?: {
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

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  color: string
}

export interface Author {
  _id: string
  name: string
  slug: { current: string }
  bio?: any
  image?: {
    asset: {
      url: string
    }
  }
}

export interface Country {
  _id: string
  name: string
  slug: { current: string }
  emoji?: string
}
