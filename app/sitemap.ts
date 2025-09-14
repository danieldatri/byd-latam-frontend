import { getAllPosts, getAllCountries } from '@/lib/sanity'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bydlatamnews.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, countries] = await Promise.all([
    getAllPosts(),
    getAllCountries()
  ])

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Article routes
  const articleRoutes: MetadataRoute.Sitemap = posts.map((post: { slug: { current: any }; publishedAt: string | number | Date; featured: any }) => ({
    url: `${BASE_URL}/articles/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: post.featured ? 0.9 : 0.7,
  }))

  // Region routes
  const regionRoutes: MetadataRoute.Sitemap = countries.map((country: { slug: { current: any } }) => ({
    url: `${BASE_URL}/region/${country.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...articleRoutes, ...regionRoutes]
}
