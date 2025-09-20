import { NextResponse } from 'next/server';
import { getPostsBySearch } from '@/lib/sanity';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  if (!query || query.length < 3) {
    return NextResponse.json([]);
  }
  const posts = await getPostsBySearch(query);
  return NextResponse.json(posts);
}

