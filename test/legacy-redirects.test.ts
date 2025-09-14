import { redirect } from 'next/navigation'

// Mock next/navigation for testing
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

describe('Legacy Redirects', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('legacy /news page redirects to /articles', async () => {
    const LegacyNewsRedirect = (await import('@/app/news/page')).default

    // Mock params if needed
    LegacyNewsRedirect()

    expect(redirect).toHaveBeenCalledWith('/articles')
  })

  it('legacy /article/[slug] page redirects to /articles/[slug]', async () => {
    const LegacyArticleRedirect = (await import('@/app/article/[slug]/page')).default

    const mockParams = { slug: 'test-article' }
    LegacyArticleRedirect({ params: mockParams })

    expect(redirect).toHaveBeenCalledWith('/articles/test-article')
  })
})
