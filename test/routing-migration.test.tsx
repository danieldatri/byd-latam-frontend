import React from 'react'
import { render, screen } from '@testing-library/react'
import { ArticleCard } from '@/components/article-card'
import { PortableTextRenderer } from '@/components/portable-text-renderer'
import fs from 'fs'
import path from 'path'

// Helper mock article
const mockArticle = {
  _id: 'test-id',
  title: 'Titulo de Prueba',
  slug: { current: 'titulo-prueba' },
  excerpt: 'Resumen',
  body: [],
  publishedAt: new Date().toISOString(),
  country: { _id: 'c1', name: 'Argentina' },
  featured: false,
  mainImage: null,
  categories: [],
  author: { _id: 'a1', name: 'Autor' },
  tags: []
}

describe('Rutas migradas a /articles', () => {
  it('ArticleCard genera enlace /articles/:slug', () => {
    render(<ArticleCard article={mockArticle as any} />)
    const link = screen.getByRole('link') as HTMLAnchorElement
    expect(link.getAttribute('href')).toBe('/articles/titulo-prueba')
  })

  it('PortableTextRenderer renderiza internalLink hacia /articles/:slug', () => {
    const value = [
      {
        _type: 'block',
        style: 'normal',
        markDefs: [
          {
            _type: 'internalLink',
            _key: 'm1',
            reference: { slug: { current: 'otro-articulo' } }
          }
        ],
        children: [
          { _type: 'span', text: 'Ver otro', marks: ['m1'] }
        ]
      }
    ]
    render(<PortableTextRenderer content={value} />)
    const link = screen.getByText('Ver otro').closest('a')!
    expect(link.getAttribute('href')).toBe('/articles/otro-articulo')
  })

  it('next.config.mjs contiene redirecciones esperadas', () => {
    const cfgPath = path.join(process.cwd(), 'next.config.mjs')
    const content = fs.readFileSync(cfgPath, 'utf8')
    expect(content).toMatch(/source: '\/news'/)
    expect(content).toMatch(/destination: '\/articles'/)
    expect(content).toMatch(/source: '\/article\/\:slug'/)
  })
})

