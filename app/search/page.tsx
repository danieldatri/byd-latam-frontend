"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { extractTextFromBody } from "@/lib/utils";
import { Footer } from "@/components/footer";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      if (initialQuery.length >= 3) {
        const res = await fetch(`/api/search?query=${encodeURIComponent(initialQuery)}`);
        const results = await res.json();
        setPosts(results);
      } else {
        setPosts([]);
      }
      setLoading(false);
    }
    fetchResults();
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const term = inputValue.trim();
    if (term.split(' ').some(word => word.length >= 3)) {
      router.push(`/search?query=${encodeURIComponent(term)}`);
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-10 min-h-[60vh] flex flex-col items-center">
        <form className="w-full max-w-xl mb-8 flex" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="flex-1 rounded-l-md border border-gray-600 px-4 py-3 text-lg bg-header-footer-bg text-header-footer-text focus:outline-none"
            placeholder="Buscar noticias..."
          />
          <button type="submit" className="rounded-r-md bg-primary text-white px-6 py-3 text-lg font-semibold">
            Buscar
          </button>
        </form>
        {loading ? (
          <div className="text-center text-lg">Buscando...</div>
        ) : (
          <div className="w-full max-w-2xl">
            {posts.length === 0 ? (
              <div className="text-center text-gray-500">No se encontraron resultados para "{initialQuery}".</div>
            ) : (
              <ul className="space-y-6">
                {posts.map((post: any) => (
                  <li key={post._id} className="border-b pb-6">
                    <Link href={`/article/${post.slug.current}`} className="text-xl font-bold text-primary hover:underline">
                      {post.title}
                    </Link>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatDate(post.publishedAt)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {post.excerpt || extractTextFromBody(post.body)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
