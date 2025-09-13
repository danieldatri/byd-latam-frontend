"use client";
import React, { useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { Filter, Grid } from "lucide-react";
import { Post, Category, Country } from "@/lib/sanity";

interface NewsContentProps {
  allPosts: Post[];
  categories: Category[];
  countries: Country[];
}

export const NewsContent: React.FC<NewsContentProps> = ({ allPosts, categories, countries }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("newest");

  // Filtering logic
  let filteredPosts = allPosts;
  if (selectedCategory) {
    filteredPosts = filteredPosts.filter(post =>
      post.categories?.some(cat => cat._id === selectedCategory)
    );
  }
  if (selectedCountry) {
    filteredPosts = filteredPosts.filter(post => post.country?._id === selectedCountry);
  }

  // Sorting logic
  if (sortOrder === "newest") {
    filteredPosts = filteredPosts.slice().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } else if (sortOrder === "oldest") {
    filteredPosts = filteredPosts.slice().sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
  } else if (sortOrder === "title") {
    filteredPosts = filteredPosts.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar - Filters */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          {/* Categories Filter */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-playfair text-xl font-bold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Categorías
            </h3>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === null ? "default" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => setSelectedCategory(null)}
              >
                Todas las categorías
              </Button>
              {categories.map((category: Category) => (
                <Button
                  key={category._id}
                  variant={selectedCategory === category._id ? "default" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedCategory(category._id)}
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Countries Filter */}
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-playfair text-xl font-bold mb-4">Países</h3>
            <div className="space-y-2">
              <Button
                variant={selectedCountry === null ? "default" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => setSelectedCountry(null)}
              >
                Todos los países
              </Button>
              {countries.map((country: Country) => (
                <Button
                  key={country._id}
                  variant={selectedCountry === country._id ? "default" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => setSelectedCountry(country._id)}
                >
                  {country.emoji && <span className="mr-2">{country.emoji}</span>}
                  {country.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Grid className="h-5 w-5" />
            <span className="text-sm text-gray-600">
              {filteredPosts.length} artículos encontrados
            </span>
          </div>
          <select
            className="px-3 py-2 border rounded-md text-sm"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
          >
            <option value="newest">Más reciente</option>
            <option value="oldest">Más antiguo</option>
            <option value="title">Título A-Z</option>
          </select>
        </div>

        {/* Articles Grid */}
        {filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((article: Post) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold mb-2">No hay artículos disponibles</h3>
            <p className="text-gray-600">
              Aún no hay contenido publicado. Vuelve pronto para ver las últimas noticias.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts && filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Cargar más artículos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
