require('dotenv').config({ path: '.env.local' })
import { getAllPosts } from '../lib/sanity'

describe('Sanity posts', () => {
  it('should fetch all posts and print the count', async () => {
    const posts = await getAllPosts()
    console.log(`Total posts found: ${posts.length}`)
    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThanOrEqual(0)
  })
})
